import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto';
import { Prisma, activities_users, notifications, users, locations } from '@prisma/client';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {
    name?: string;
    description?: string;
    date?: Date;
    location_id?: string;
    created_by_id?: string;
    is_complited?: boolean;
    created_at: Date;
    updated_at: Date;
    users?: string[];
}

