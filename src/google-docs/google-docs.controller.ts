import { Controller, Post, Get, Delete, Body, Query } from '@nestjs/common';
import { GoogleDocsService } from './google-docs.service';

@Controller('api/google-docs')
export class GoogleDocsController {
  constructor(private googleDocsService: GoogleDocsService) {}

  @Post()
  async createDocument(@Body('title') title: string) {
    return this.googleDocsService.createDocument(title);
  }

  @Get()
  async getDocument(@Query('fileId') fileId: string) {
    return this.googleDocsService.getDocument(fileId);
  }

  @Delete()
  async deleteDocument(@Query('fileId') fileId: string) {
    return this.googleDocsService.deleteDocument(fileId);
  }
}
