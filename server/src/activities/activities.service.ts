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
      title: 'Вас добавили к событию: ' + createActivityDto.name,
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

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    const updatedActivity = await this.prisma.activities.update({
      where: { id },
      data: {
        name: updateActivityDto.name,
        description: updateActivityDto.description,
        date: updateActivityDto.date,
        location_id: updateActivityDto.location_id,
        created_by_id: updateActivityDto.created_by_id,
        is_completed: updateActivityDto.is_completed,
      },
    });
    if (updateActivityDto.users) {
      // Обновляем записи в таблице activities_users
      // Удаляем старые связи
      await this.prisma.activities_users.deleteMany({
        where: { activity_id: id },
      });

      // Создаем новые связи
      const newActivityUsers = updateActivityDto.users.map(userId => ({
        activity_id: id,
        user_id: userId,
      }));

      await this.prisma.activities_users.createMany({
        data: newActivityUsers,
      });

      // Создаем уведомления для пользователей
      // const notifications = updateActivityDto.users.map(userId => ({
      //   title: 'Данные события "' + updateActivityDto.name + '" обновлены.',
      //   description: 'Обновленное описание: ' + updateActivityDto.description,
      //   type: notifications_type.activity,
      //   date: new Date(),
      //   user_id: userId,
      //   activity_id: id
      // }));

      // await this.prisma.notifications.createMany({
      //   data: notifications,
      // });
    }
    return updatedActivity;
  }

  async statusChanger(id: string) {
    const currentActivity = await this.prisma.activities.findUnique({
      where: { id },
      select: {
        is_completed: true,
      }
    })

    const inverseActivity = !currentActivity.is_completed;
    return this.prisma.activities.update({
      where: { id },
      data: {
        is_completed: inverseActivity,
      },
    });
  }

  async remove(id: string) {
    await this.prisma.$transaction(async () => {
      // Удаляем связанные записи из activities_users
      await this.prisma.activities_users.deleteMany({
        where: { activity_id: id },
      });

      // Удаляем связанные записи из notifications
      await this.prisma.notifications.deleteMany({
        where: { activity_id: id },
      });

      // Удаляем саму activity
      await this.prisma.activities.delete({
        where: { id },
      });
    });

    return true; // Если транзакция прошла успешно, возвращаем true
  }
}

