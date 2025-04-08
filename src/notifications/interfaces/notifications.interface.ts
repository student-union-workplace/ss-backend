import { activities, events, notifications_type } from '@prisma/client';

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
  activity_id?: string;
  activities?: activities;
  events?: events;
}
