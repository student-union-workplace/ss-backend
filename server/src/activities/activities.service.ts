import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { PrismaService } from '../prisma.service';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';
import { notifications_type } from '@prisma/client';


@Injectable()
export class ActivitiesService {

  constructor(private prisma: PrismaService) { }

  async create(createActivityDto: CreateActivityDto, createNotificationDto: CreateNotificationDto) {
    const activity = await this.prisma.activities.create({
      data: {
        name: createActivityDto.name,
        description: createActivityDto.description,
        date: createActivityDto.date,
        location_id: createActivityDto.location_id,
        created_by_id: createActivityDto.created_by_id,
        is_completed: createActivityDto.is_complited,
      }
    })
    const userActivityEntries = createActivityDto.users.map(userId => ({
      activity_id: activity.id,
      user_id: userId,
    }));


    const userNotification = createActivityDto.users.map(userId => ({
      title: 'Вас добавили к событию:' + createActivityDto.name,
      description: createActivityDto.description,
      type: notifications_type.activity,
      date: new Date(),
      user_id: userId,
      activity_id: activity.id
    }));

    await Promise.all([
      this.prisma.activities_users.createMany({
        data: userActivityEntries
      }),
      this.prisma.notifications.createMany({
        data: userNotification
      })
    ]);
    return activity;

  }

  async findAll(params: { startDate?: Date; endDate?: Date; year?: number }) {
    const { startDate, endDate, year } = params;

    let dateFilter = {};

    if (startDate && endDate) {
      // Фильтр по диапазону дат
      dateFilter = {
        date: {
          gte: startDate,
          lte: endDate,
        },
      };
    } else if (year) {
      // Фильтр по году
      dateFilter = {
        date: {
          gte: new Date(year, 0, 1),
          lte: new Date(year, 11, 31, 23, 59, 59, 999),
        },
      };
    }

    // Используем select, чтобы вернуть только нужные поля
    return this.prisma.activities.findMany({
      where: dateFilter,
      select: {
        id: true,
        name: true,
        date: true,
      },
      orderBy: {
        date: 'asc', // Сортировка по дате
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.activities.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        date: true,
        created_at: true,
        updated_at: true,
        is_completed: true,
        locations: {
          select: {
            id: true,
            name: true,
            description: true,
            address: true,
          },
        },
        users: {
          select: {
            id: true,
            name: true,
          },
        },
      },

    });
  }
  // update(id: string, updateActivityDto: UpdateActivityDto) {
  //   return this.prisma.activities.update({
  //     where: { id },
  //     data: updateActivityDto,
  //   });
  // }

  remove(id: string) {
    return `This action removes a #${id} activity`;
  }
}
