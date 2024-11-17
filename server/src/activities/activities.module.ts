import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PrismaService } from '../prisma.service';


@Module({
  imports: [],
  controllers: [ActivitiesController],
  providers: [ActivitiesService, PrismaService, NotificationsService],
})
export class ActivitiesModule { }
