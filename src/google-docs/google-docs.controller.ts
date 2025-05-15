import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Query,
  UseGuards,
  Req,
  Patch,
  Param,
} from '@nestjs/common';
import { GoogleDocsService } from './google-docs.service';
import { Roles } from '../decorators/roles.decorator';
import { file_type, users_role } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { IRequestWithUser } from '../interfaces/Request.interface';
import { FilesService } from '../files/files.service';

@UseGuards(AuthGuard, RolesGuard)
@Controller('google-docs')
export class GoogleDocsController {
  constructor(
    private googleDocsService: GoogleDocsService,
    private filesService: FilesService,
  ) {}
  @Roles(users_role.member)
  @Get('all')
  async getAllDocuments() {
    return this.googleDocsService.getAllDocuments();
  }

  @Roles(users_role.member)
  @Post()
  async createDocument(@Body('title') title: string) {
    return this.googleDocsService.createDocument(title);
  }

  @Roles(users_role.member)
  @Get()
  async getDocument(@Query('fileId') fileId: string) {
    return this.googleDocsService.getDocument(fileId);
  }

  @Roles(users_role.member)
  @Delete()
  async deleteDocument(@Query('fileId') fileId: string) {
    return this.googleDocsService.deleteDocument(fileId);
  }

  @Roles(users_role.member)
  @Post('event')
  async createDocumentForEvent(
    @Body('title') title: string,
    @Body('eventId') eventId: string,
    @Req() req: IRequestWithUser,
  ) {
    const doc = await this.googleDocsService.createDocument(title);

    await this.filesService.createGoogleFileForEvent({
      name: doc.name,
      path: doc.id,
      eventId,
      userId: req.user.id,
      type: file_type.doc,
    });

    return doc;
  }

  @Roles(users_role.member)
  @Patch(':fileId')
  async renameDocumentFull(
    @Param('fileId') fileId: string,
    @Body('name') name: string,
  ) {
    const file = await this.filesService.getFile(fileId);

    await this.googleDocsService.renameDocument(file.path, name);

    return this.filesService.renameFile(fileId, name);
  }
}
