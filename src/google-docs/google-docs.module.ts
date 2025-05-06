import { Module } from '@nestjs/common';
import { GoogleDocsService } from './google-docs.service';
import { GoogleDocsController } from './google-docs.controller';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule],
  controllers: [GoogleDocsController],
  providers: [GoogleDocsService],
})
export class GoogleDocsModule {}
