import { users_role } from "@prisma/client";
import { IUsers } from "../interfaces/users.interface";

export class CreateUserDto implements IUsers {
    name: string;
    email: string;
    role: users_role;
    password: string;
    created_at: Date;
    updated_at: Date;
    department_id: string;
}
