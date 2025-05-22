import { IEvents } from '../interface/events.interface';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEventDto implements IEvents {
  @ApiProperty({
    example: 'День студента',
    description: 'Название мероприятия',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    example: 'Традиционное мероприятия день студента',
    description: 'Описание мероприятия',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '2025-05-13T06:24:28.000Z',
    description: 'Дата проведения мероприятия',
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date?: Date;

  @ApiProperty({
    example: ['4a76ed16-0656-45f2-9768-94990d3e7679'],
    description: 'Массив uuid ответственных пользователей мероприятия',
  })
  @IsArray()
  @IsString({ each: true })
  managers?: string[];

  @ApiProperty({
    example: ['4a76ed16-0656-45f2-9768-94990d3e7679'],
    description: 'Массив uuid пользователей рабочей команд мероприятия',
  })
  @IsArray()
  @IsString({ each: true })
  users?: string[];

  @ApiProperty({
    example: ['2d87dc12-d351-11ef-82a3-50ebf6992398'],
    description: 'Массив uuid локаций проведения мероприятия',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  locations?: string[];

  @ApiProperty({
    example: '003003dc-de56-4fc6-8145-7fb0aac9b866',
    description: 'uuid прошлого мероприятия',
    required: false,
  })
  @IsOptional()
  @IsString()
  past_event_id?: string;

  @ApiProperty({
    example: 'c4cf8f7-d3e0-11ef-aa2a-50ebf6992398',
    description: 'uuid темы мероприятия',
  })
  @IsString()
  theme_id?: string;

  created_at: Date;
  updated_at: Date;
  is_archived: boolean;
}
