import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    return this.prisma.departments.create({
      data: {
        name: createDepartmentDto.name,
        head_user_id: createDepartmentDto.head_user_id,
      },
    });
  }

  async findAll() {
    return this.prisma.departments.findMany({
      select: {
        id: true,
        name: true,
        head_user_id: true,
        created_at: true,
        updated_at: true,
        head_user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const department = await this.prisma.departments.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        head_user_id: true,
        created_at: true,
        updated_at: true,
        head_user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!department) {
      throw new Error('Комиссия не найдена');
    }

    return department;
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    const existingDepartment = await this.prisma.departments.findUnique({
      where: { id },
    });

    if (!existingDepartment) {
      throw new Error('Комиссия не найдена');
    }

    return this.prisma.departments.update({
      where: { id },
      data: {
        name: updateDepartmentDto.name,
        head_user_id: updateDepartmentDto.head_user_id,
      },
    });
  }

  async remove(id: string) {
    const existingDepartment = await this.prisma.departments.findUnique({
      where: { id },
    });

    if (!existingDepartment) {
      throw new Error('Комиссия не найдена');
    }

    return this.prisma.departments.delete({
      where: { id },
    });
  }
}
