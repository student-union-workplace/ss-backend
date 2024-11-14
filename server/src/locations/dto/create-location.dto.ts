import { Prisma } from '@prisma/client';
import { ILocation } from '../interfaces/locations.interface';
// dto - data transfer object.
// Цель: Файл-класс, описывающий данные, которые мы хотим принимать
// implements наследует созданный интерфейс INotification
export class CreateLocationDto implements Prisma.locationsCreateInput {
    id: string;
    name: string;
    description: string;
    address: string;
    created_at: Date;
    updated_at: Date;
}