import { users_role, activities, activities_users, departments, events_managers, events_users, notifications } from '@prisma/client';

export interface IUsers {
    id?: string;
    name: string;
    phone_number?: string;
    email: string;
    vk_link?: string;
    tg_link?: string;
    role: users_role;
    password: string;
    created_at: Date;
    updated_at: Date;
    department_id: string;
    isDepartmentHead?: boolean;
}