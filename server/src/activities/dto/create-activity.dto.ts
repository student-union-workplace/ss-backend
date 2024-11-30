import { IActivities } from '../interface/activities.interface';
// dto - data transfer object.
// Цель: Файл-класс, описывающий данные, которые мы хотим принимать
// implements наследует созданный интерфейс INotification
export class CreateActivityDto implements IActivities {
  name: string;
  description: string;
  date: Date;
  location_id: string;
  created_by_id: string;
  is_completed?: boolean;
  created_at: Date;
  updated_at: Date;
  users: string[];
}
