import { IsBooleanString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterTasksDto {
  @ApiProperty({
    example: 'Квиз',
    description: 'Название задачи',
    required: false,
  })
  @IsString()
  @IsOptional()
  event_name?: string;

  @ApiProperty({
    example: 'задевал',
    description: 'Имя пользователя',
    required: false,
  })
  @IsString()
  @IsOptional()
  user_name?: string;

  @ApiProperty({
    example: '4a76ed16-0656-45f2-9768-94990d3e767',
    description: 'uuid пользователя при фильтрации',
    required: false,
  })
  @IsString()
  @IsOptional()
  user_id?: string;

  @ApiProperty({
    example: 'true',
    description:
      'boolean статус для получения задач авторизованного пользователя',
    required: false,
  })
  @IsBooleanString()
  @IsOptional()
  is_mine?: string;
}
