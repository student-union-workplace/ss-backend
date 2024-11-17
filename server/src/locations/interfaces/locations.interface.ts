import { Prisma } from "@prisma/client";

export interface ILocation {
    id?: string;
    name: string;
    description: string;
    address: string;
}
