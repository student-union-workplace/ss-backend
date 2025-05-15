import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PrismaService } from '../prisma.service';
import { GoogleDocsService } from '../google-docs/google-docs.service';
import { GoogleSheetsService } from '../google-sheets/google-sheets.service';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  providers: [
    {
      provide: 'S3_CLIENT',
      useFactory: (cfg: ConfigService) =>
        new S3Client({
          endpoint: cfg.get('S3_ENDPOINT'),
          region: cfg.get('S3_REGION') || 'us-east-1',
          credentials: {
            accessKeyId: cfg.get('AWS_ACCESS_KEY_ID')!,
            secretAccessKey: cfg.get('AWS_SECRET_ACCESS_KEY')!,
          },
          forcePathStyle: true,
        }),
      inject: [ConfigService],
    },
    FilesService,
    PrismaService,
    GoogleDocsService,
    GoogleSheetsService,
  ],
  controllers: [FilesController],
  exports: [FilesService],
})
export class FilesModule {}
