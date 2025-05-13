import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    example: 'mail@mail.ru',
    description: 'email для авторизации',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'user_password',
    description: 'Пароль',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
