import { Module } from '@nestjs/common';
import { GoogleDocsService } from './google-docs.service';
import { GoogleDocsController } from './google-docs.controller';

@Module({
  controllers: [GoogleDocsController],
  providers: [GoogleDocsService],
})
export class GoogleDocsModule {}
