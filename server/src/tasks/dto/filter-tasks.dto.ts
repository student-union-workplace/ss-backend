import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class FilterTasksDto {
  @IsString()
  @IsOptional()
  event_name?: string;

  @IsString()
  @IsOptional()
  user_name?: string;

  @IsBoolean()
  @IsOptional()
  is_mine?: boolean;
}
