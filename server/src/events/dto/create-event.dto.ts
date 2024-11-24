import { Prisma, activities_users, notifications, users } from '@prisma/client';
import { IEvents } from '../interface/events.interface';
// dto - data transfer object.
// Цель: Файл-класс, описывающий данные, которые мы хотим принимать
// implements наследует созданный интерфейс INotification
export class CreateEventDto implements IEvents {
    name: string;
    description: string;
    date: Date;
    is_archived: boolean;
    event_managers?: string[];
    event_users?: string[];
    event_locations?: string[];
    prev_same_event_id?: string;
    theme_id?: string;
    created_at: Date;
    updated_at: Date;
}