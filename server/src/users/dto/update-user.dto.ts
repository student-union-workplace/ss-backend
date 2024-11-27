import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { users_role } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    name?: string;
    phone_number?: string;
    email?: string;
    vk_link?: string;
    tg_link?: string;
    role?: users_role;
    password?: string;
    created_at?: Date;
    updated_at?: Date;
    department_id?: string;
}
