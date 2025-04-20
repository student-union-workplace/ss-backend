import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';
import { Roles } from '../decorators/roles.decorator';
import { users_role } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('google-sheets')
export class GoogleSheetsController {
  constructor(private googleSheetsService: GoogleSheetsService) {}

  @Get('all')
  async getAllSheets() {
    return this.googleSheetsService.getAllSheets();
  }

  @Roles(users_role.member)
  @Post()
  async createSheet(@Body('title') title: string) {
    return this.googleSheetsService.createSheet(title);
  }

  @Get()
  async getSheet(@Query('sheetId') sheetId: string) {
    return this.googleSheetsService.getSheet(sheetId);
  }

  @Roles(users_role.member)
  @Delete()
  async deleteSheet(@Query('fileId') fileId: string) {
    return this.googleSheetsService.deleteSheet(fileId);
  }
}
