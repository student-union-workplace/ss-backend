import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { PrismaService } from '../prisma.service';
import { notifications_type } from '@prisma/client';
import { IRequestWithUser } from '../interfaces/Request.interface';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  async create(createActivityDto: CreateActivityDto, req: IRequestWithUser) {
    if (createActivityDto.location_id) {
      const eventLocations = await this.prisma.locations.findFirst({
        where: { id: createActivityDto.location_id },
      });

      if (!eventLocations)
        throw new BadRequestException(
          'Не найдено места проведения с указанным id не найдено',
        );
    }

    if (createActivityDto.users && createActivityDto.users.length > 0) {
      const usersCount = await this.prisma.users.count({
        where: {
          id: { in: createActivityDto.users },
        },
      });

      if (usersCount !== createActivityDto.users.length) {
        throw new BadRequestException(
          'Один или несколько пользователей события не найдены',
        );
      }
    }

    const activity = await this.prisma.activities.create({
      data: {
        name: createActivityDto.name,
        description: createActivityDto.description,
        date: createActivityDto.date,
        location_id: createActivityDto.location_id,
        created_by_user_id: req.user.id,
        is_completed: createActivityDto.is_completed,
      },
    });
    // TODO если участники не добавлены, то запрос ломается
    const userActivityEntries = createActivityDto.users.map((userId) => ({
      activity_id: activity.id,
      user_id: userId,
    }));

    const userNotification = createActivityDto.users.map((userId) => ({
      title: 'Вас добавили к событию: ' + createActivityDto.name,
      description: createActivityDto.description,
      type: notifications_type.activity,
      deadline: createActivityDto.date,
      user_id: userId,
      activity_id: activity.id,
    }));

    await Promise.all([
      this.prisma.activity_users.createMany({
        data: userActivityEntries,
      }),
      this.prisma.notifications.createMany({
        data: userNotification,
      }),
    ]);
    return activity;
  }

  async findAll(params: { startDate?: Date; endDate?: Date; year?: number }) {
    const { startDate, endDate, year } = params;
    let dateFilter = {};

    if (startDate && endDate) {
      dateFilter = {
        date: {
          gte: startDate,
          lte: endDate,
        },
      };
    } else if (year) {
      dateFilter = {
        date: {
          gte: new Date(year, 0, 1),
          lte: new Date(year, 11, 31, 23, 59, 59, 999),
        },
      };
    }

    return this.prisma.activities.findMany({
      where: dateFilter,
      select: {
        id: true,
        name: true,
        date: true,
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const activity = await this.prisma.activities.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        date: true,
        created_at: true,
        updated_at: true,
        is_completed: true,
        location: {
          select: {
            id: true,
            name: true,
            description: true,
            address: true,
          },
        },
        users: {
          select: {
            users: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        created_by_user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      ...activity,
      users: activity.users.map((el) => ({
        ...el.users,
      })),
    };
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    const updatedActivity = await this.prisma.activities.update({
      where: { id },
      data: {
        name: updateActivityDto.name,
        description: updateActivityDto.description,
        date: updateActivityDto.date,
        location_id: updateActivityDto.location_id,
        created_by_user_id: updateActivityDto.created_by_user_id,
        is_completed: updateActivityDto.is_completed,
      },
    });
    if (updateActivityDto.users) {
      await this.prisma.activity_users.deleteMany({
        where: { activity_id: id },
      });

      const newActivityUsers = updateActivityDto.users.map((userId) => ({
        activity_id: id,
        user_id: userId,
      }));

      await this.prisma.activity_users.createMany({
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
      },
    });

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
      await this.prisma.activity_users.deleteMany({
        where: { activity_id: id },
      });

      await this.prisma.notifications.deleteMany({
        where: { activity_id: id },
      });

      await this.prisma.activities.delete({
        where: { id },
      });
    });

    return true;
  }
}
