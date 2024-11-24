import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from '../prisma.service';
import { notifications_type } from '@prisma/client';



@Injectable()
export class EventsService {

  constructor(private prisma: PrismaService) { }

  async create(createEventDto: CreateEventDto) {
    const event = await this.prisma.events.create({
      data: {
        name: createEventDto.name,
        description: createEventDto.description,
        date: createEventDto.date,
        is_archived: createEventDto.is_archived,
        prev_same_event_id: createEventDto.prev_same_event_id,
        theme_id: createEventDto.theme_id,
      }
    });
    const eventUsers = createEventDto.event_users.map(userId => ({
      event_id: event.id,
      user_id: userId,
    }));

    const eventManagers = createEventDto.event_managers.map(userId => ({
      event_id: event.id,
      user_id: userId,
    }));

    const eventLocations = createEventDto.event_locations.map(locId => ({
      event_id: event.id,
      location_id: locId,
    }));

    const userNotification = createEventDto.event_users.map(userId => ({
      title: 'Вас добавили в мероприятие: ' + createEventDto.name,
      description: 'Описание мероприятия: ' + createEventDto.description,
      type: notifications_type.event,
      date: new Date(),
      user_id: userId,
      event_id: event.id
    }));

    const managerNotification = createEventDto.event_managers.map(userId => ({
      title: 'Вы теперь руководитель мероприятия: ' + createEventDto.name,
      description: 'Описание мероприятия: ' + createEventDto.description,
      type: notifications_type.event,
      date: new Date(),
      user_id: userId,
      event_id: event.id
    }));

    await Promise.all([
      this.prisma.events_managers.createMany({
        data: eventManagers
      }),
      this.prisma.events_users.createMany({
        data: eventUsers
      }),
      this.prisma.events_locations.createMany({
        data: eventLocations
      }),
      this.prisma.notifications.createMany({
        data: userNotification
      }),
      this.prisma.notifications.createMany({
        data: managerNotification
      })
    ]);
    return event;
  }

  async findAll(query: { is_archived?: boolean; name?: string; theme?: string; page?: number; pageSize?: number }) {
    const {
      is_archived,  // Это теперь boolean
      name,
      theme,
      page = 1,
      pageSize = 10,
    } = query;

    const skip = (page - 1) * pageSize; // Параметры для пагинации

    // Обработка фильтрации по is_archived
    const isArchivedFilter =
      is_archived === true
        ? true // Если is_archived = true, фильтруем только архивированные
        : is_archived === false || is_archived === undefined
          ? { not: true } // Если false или undefined, фильтруем только неархивированные
          : undefined; // Если значение некорректно, игнорируем фильтр

    // Выполняем запрос к базе данных
    const events = await this.prisma.events.findMany({
      where: {
        is_archived: isArchivedFilter, // Фильтр по архиву
        name: name ? { contains: name } : undefined, // Фильтр по имени
        theme_id: theme ? { contains: theme } : undefined, // Фильтр по теме
      },
      include: {
        events_users: {
          select: {
            users: { select: { id: true, name: true } },
          },
        },
        events_managers: {
          select: {
            users: { select: { id: true, name: true } },
          },
        },
        events_locations: {
          select: {
            locations: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: {
        date: 'asc', // Сортировка по дате
      },
      skip,
      take: pageSize,
    });

    // Считаем общее количество записей для текущего фильтра
    const total = await this.prisma.events.count({
      where: {
        is_archived: isArchivedFilter,
        name: name ? { contains: name } : undefined,
        theme_id: theme ? { contains: theme } : undefined,
      },
    });

    // Формируем ответ с пагинацией
    return {
      total, // Общее количество записей
      page,
      pageSize,
      data: events, // Список событий
    };
  }

  async findOne(id: string) {
    // Основной запрос
    const event = await this.prisma.events.findUnique({
      where: { id },
      include: {
        events_users: {
          select: {
            users: { select: { id: true, name: true } },
          },
        },
        events_managers: {
          select: {
            users: { select: { id: true, name: true } },
          },
        },
        events_locations: {
          select: {
            locations: { select: { id: true, name: true, address: true } },
          },
        },
        event_themes: {
          select: { id: true, name: true },
        },
      },
    });

    // Если есть ID предыдущего мероприятия, делаем дополнительный запрос
    let prevSameEvent = null;
    if (event.prev_same_event_id) {
      prevSameEvent = await this.prisma.events.findUnique({
        where: { id: event.prev_same_event_id },
        include: {
          events_users: {
            select: {
              users: { select: { id: true, name: true } },
            },
          },
          events_managers: {
            select: {
              users: { select: { id: true, name: true } },
            },
          },
          events_locations: {
            select: {
              locations: { select: { id: true, name: true, address: true } },
            },
          },
        },
      });
    }

    // Возвращаем основной объект и данные о предыдущем мероприятии
    return { ...event, prev_same_event: prevSameEvent };
  }

  async update(eventId: string, updateEventDto: UpdateEventDto) {
    // Обновление данных события
    const updatedEvent = await this.prisma.events.update({
      where: { id: eventId },
      data: {
        name: updateEventDto.name,
        description: updateEventDto.description,
        date: updateEventDto.date,
        is_archived: updateEventDto.is_archived,
        prev_same_event_id: updateEventDto.prev_same_event_id,
        theme_id: updateEventDto.theme_id,
      },
    });

    // Обновление зависимостей
    if (updateEventDto.event_users) {
      // Удаляем старые связи
      await this.prisma.events_users.deleteMany({
        where: { event_id: eventId },
      });
      // Добавляем новые связи
      const eventUsers = updateEventDto.event_users.map((userId) => ({
        event_id: eventId,
        user_id: userId,
      }));
      await this.prisma.events_users.createMany({
        data: eventUsers,
      });
    }

    if (updateEventDto.event_managers) {
      // Удаляем старые связи
      await this.prisma.events_managers.deleteMany({
        where: { event_id: eventId },
      });
      // Добавляем новые связи
      const eventManagers = updateEventDto.event_managers.map((userId) => ({
        event_id: eventId,
        user_id: userId,
      }));
      await this.prisma.events_managers.createMany({
        data: eventManagers,
      });
    }

    if (updateEventDto.event_locations) {
      // Удаляем старые связи
      await this.prisma.events_locations.deleteMany({
        where: { event_id: eventId },
      });
      // Добавляем новые связи
      const eventLocations = updateEventDto.event_locations.map((locId) => ({
        event_id: eventId,
        location_id: locId,
      }));
      await this.prisma.events_locations.createMany({
        data: eventLocations,
      });
    }

    // Создание новых уведомлений (опционально)
    // if (updateEventDto.event_users) {
    //   const userNotification = updateEventDto.event_users.map((userId) => ({
    //     title: 'Обновление мероприятия: ' + updateEventDto.name,
    //     description: 'Описание мероприятия было обновлено: ' + updateEventDto.description,
    //     type: notifications_type.event,
    //     date: new Date(),
    //     user_id: userId,
    //     event_id: eventId,
    //   }));
    //   await this.prisma.notifications.createMany({
    //     data: userNotification,
    //   });
    // }

    // if (updateEventDto.event_managers) {
    //   const managerNotification = updateEventDto.event_managers.map((userId) => ({
    //     title: 'Вы руководитель обновленного мероприятия: ' + updateEventDto.name,
    //     description: 'Описание мероприятия было обновлено: ' + updateEventDto.description,
    //     type: notifications_type.event,
    //     date: new Date(),
    //     user_id: userId,
    //     event_id: eventId,
    //   }));
    //   await this.prisma.notifications.createMany({
    //     data: managerNotification,
    //   });
    // }

    return updatedEvent;
  }

  async remove(id: string) {
    await this.prisma.$transaction(async () => {
      // Удаляем связанные записи из events_locations
      await this.prisma.events_locations.deleteMany({
        where: { event_id: id },
      });

      // Удаляем связанные записи из events_managers
      await this.prisma.events_managers.deleteMany({
        where: { event_id: id },
      });

      // Удаляем связанные записи из events_users
      await this.prisma.events_users.deleteMany({
        where: { event_id: id },
      });

      // Удаляем связанные записи из notifications
      await this.prisma.notifications.deleteMany({
        where: { event_id: id },
      });

      // Удаляем сам event
      await this.prisma.events.delete({
        where: { id },
      });
    });

    return true;
  }

  async statusChange(id: string) {
    const currentEvent = await this.prisma.events.findUnique({
      where: { id },
      select: {
        is_archived: true,
      }
    })

    const inversEvent = !currentEvent.is_archived;

    return await this.prisma.events.update({
      where: { id },
      data: {
        is_archived: inversEvent,
      },
    });
  }
}
