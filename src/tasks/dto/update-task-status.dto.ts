import { IsEnum } from 'class-validator';
import { tasks_status } from '@prisma/client';

export class UpdateTaskStatusDto {
  @IsEnum(tasks_status)
  status: tasks_status;
}
