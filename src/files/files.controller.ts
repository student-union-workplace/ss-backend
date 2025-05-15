import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { FilesService } from './files.service';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { file_type, users_role } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { IRequestWithUser } from '../interfaces/Request.interface';
import { UploadDto } from './dto/files.dto';

@UseGuards(AuthGuard)
@Controller('files')
export class FilesController {
  constructor(
    private filesService: FilesService,
    private readonly prisma: PrismaService,
  ) {}

  // Просмотр файлов мероприятия
  @Get('events/:eventId/files')
  async getEventFiles(@Param('eventId') eventId: string) {
    return this.filesService.getFilesForEvent(eventId);
  }

  // Загрузка файла для мероприятия
  @Post('events/:eventId/files/upload-url')
  async getEventUploadUrl(
    @Param('eventId') eventId: string,
    @Body() dto: UploadDto,
    @Req() req: IRequestWithUser,
  ) {
    return this.filesService.generateUploadUrl(
      'events',
      eventId,
      dto.name,
      dto.type,
      dto.size,
      req,
    );
  }

  // Загрузка аватарки пользователя
  @Post('users/:userId/avatar/upload-url')
  async getUserAvatarUploadUrl(
    @Param('userId') userId: string,
    @Body() dto: UploadDto,
    @Req() req: IRequestWithUser,
  ) {
    return this.filesService.generateUploadUrl(
      'users',
      userId,
      dto.name,
      dto.type,
      dto.size,
      req,
    );
  }

  // Просмотр аватарки пользователя
  @Get('users/:userId/avatar')
  async getUserAvatar(@Param('userId') userId: string) {
    return await this.filesService.getUserAvatar(userId);
  }

  // Скачивание файла (не Google)
  @Get(':fileId/download')
  async download(@Param('fileId') fileId: string, @Res() res: Response) {
    const file = await this.prisma.files.findUnique({ where: { id: fileId } });

    if (!file) throw new NotFoundException('Файл не найден');
    if (file.type !== file_type.other)
      throw new BadRequestException('Файл Google не может быть скачан');

    return res.redirect(await this.filesService.generateDownloadUrl(file.path));
  }

  // Удаление файла из базы данных, гугла и бакета
  @Roles(users_role.member)
  @Delete(':fileId')
  async deleteFile(@Param('fileId') fileId: string) {
    try {
      await this.filesService.deleteFile(fileId);
      return {
        message: 'Файл успешно удален',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Ошибка удаления файла');
    }
  }
}
