import { IsString, IsOptional } from 'class-validator';

export class CreateThemeDto {
  @IsString()
  @IsOptional()
  name?: string;
}
