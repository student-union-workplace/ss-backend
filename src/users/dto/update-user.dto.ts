import { users_role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Фамилия Имя',
    description: 'Имя пользователя',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'email@mail.ru',
    description: 'Почта пользователя',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: users_role.old,
    description: 'Роль пользователя',
    enum: users_role,
    default: users_role.old,
    required: false,
  })
  @IsEnum(users_role)
  @IsOptional()
  role?: users_role;

  @ApiProperty({
    example: 'user_password',
    description: 'Пароль пользователя',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string;

  @ApiProperty({
    example: '3abaa420-7d4a-47a1-a87a-de51e1e957d6',
    description: 'uuid комиссии',
    required: false,
  })
  @IsString()
  @IsOptional()
  department_id?: string;

  created_at: Date;
  updated_at: Date;
}
