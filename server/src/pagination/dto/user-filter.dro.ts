import { PageOptionsDto } from "./page-options.dto";
import { IsOptional, IsString } from 'class-validator';

export class GetUsersFilterDto extends PageOptionsDto {
    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsString()
    readonly departmentName?: string;

    @IsOptional()
    @IsString()
    readonly role?: string;
}