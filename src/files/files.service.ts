import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { file_type } from '@prisma/client';
import { GoogleDocsService } from '../google-docs/google-docs.service';
import { GoogleSheetsService } from '../google-sheets/google-sheets.service';
import { v4 as uuid } from 'uuid';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { IRequestWithUser } from '../interfaces/Request.interface';

type FolderType = 'events' | 'users';

@Injectable()
export class FilesService {
  constructor(
    private prisma: PrismaService,
    private googleDocsService: GoogleDocsService,
    private googleSheetsService: GoogleSheetsService,
    @Inject('S3_CLIENT') private readonly s3: S3Client,
  ) {}

  async createGoogleFileForEvent(data: {
    name: string;
    path: string;
    eventId: string;
    userId: string;
    type: file_type;
  }) {
    return this.prisma.files.create({
      data: {
        name: data.name,
        path: data.path,
        event_id: data.eventId,
        created_by_user_id: data.userId,
        type: data.type === file_type.doc ? file_type.doc : file_type.sheet,
      },
    });
  }

  async getFilesForEvent(eventId: string) {
    const files = await this.prisma.files.findMany({
      where: {
        event_id: eventId,
      },
      select: {
        id: true,
        name: true,
        path: true,
        type: true,
        size: true,
        created_at: true,
        users: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return Promise.all(
      files.map(async (file) => {
        let url = '';
        if (file.type === file_type.doc) {
          url = `https://docs.google.com/document/d/${file.path}`;
        }
        if (file.type === file_type.sheet) {
          url = `https://docs.google.com/spreadsheets/d/${file.path}`;
        }
        if (file.type === file_type.other && file.path) {
          url = await this.generateDownloadUrl(file.path);
        }

        return {
          id: file.id,
          name: file.name,
          size: file.size,
          type: file.type,
          created_at: file.created_at,
          users: file.users,
          url,
        };
      }),
    );
  }

  async deleteFile(fileId: string) {
    const file = await this.prisma.files.findUnique({
      where: { id: fileId },
      select: {
        id: true,
        path: true,
        type: true,
      },
    });

    if (!file) {
      throw new NotFoundException('Файл не найден');
    }

    try {
      if (file.type === file_type.doc) {
        await this.googleDocsService.deleteDocument(file.path);
      }
    } catch (error) {
      console.error('Ошибка удаления из Google Drive:', error);
      throw new InternalServerErrorException(
        'Ошибка удаления файла из Google Drive',
      );
    }

    try {
      if (file.type === file_type.sheet) {
        await this.googleSheetsService.deleteSheet(file.path);
      }
    } catch (error) {
      console.error('Ошибка удаления из Google Sheets:', error);
      throw new InternalServerErrorException(
        'Ошибка удаления файла из Google Sheets',
      );
    }

    try {
      if (file.type === file_type.other && file.path) {
        const bucket = process.env.S3_BUCKET;
        await this.s3.send(
          new DeleteObjectCommand({ Bucket: bucket, Key: file.path }),
        );
      }
    } catch (error) {
      console.error('Ошибка удаления из s3', error);
      throw new InternalServerErrorException('Ошибка удаления из s3');
    }

    return this.prisma.files.delete({
      where: { id: fileId },
    });
  }

  async getFile(fileId: string) {
    return this.prisma.files.findUnique({
      where: { id: fileId },
      select: {
        id: true,
        path: true,
        type: true,
        name: true,
      },
    });
  }

  async renameFile(fileId: string, newName: string) {
    return this.prisma.files.update({
      where: { id: fileId },
      data: {
        name: newName,
        updated_at: new Date(),
      },
    });
  }

  async getUserAvatar(userId: string) {
    const file = await this.prisma.files.findFirst({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });
    if (!file) throw new NotFoundException('Аватар не найден');
    return {
      id: file.id,
      name: file.name,
      size: file.size,
      downloadUrl: await this.generateDownloadUrl(file.path),
    };
  }

  async getUserAvatarInQuery(userId: string) {
    const file = await this.prisma.files.findFirst({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });
    if (!file) {
      return {
        message: 'Аватар не найден',
      };
    }
    return {
      id: file.id,
      name: file.name,
      size: file.size,
      downloadUrl: await this.generateDownloadUrl(file.path),
    };
  }

  async generateUploadUrl(
    folder: FolderType,
    ownerId: string,
    fileName: string,
    contentType: string,
    size: number,
    req: IRequestWithUser,
  ) {
    if (size > 1024 * 1024 * 1024) {
      throw new BadRequestException('Файл слишком большой');
    }

    const key = `${folder}/${ownerId}/${uuid()}-${fileName}`;
    const bucket = process.env.S3_BUCKET;
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    });
    const url = await getSignedUrl(this.s3, command, { expiresIn: 300 });

    const fileRecord = await this.prisma.files.create({
      data: {
        name: fileName,
        path: key,
        size,
        event_id: folder === 'events' ? ownerId : null,
        user_id: folder === 'users' ? ownerId : null,
        created_by_user_id: req.user.id,
        type: 'other',
      },
    });

    return { fileId: fileRecord.id, uploadUrl: url };
  }

  async generateDownloadUrl(key: string) {
    const bucket = process.env.S3_BUCKET;
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    return getSignedUrl(this.s3, command, { expiresIn: 300 });
  }
}
