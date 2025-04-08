import { tasks_status } from '@prisma/client';

export interface ITask {
  id?: string;
  name: string;
  priority?: number;
  description?: string;
  deadline?: Date;
  status?: tasks_status;
  created_at?: Date;
  updated_at?: Date;
  event_id?: string;
  user_id?: string;
}
export class Task {}
