import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { notifications_type, tasks_status } from '@prisma/client';
import { IRequestWithUser } from '../interfaces/Request.interface';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, req: IRequestWithUser) {
    let userNotification = {};
    const task = await this.prisma.tasks.create({
      data: createTaskDto,
    });

    if (req.user.id !== createTaskDto.user_id) {
      userNotification = {
        title: 'Вам назначена задача: ' + createTaskDto.name,
        description: 'Описание: ' + createTaskDto.description,
        type: notifications_type.task,
        deadline: createTaskDto.deadline,
        user_id: createTaskDto.user_id,
        event_id: createTaskDto.event_id,
        task_id: task.id,
      };
    }
    try {
      await this.prisma.notifications.create({
        data: userNotification,
      });
    } catch (e) {
      throw e;
    }

    return task;
  }

  async getAll(filters: FilterTasksDto, req: IRequestWithUser) {
    const { event_name, user_name, is_mine = false } = filters;

    return this.prisma.tasks.findMany({
      where: {
        ...(event_name && {
          event: { name: { contains: event_name } },
        }),
        ...(user_name && {
          user: { name: { contains: user_name } },
        }),
        ...(Boolean(is_mine) && {
          user: { id: { equals: req.user.id } },
        }),
      },
      include: {
        event: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        deadline: 'desc',
      },
    });
  }

  async getTaskById(id: string) {
    return this.prisma.tasks.findUnique({
      where: { id },
      include: {
        event: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: string, status: UpdateTaskDto) {
    return this.prisma.tasks.update({
      where: { id },
      data: status,
    });
  }

  async updateTaskStatus(id: string, status: tasks_status) {
    return this.prisma.tasks.update({
      where: { id },
      data: { status },
    });
  }
}
