import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Delete,
  UseGuards,
  Req,
  Patch,
  Param,
} from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';
import { Roles } from '../decorators/roles.decorator';
import { file_type, users_role } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { IRequestWithUser } from '../interfaces/Request.interface';
import { FilesService } from '../files/files.service';

@UseGuards(AuthGuard, RolesGuard)
@Controller('google-sheets')
export class GoogleSheetsController {
  constructor(
    private googleSheetsService: GoogleSheetsService,
    private filesService: FilesService,
  ) {}

  @Roles(users_role.member)
  @Get('all')
  async getAllSheets() {
    return this.googleSheetsService.getAllSheets();
  }

  @Roles(users_role.member)
  @Post()
  async createSheet(@Body('title') title: string) {
    return this.googleSheetsService.createSheet(title);
  }

  @Roles(users_role.member)
  @Get()
  async getSheet(@Query('sheetId') sheetId: string) {
    return this.googleSheetsService.getSheet(sheetId);
  }

  @Roles(users_role.member)
  @Delete()
  async deleteSheet(@Query('fileId') fileId: string) {
    return this.googleSheetsService.deleteSheet(fileId);
  }

  @Roles(users_role.member)
  @Post('event')
  async createSheetForEvent(
    @Body('title') title: string,
    @Body('eventId') eventId: string,
    @Req() req: IRequestWithUser,
  ) {
    const sheet = await this.googleSheetsService.createSheet(title);

    await this.filesService.createGoogleFileForEvent({
      name: title,
      path: sheet.id,
      eventId,
      userId: req.user.id,
      type: file_type.sheet,
    });

    return sheet;
  }

  @Roles(users_role.member)
  @Patch(':fileId')
  async renameSheetFull(
    @Param('fileId') fileId: string,
    @Body('name') name: string,
  ) {
    const file = await this.filesService.getFile(fileId);

    await this.googleSheetsService.renameSheet(file.path, name);

    return this.filesService.renameFile(fileId, name);
  }
}
