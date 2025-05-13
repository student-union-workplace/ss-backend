import { users_role } from '@prisma/client';
import { IUsers } from '../interfaces/users.interface';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements IUsers {
  @ApiProperty({
    example: 'Фамилия Имя',
    description: 'Имя пользователя',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'email@mail.ru',
    description: 'Почта пользователя',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: users_role.old,
    description: 'Роль пользователя',
    enum: users_role,
  })
  @IsEnum(users_role)
  role: users_role;

  @ApiProperty({
    example: 'user_password',
    description: 'Пароль пользователя',
    enum: users_role,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '3abaa420-7d4a-47a1-a87a-de51e1e957d6',
    description: 'uuid комиссии',
  })
  @IsString()
  department_id: string;

  created_at: Date;
  updated_at: Date;
}
