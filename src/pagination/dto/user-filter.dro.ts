import { PageOptionsDto } from './page-options.dto';
import { IsOptional, IsString } from 'class-validator';
import { users_role } from '@prisma/client';

export class GetUsersFilterDto extends PageOptionsDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly departmentName?: string;

  @IsOptional()
  @IsString()
  readonly role?: users_role;
}
