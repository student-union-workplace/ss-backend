import { INotification } from '../interfaces/notifications.interface';
import { notifications_type } from '@prisma/client';

export class CreateNotificationDto implements INotification {
  title: string;
  description: string;
  type: notifications_type;
  date: Date;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  activity_id: string;
}
