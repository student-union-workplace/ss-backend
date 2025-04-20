import { Controller, Post, Get, Body, Query, Delete } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';
import { Roles } from '../decorators/roles.decorator';
import { users_role } from '@prisma/client';

@Controller('api/google-sheets')
export class GoogleSheetsController {
  constructor(private googleSheetsService: GoogleSheetsService) {}

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
