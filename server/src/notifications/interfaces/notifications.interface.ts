import { activities, events, notifications_type, users } from '@prisma/client';

// описание интерфейса уведомления - указываются все возможные поля и типы данных
// ? означает, что поле небязательно
// цель - описать структуру уведомления для дальнейшего использования
export interface INotification {
  id?: string;
  title: string;
  description: string;
  type: notifications_type;
  date: Date;
  created_at: Date;
  updated_at: Date;
  task_id?: string;
  user_id: string;
  event_id?: string;
  activity_id: string;
  activities?: activities;
  events?: events;
}
