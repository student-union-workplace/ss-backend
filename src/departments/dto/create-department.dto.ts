import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({
    example: 'СМК',
    description: 'Название комиссии',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '4a76ed16-0656-45f2-9768-94990d3e7679',
    description: 'uuid заместителя комиссии',
  })
  @IsString()
  @IsOptional()
  head_user_id?: string;
}
