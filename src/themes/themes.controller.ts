import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete, UseGuards,
} from '@nestjs/common';
import { ThemesService } from './themes.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  // Создание новой темы
  @Post()
  async create(@Body() createThemeDto: CreateThemeDto) {
    return this.themesService.create(createThemeDto);
  }

  // Получение всех тем
  @Get()
  async findAll() {
    return this.themesService.findAll();
  }

  // Получение одной темы по ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.themesService.findOne(id);
  }

  // Обновление темы
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateThemeDto: UpdateThemeDto,
  ) {
    return this.themesService.update(id, updateThemeDto);
  }

  // Удаление темы
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.themesService.remove(id);
  }
}
