import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from '../prisma.service';
import { IRequestWithUser } from '../interfaces/Request.interface';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  create(createNotificationDto: CreateNotificationDto) {
    return this.prisma.notifications.create({
      data: createNotificationDto,
    });
  }

  findAll(req: IRequestWithUser) {
    return this.prisma.notifications.findMany({
      where: {
        user_id: req.user.id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.notifications.delete({
      where: { id },
    });
  }
}
