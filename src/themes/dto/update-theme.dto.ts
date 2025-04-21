import { IsString, IsOptional } from 'class-validator';

export class UpdateThemeDto {
  @IsString()
  @IsOptional()
  name?: string;
}
