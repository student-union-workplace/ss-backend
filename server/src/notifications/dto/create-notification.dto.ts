import { INotification } from '../interfaces/notifications.interface';
import { notifications_type, notifications_status } from '@prisma/client';

// dto - data transfer object.
// Цель: Файл-класс, описывающий данные, которые мы хотим принимать
// implements наследует созданный интерфейс INotification
export class CreateNotificationDto implements INotification {
  title: string;
  description: string;
  type: notifications_type;
  date: Date;
  status: notifications_status;
  task_id?: string;
  event_id?: string;
  user_id: string;
}
