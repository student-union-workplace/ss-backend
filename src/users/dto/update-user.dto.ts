import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { users_role } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  vk_link?: string;

  @IsOptional()
  @IsString()
  tg_link?: string;

  @IsOptional()
  @IsEnum(users_role)
  role?: users_role;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  department_id?: string;
}
