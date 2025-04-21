import { Injectable } from '@nestjs/common';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ThemesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createThemeDto: CreateThemeDto) {
    return this.prisma.themes.create({
      data: {
        name: createThemeDto.name,
      },
    });
  }

  async findAll() {
    return this.prisma.themes.findMany({
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findOne(id: string) {
    const theme = await this.prisma.themes.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!theme) {
      throw new Error('Тема не найдена');
    }

    return theme;
  }

  async update(id: string, updateThemeDto: UpdateThemeDto) {
    const existingTheme = await this.prisma.themes.findUnique({
      where: { id },
    });

    if (!existingTheme) {
      throw new Error('Тема не найдена');
    }

    return this.prisma.themes.update({
      where: { id },
      data: {
        name: updateThemeDto.name,
      },
    });
  }

  async remove(id: string) {
    const existingTheme = await this.prisma.themes.findUnique({
      where: { id },
    });

    if (!existingTheme) {
      throw new Error('Тема не найдена');
    }

    return this.prisma.themes.delete({
      where: { id },
    });
  }
}
