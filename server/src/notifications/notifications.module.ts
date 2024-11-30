import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [NotificationsController],
  // поскольку мы начали работать с бд по средствам Prisma, обязательно в .module файле нужно указать этот сервис PrismaService
  providers: [NotificationsService, PrismaService],
})
export class NotificationsModule {}
