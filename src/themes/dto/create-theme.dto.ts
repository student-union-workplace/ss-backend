import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateThemeDto {
  @ApiProperty({
    example: 'Квест',
    description: 'Название темы мероприятия',
  })
  @IsString()
  name: string;
}
