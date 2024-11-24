import { activities_users, locations, notifications, users } from '@prisma/client';

export interface IEvents {
    id?: string;
    name: string;
    description: string;
    date: Date;
    is_archived: boolean;
    event_managers?: string[];
    event_users?: string[];
    event_locations?: string[];
    prev_same_event_id?: string;
    theme_id?: string;
    created_at: Date;
    updated_at: Date;
}
