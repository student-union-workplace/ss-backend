import { Prisma } from '@prisma/client';

export class CreateLocationDto implements Prisma.locationsCreateInput {
  name: string;
  description: string;
  address: string;
  created_at: Date;
  updated_at: Date;
}
