import { IActivities } from '../interface/activities.interface';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateActivityDto implements IActivities {
  @ApiProperty({ example: 'Планерка пб', description: 'Название события' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Общая обязательная планерка',
    description: 'Описание события',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: '2025-05-13T06:24:28.000Z',
    description: 'Описание события',
  })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    example: '2d87dc12-d351-11ef-82a3-50ebf6992398',
    description: 'uuid места проведения',
    required: false,
  })
  @IsString()
  @IsOptional()
  location_id: string;

  @IsArray()
  @ApiProperty({
    example: [
      '4a76ed16-0656-45f2-9768-94990d3e7679',
      '73b55bd5-c93d-4676-a712-da62673194aa',
    ],
    description: 'массив uuid пользователей',
  })
  @IsString({ each: true })
  users: string[];

  is_completed?: boolean;
  created_by_user_id: string;
  created_at: Date;
  updated_at: Date;
}
