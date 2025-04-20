import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { GetUsersFilterDto } from 'src/pagination/dto/user-filter.dro';
import { PageDto } from 'src/pagination/dto/page.dto';
import { PageMetaDto } from 'src/pagination/dto/page-meta.dto';
import * as bcrypt from 'bcrypt';
import { PageOptionsDto } from '../pagination/dto/page-options.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

    const user = await this.prisma.users.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        role: createUserDto.role,
        password: hashedPassword,
        department_id: createUserDto.department_id,
        created_at: createUserDto.created_at,
        updated_at: createUserDto.updated_at,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prisma.users.findUnique({
      where: { email: loginUserDto.email },
    });

    const isPasswordValid = bcrypt.compareSync(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Неверный пароль');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll(filterDto: GetUsersFilterDto): Promise<PageDto<any>> {
    const { name, departmentName, role, page, take, order } = filterDto;

    const pageOptions = new PageOptionsDto({ page, take, order });

    const where: any = {
      AND: [
        name ? { name: { contains: name } } : undefined,
        role ? { role: { equals: role } } : undefined,
        departmentName
          ? {
              department: {
                name: { contains: departmentName },
              },
            }
          : undefined,
      ].filter(Boolean),
    };

    const users = await this.prisma.users.findMany({
      where,
      skip: +pageOptions.skip,
      take: +pageOptions.take,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department_id: true,
        department: {
          select: {
            id: true,
            name: true,
            head_user_id: true,
          },
        },
      },
      orderBy: {
        created_at: pageOptions.order,
      },
    });

    const result = users.map((user) => ({
      ...user,
      department: user.department || {},
      isDepartmentHead: user.department?.head_user_id === user.id,
    }));

    const totalCount = await this.prisma.users.count({ where });

    const meta = new PageMetaDto({
      pageOptionsDto: pageOptions,
      itemCount: totalCount,
    });

    return new PageDto(result, meta);
  }

  async findOne(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        phone_number: true,
        email: true,
        vk_link: true,
        tg_link: true,
        role: true,
        created_at: true,
        updated_at: true,
        department_id: true,
        department: {
          select: {
            id: true,
            name: true,
            head_user_id: true,
          },
        },
      },
    });
    return {
      ...user,
      department: user.department || {},
      isDepartmentHead: user.department?.head_user_id === user.id,
    };
  }

  findOneEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
    }

    return this.prisma.users.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        name: true,
        email: true,
        phone_number: true,
        vk_link: true,
        tg_link: true,
        role: true,
        department_id: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    });
  }

  async remove(id: string) {
    const department = await this.prisma.departments.findUnique({
      // TODO: заменить id на head_user_id
      where: { id: id },
    });

    if (department) {
      await this.prisma.departments.update({
        where: { id: department.id },
        data: { head_user_id: null },
      });
    }
    return this.prisma.users.delete({
      where: { id },
    });
  }
}
