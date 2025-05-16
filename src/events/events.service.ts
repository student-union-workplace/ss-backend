import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from '../prisma.service';
import { file_type, notifications_type } from '@prisma/client';
import { PageDto } from 'src/pagination/dto/page.dto';
import { PageMetaDto } from 'src/pagination/dto/page-meta.dto';
import { PageOptionsDto } from 'src/pagination/dto/page-options.dto';
import { IRequestWithUser } from '../interfaces/Request.interface';
import { FilesService } from '../files/files.service';

@Injectable()
export class EventsService {
  constructor(
    private prisma: PrismaService,
    private filesService: FilesService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const event = await this.prisma.events.create({
      data: {
        name: createEventDto.name,
        description: createEventDto.description,
        date: createEventDto.date,
        is_archived: createEventDto.is_archived
          ? createEventDto.is_archived
          : false,
        past_event_id: createEventDto.past_event_id,
        theme_id: createEventDto.theme_id,
      },
    });
    const eventUsers = createEventDto.users
      ? createEventDto.users.map((userId) => ({
          event_id: event.id,
          user_id: userId,
        }))
      : [];

    const eventManagers = createEventDto.managers.map((userId) => ({
      event_id: event.id,
      user_id: userId,
    }));

    const eventLocations = createEventDto.locations.map((locId) => ({
      event_id: event.id,
      location_id: locId,
    }));

    const userNotification = createEventDto.users.map((userId) => ({
      title: 'Вас добавили в мероприятие: ' + createEventDto.name,
      description: 'Описание мероприятия: ' + createEventDto.description,
      type: notifications_type.event,
      user_id: userId,
      event_id: event.id,
    }));

    const managerNotification = createEventDto.managers.map((userId) => ({
      title: 'Вы теперь руководитель мероприятия: ' + createEventDto.name,
      description: 'Описание мероприятия: ' + createEventDto.description,
      type: notifications_type.event,
      user_id: userId,
      event_id: event.id,
    }));

    await Promise.all([
      this.prisma.events_managers.createMany({
        data: eventManagers,
      }),
      this.prisma.events_users.createMany({
        data: eventUsers,
      }),
      this.prisma.events_locations.createMany({
        data: eventLocations,
      }),
      await this.prisma.notifications.createMany({
        data: [...userNotification, ...managerNotification],
      }),
    ]);
    return event;
  }

  async findAll(
    req: IRequestWithUser,
    pageOptionsDTO: PageOptionsDto,
    isArchived?: string,
    name?: string,
    theme_id?: string,
    is_mine?: string,
    user_id?: string,
  ): Promise<PageDto<any>> {
    const pageOptions = new PageOptionsDto(pageOptionsDTO);

    const eventWhereCondition: any = {
      is_archived:
        isArchived === 'true'
          ? true
          : isArchived === 'false'
            ? false
            : undefined,
      name: name ? { contains: name.toLowerCase() } : undefined,
      theme_id: theme_id ? { contains: theme_id } : undefined,
      users: {
        ...(is_mine === 'true' && {
          some: { user_id: req.user.id },
        }),
        ...(user_id && {
          some: { user_id },
        }),
      },
    };

    const itemCount = await this.prisma.events.count({
      where: eventWhereCondition,
    });

    const events = await this.prisma.events.findMany({
      where: eventWhereCondition,
      include: {
        users: {
          select: {
            users: { select: { id: true, name: true } },
          },
        },
        managers: {
          select: {
            users: { select: { id: true, name: true } },
          },
        },
        locations: {
          select: {
            locations: { select: { id: true, name: true } },
          },
        },
        theme: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      ...(pageOptions.order && {
        orderBy: {
          date: pageOptions.order,
        },
      }),
      ...(pageOptions.skip && { skip: +pageOptions.skip }),
      ...(pageOptions.take && { take: +pageOptions.take }),
    });

    const transformedEvents = events.map((event) => ({
      ...event,
      users: event.users.map((eu) => eu.users),
      managers: event.managers.map((em) => em.users),
      locations: event.locations.map((em) => em.locations),
    }));

    const pageMeta = new PageMetaDto({
      pageOptionsDto: pageOptions,
      itemCount,
    });

    return new PageDto(transformedEvents, pageMeta);
  }

  async findOne(id: string) {
    const event = await this.prisma.events.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            users: { select: { id: true, name: true } },
          },
        },
        managers: {
          select: {
            users: { select: { id: true, name: true } },
          },
        },
        locations: {
          select: {
            locations: { select: { id: true, name: true, address: true } },
          },
        },
        theme: {
          select: { id: true, name: true },
        },
        files: {
          select: {
            id: true,
            name: true,
            path: true,
            type: true,
            created_at: true,
            users: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            created_at: 'desc',
          },
        },
      },
    });

    const filesWithUrls = Promise.all(
      event.files.map(async (file) => {
        let url = '';
        if (file.type === file_type.doc) {
          url = `https://docs.google.com/document/d/${file.path}`;
        }
        if (file.type === file_type.sheet) {
          url = `https://docs.google.com/spreadsheets/d/${file.path}`;
        }
        if (file.type === file_type.other && file.path) {
          url = await this.filesService.generateDownloadUrl(file.path);
        }
        return {
          ...file,
          url,
          created_by: file.users,
        };
      }),
    );

    const transformedEvent = {
      ...event,
      users: event.users.map((eu) => eu.users),
      managers: event.managers.map((em) => em.users),
      locations: event.locations.map((em) => em.locations),
      files: await filesWithUrls,
    };

    let prevSameEvent = null;
    if (transformedEvent.past_event_id) {
      prevSameEvent = await this.prisma.events.findUnique({
        where: { id: transformedEvent.past_event_id },
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
    }
    return { ...transformedEvent, prev_same_event: prevSameEvent };
  }

  async update(eventId: string, updateEventDto: UpdateEventDto) {
    const updatedEvent = await this.prisma.events.update({
      where: { id: eventId },
      data: {
        name: updateEventDto.name,
        description: updateEventDto.description,
        date: updateEventDto.date,
        is_archived: updateEventDto.is_archived,
        past_event_id: updateEventDto.past_event_id,
        theme_id: updateEventDto.theme_id,
      },
    });

    if (updateEventDto.users) {
      await this.prisma.events_users.deleteMany({
        where: { event_id: eventId },
      });
      const eventUsers = updateEventDto.users.map((userId) => ({
        event_id: eventId,
        user_id: userId,
      }));
      await this.prisma.events_users.createMany({
        data: eventUsers,
      });
    }

    if (updateEventDto.managers) {
      await this.prisma.events_managers.deleteMany({
        where: { event_id: eventId },
      });
      const eventManagers = updateEventDto.managers.map((userId) => ({
        event_id: eventId,
        user_id: userId,
      }));
      await this.prisma.events_managers.createMany({
        data: eventManagers,
      });
    }

    if (updateEventDto.locations) {
      await this.prisma.events_locations.deleteMany({
        where: { event_id: eventId },
      });
      const eventLocations = updateEventDto.locations.map((locId) => ({
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
      await this.prisma.events_locations.deleteMany({
        where: { event_id: id },
      });

      await this.prisma.events_managers.deleteMany({
        where: { event_id: id },
      });

      await this.prisma.events_users.deleteMany({
        where: { event_id: id },
      });

      await this.prisma.notifications.deleteMany({
        where: { event_id: id },
      });

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
      },
    });

    return this.prisma.events.update({
      where: { id },
      data: {
        is_archived: !currentEvent.is_archived,
      },
    });
  }
}
