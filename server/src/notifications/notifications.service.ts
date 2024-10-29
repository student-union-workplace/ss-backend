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

  // написать запрос для получения всех уведомлений, используя prisma
  findAll() {
    return `Этот запрос должен возвращать все уведомления`;
  }

  // написать запрос для удаления уведомления по его id
  remove(id: string) {
    return `Этот запрос должен удалять уведомление в системе по его id = ${id}`;
  }
}
