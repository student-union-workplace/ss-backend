import { IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { ITask } from '../interfaces/task.interface';
import { tasks_status } from '@prisma/client';

export class CreateTaskDto implements ITask {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  deadline?: Date;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsEnum(tasks_status)
  status: tasks_status;

  @IsString()
  @IsNotEmpty()
  event_id: string;
}
