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

@Injectable()
export class FilesService {
  constructor(
    private prisma: PrismaService,
    private googleDocsService: GoogleDocsService,
    private googleSheetsService: GoogleSheetsService,
    @Inject('S3_CLIENT') private readonly s3: S3Client,
  ) {}

  async createFileForEvent(data: {
    name: string;
    googleFileId: string;
    eventId: string;
    userId: string;
    type: file_type;
  }) {
    return this.prisma.files.create({
      data: {
        name: data.name,
        google_file_id: data.googleFileId,
        event_id: data.eventId,
        created_by_user_id: data.userId,
        date: new Date(),
        type: data.type === file_type.doc ? file_type.doc : file_type.sheet,
      },
    });
  }

  async getFilesForEvent(eventId: string) {
    return this.prisma.files.findMany({
      where: {
        event_id: eventId,
      },
      select: {
        id: true,
        name: true,
        path: true,
        type: true,
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
  }

  async deleteFile(fileId: string) {
    const file = await this.prisma.files.findUnique({
      where: { id: fileId },
      select: {
        id: true,
        google_file_id: true,
        type: true,
      },
    });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    try {
      if (file.type === 'doc') {
        await this.googleDocsService.deleteDocument(file.google_file_id);
      } else if (file.type === 'sheet') {
        await this.googleSheetsService.deleteSheet(file.google_file_id);
      }
    } catch (error) {
      console.error('Error deleting file from Google Drive:', error);
      throw new InternalServerErrorException(
        'Ошибка удаления файла из Google Drive',
      );
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
        google_file_id: true,
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

  async generateUploadUrl(
    eventId: string,
    fileName: string,
    contentType: string,
    size: number,
  ) {
    if (size > 1024 * 1024 * 1024) {
      throw new BadRequestException('File too large');
    }

    const key = `${eventId}/${uuid()}-${fileName}`;
    const bucket = process.env.S3_BUCKET;
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
      ContentLength: size,
    });
    const url = await getSignedUrl(this.s3, command, { expiresIn: 300 });

    const fileRecord = await this.prisma.files.create({
      data: {
        event_id: eventId,
        name: fileName,
        path: key,
        size,
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

  async deleteBucketFile(key: string) {
    const bucket = process.env.S3_BUCKET;
    await this.s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
  }
}
