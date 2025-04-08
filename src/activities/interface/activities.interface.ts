import { activity_users, locations, notifications } from '@prisma/client';

// описание интерфейса уведомления - указываются все возможные поля и типы данных
// ? означает, что поле небязательно
// цель - описать структуру уведомления для дальнейшего использования
export interface IActivities {
  id?: string;
  name: string;
  description: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
  location_id: string;
  created_by_user_id?: string;
  is_completed?: boolean;
  users: string[];
  location?: locations;
  activity_users?: activity_users[];
  notifications?: notifications[];
}
