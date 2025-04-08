import { Controller, Post, Get, Body, Query, Delete } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';

@Controller('api/google-sheets')
export class GoogleSheetsController {
  constructor(private googleSheetsService: GoogleSheetsService) {}

  @Post()
  async createSheet(@Body('title') title: string) {
    return this.googleSheetsService.createSheet(title);
  }

  @Get()
  async getSheet(@Query('sheetId') sheetId: string) {
    return this.googleSheetsService.getSheet(sheetId);
  }

  @Delete()
  async deleteSheet(@Query('fileId') fileId: string) {
    return this.googleSheetsService.deleteSheet(fileId);
  }
}
