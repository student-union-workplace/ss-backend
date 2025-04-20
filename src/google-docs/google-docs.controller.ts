import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GoogleDocsService } from './google-docs.service';
import { Roles } from '../decorators/roles.decorator';
import { users_role } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('google-docs')
export class GoogleDocsController {
  constructor(private googleDocsService: GoogleDocsService) {}
  @Get('all')
  async getAllDocuments() {
    return this.googleDocsService.getAllDocuments();
  }

  @Roles(users_role.member)
  @Post()
  async createDocument(@Body('title') title: string) {
    return this.googleDocsService.createDocument(title);
  }

  @Get()
  async getDocument(@Query('fileId') fileId: string) {
    return this.googleDocsService.getDocument(fileId);
  }

  @Roles(users_role.member)
  @Delete()
  async deleteDocument(@Query('fileId') fileId: string) {
    return this.googleDocsService.deleteDocument(fileId);
  }
}
