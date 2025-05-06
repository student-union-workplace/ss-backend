import { Module } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';
import { FilesModule } from '../files/files.module';
import { GoogleSheetsController } from './google-sheets.controller';

@Module({
  imports: [FilesModule],
  controllers: [GoogleSheetsController],
  providers: [GoogleSheetsService],
})
export class GoogleSheetsModule {}
