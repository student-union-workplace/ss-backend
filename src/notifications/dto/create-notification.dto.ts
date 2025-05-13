import { INotification } from '../interfaces/notifications.interface';
import { notifications_type } from '@prisma/client';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateNotificationDto implements INotification {
  @ApiProperty({
    example: 'Вас добавили к задаче',
    description: 'Заголовок уведомления',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Вас добавили к задаче ...',
    description: 'Описание уведомления',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: notifications_type.task,
    description: 'Тип уведомления',
    enum: notifications_type,
  })
  @IsEnum(notifications_type)
  type: notifications_type;

  @ApiProperty({
    example: '2025-05-13T06:24:28.000Z',
    description: 'дедлайн уведомления или дата назначения',
  })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    example: '4a76ed16-0656-45f2-9768-94990d3e7679',
    description: 'uuid пользователя, кому назначено уведомление',
  })
  @IsString()
  user_id: string;

  @ApiProperty({
    example: '9410d0c4-95c6-4c1e-9d58-725cbb86455d',
    description: 'uuid события, по которому назначено уведомление',
    required: false,
  })
  @IsString()
  @IsOptional()
  activity_id: string;

  @ApiProperty({
    example: '003003dc-de56-4fc6-8145-7fb0aac9b866',
    description: 'uuid мероприятия, по которому назначено уведомление',
    required: false,
  })
  @IsString()
  @IsOptional()
  event_id: string;

  @ApiProperty({
    example: 'cc9b8899-5764-4afd-b432-2561435c3a88',
    description: 'uuid задачи, по которой назначено уведомление',
    required: false,
  })
  @IsString()
  @IsOptional()
  task_id: string;

  created_at: Date;
  updated_at: Date;
}
