import { activities_users, locations, notifications, users } from '@prisma/client';

// описание интерфейса уведомления - указываются все возможные поля и типы данных
// ? означает, что поле небязательно
// цель - описать структуру уведомления для дальнейшего использования
export interface IActivities {
    id?: string;
    name: string;
    description: string;
    date: Date;
    created_at: Date;
    updated_at: Date;
    location_id: string;
    created_by_id?: string;
    is_completed?: boolean;
    users: string[];
    locations?: locations;
    activities_users?: activities_users[];
    notifications?: notifications[];
}
