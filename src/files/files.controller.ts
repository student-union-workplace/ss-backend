import {
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { users_role } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

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
}
