import { notifications_status, notifications_type } from '@prisma/client';

// описание интерфейса уведомления - указываются все возможные поля и типы данных
// ? означает, что поле небязательно
// цель - описать структуру уведомления для дальнейшего использования
export interface INotification {
  id?: string;
  title: string;
  description: string;
  type: notifications_type;
  date: Date;
  status: notifications_status;
  task_id?: string;
  event_id?: string;
  user_id: string;
}
