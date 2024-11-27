import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { GetUsersFilterDto } from 'src/pagination/dto/user-filter.dro';
import { PageDto } from 'src/pagination/dto/page.dto';
import { PageMetaDto } from 'src/pagination/dto/page-meta.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    // Хэширование пароля
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

    // Создание пользователя в базе данных
    const user = await this.prisma.users.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        role: createUserDto.role,
        password: hashedPassword,
        department_id: createUserDto.department_id,
        created_at: createUserDto.created_at,
        updated_at: createUserDto.updated_at
      },
    });

    // Возвращаем созданного пользователя (скрывая пароль)
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prisma.users.findUnique({
      where: { email: loginUserDto.email },
    });

    const isPasswordValid = bcrypt.compareSync(loginUserDto.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Неверный пароль');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll(filterDto: GetUsersFilterDto): Promise<PageDto<any>> {
    const { name, departmentName, role, skip, take } = filterDto;

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
      skip,
      take,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department_id: true

      },
      orderBy: { name: 'asc' },
    });


    // Запрашиваем все департаменты с полем head_user_id
    const departments = await this.prisma.departments.findMany({
      select: {
        id: true,
        head_user_id: true,
      },
    });

    // Создаем карту департаментов для быстрого доступа
    const departmentHeadMap = new Map(
      departments.map((dept) => [dept.id, dept.head_user_id]),
    );

    // Добавляем поле isDepartmentHead для каждого пользователя
    const result = users.map((user) => ({
      ...user,
      isDepartmentHead: departmentHeadMap.get(user.department_id) === user.id,
    }));

    const totalCount = await this.prisma.users.count({ where });

    const meta = new PageMetaDto({
      pageOptionsDto: filterDto,
      itemCount: totalCount,
    });

    return new PageDto(result, meta);
  }

  findOne(id: string) {
    return this.prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        phone_number: true,
        email: true,
        vk_link: true,
        tg_link: true,
        role: true,
        department_id: true,
        created_at: true,
        updated_at: true
      },
    })
  }

  findOneEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email: email },
      select: {
        id: true,
        name: true,
        phone_number: true,
        email: true,
        vk_link: true,
        tg_link: true,
        role: true,
        department_id: true,
        created_at: true,
        updated_at: true
      },
    })
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
        created_at: true,
        updated_at: true
      }
    });
  }

  async remove(id: string) {

    const department = await this.prisma.departments.findUnique({
      where: { head_user_id: id },
    });

    // Если департамент найден, обновляем head_user_id в этом департаменте
    if (department) {
      await this.prisma.departments.update({
        where: { id: department.id },
        data: { head_user_id: null }, // Устанавливаем head_user_id в null
      });
    }
    return this.prisma.users.delete({
      where: { id }
    });
  }
}
