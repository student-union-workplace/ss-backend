import { users_role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUsers } from '../interfaces/users.interface';

export class UpdateUserDto implements IUsers {
  @ApiProperty({
    example: 'Фамилия Имя',
    description: 'Имя пользователя',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 'Номер телефона пользователя',
    description: '88005553535',
    required: false,
  })
  @IsPhoneNumber('RU')
  @IsNotEmpty()
  @IsOptional()
  phone_number?: string;

  @ApiProperty({
    example: 'email@mail.ru',
    description: 'Почта пользователя',
    required: false,
  })
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: 'Ссылка на вк пользователя',
    description: 'https://vk.com/user',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  vk_link?: string;

  @ApiProperty({
    example: 'Ссылка на телеграм пользователя',
    description: 'https://t.me/user',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  tg_link?: string;

  @ApiProperty({
    example: users_role.old,
    description: 'Роль пользователя',
    enum: users_role,
    default: users_role.old,
    required: false,
  })
  @IsEnum(users_role)
  @IsOptional()
  role: users_role;

  @ApiProperty({
    example: 'user_password',
    description: 'Пароль пользователя',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password: string;

  @ApiProperty({
    example: '3abaa420-7d4a-47a1-a87a-de51e1e957d6',
    description: 'uuid комиссии',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  department_id: string;

  created_at: Date;
  updated_at: Date;
}
