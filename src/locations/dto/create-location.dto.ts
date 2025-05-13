import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto implements Prisma.locationsCreateInput {
  @ApiProperty({
    example: 'Задний двор коворкинга',
    description: 'Название локации',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Описание локации',
    description: 'Описание локации',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 'Мира 32, задний двор коворкинга',
    description: 'Адрес локации',
  })
  @IsString()
  address: string;

  created_at: Date;
  updated_at: Date;
}
