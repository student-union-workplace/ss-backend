import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto';
import { Prisma, activities_users, notifications, users, locations } from '@prisma/client';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {
    id?: string;
    name?: string;
    description?: string;
    date?: Date;
    created_at?: Date;
    updated_at: Date;
    location_id?: string;
    created_by_id?: string;
    is_completed?: Boolean;
    //users?: users;
    locations?: locations;
    activities_users?: activities_users[];
    notifications?: notifications[];
}

