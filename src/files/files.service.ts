import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { file_type } from '@prisma/client';
import { GoogleDocsService } from '../google-docs/google-docs.service';
import { GoogleSheetsService } from '../google-sheets/google-sheets.service';

@Injectable()
export class FilesService {
  constructor(
    private prisma: PrismaService,
    private googleDocsService: GoogleDocsService,
    private googleSheetsService: GoogleSheetsService,
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
}
