import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  create(createNotificationDto: CreateNotificationDto) {
    return this.prisma.notifications.create({
      data: createNotificationDto,
    });
  }

  findAll() {
    return this.prisma.notifications.findMany();
  }

  remove(id: string) {
    return this.prisma.notifications.delete({
      where: { id },
    });
  }
}
