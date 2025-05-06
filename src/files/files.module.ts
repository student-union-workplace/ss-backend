import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PrismaService } from '../prisma.service';
import { GoogleDocsService } from '../google-docs/google-docs.service';
import { GoogleSheetsService } from '../google-sheets/google-sheets.service';

@Module({
  providers: [
    FilesService,
    PrismaService,
    GoogleDocsService,
    GoogleSheetsService,
  ],
  controllers: [FilesController],
  exports: [FilesService],
})
export class FilesModule {}
