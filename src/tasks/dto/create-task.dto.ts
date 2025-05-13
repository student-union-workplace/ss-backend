import {
  IsString,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsDate,
} from 'class-validator';
import { ITask } from '../interfaces/task.interface';
import { tasks_status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateTaskDto implements ITask {
  @ApiProperty({
    example: 'Составить смету',
    description: 'Название задачи',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Составить смету и прикрепить в Google Таблицу',
    description: 'Описание задачи',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '2025-05-13T06:24:28.000Z',
    description: 'Дедлайн выполнения задачи',
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  deadline?: Date;

  @ApiProperty({
    example: '4a76ed16-0656-45f2-9768-94990d3e7679',
    description: 'uuid пользователя, на которого назначена задачи',
  })
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    example: tasks_status.open,
    description: 'Статус задачи (по дефолту "open")',
    enum: tasks_status,
  })
  @IsEnum(tasks_status)
  @IsOptional()
  status: tasks_status;

  @ApiProperty({
    example: '4a76ed16-0656-45f2-9768-94990d3e7679',
    description: 'uuid мероприятия, которому пренадлежит задача',
  })
  @IsString()
  @IsNotEmpty()
  event_id: string;
}
