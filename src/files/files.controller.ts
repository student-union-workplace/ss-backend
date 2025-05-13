import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { FilesService } from './files.service';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { users_role } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@UseGuards(AuthGuard)
@Controller('files')
export class FilesController {
  constructor(
    private filesService: FilesService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('event/:eventId')
  async getEventFiles(@Param('eventId') eventId: string) {
    return this.filesService.getFilesForEvent(eventId);
  }

  @Roles(users_role.member)
  @Delete(':fileId')
  async deleteFile(@Param('fileId') fileId: string) {
    try {
      await this.filesService.deleteFile(fileId);
      return {
        message: 'Файл успешно удален из базы данных и Google',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Ошибка удаления файла');
    }
  }

  @Post('events/:eventId/files/upload-url')
  async getUploadUrl(
    @Param('eventId') eventId: string,
    @Body() body: { name: string; type: string; size: number },
  ) {
    return this.filesService.generateUploadUrl(
      eventId,
      body.name,
      body.type,
      body.size,
    );
  }

  @Get('events/:eventId/files')
  async listFiles(@Param('eventId') eventId: string) {
    const records = await this.prisma.files.findMany({
      where: { event_id: eventId },
    });

    return Promise.all(
      records.map(async (f) => ({
        id: f.id,
        name: f.name,
        size: f.size,
        type: f.type,
        downloadUrl: await this.filesService.generateDownloadUrl(f.path),
      })),
    );
  }

  @Get('files/:fileId/download')
  async download(@Param('fileId') fileId: string, @Res() res: Response) {
    const record = await this.prisma.files.findUnique({
      where: { id: fileId },
    });
    const url = await this.filesService.generateDownloadUrl(record.path);
    return res.redirect(url);
  }

  @Delete('files/:fileId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('fileId') fileId: string) {
    const record = await this.prisma.files.findUnique({
      where: { id: fileId },
    });
    await this.filesService.deleteBucketFile(record.path);
    await this.prisma.files.delete({ where: { id: fileId } });
  }
}
