import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ThemesController],
  providers: [ThemesService, PrismaService],
})
export class ThemesModule {}
