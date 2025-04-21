import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { IRequestWithUser } from '../interfaces/Request.interface';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { users_role } from '@prisma/client';

@UseGuards(AuthGuard, RolesGuard)
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Roles(users_role.member)
  @Post()
  create(
    @Body() createActivityDto: CreateActivityDto,
    @Req() req: IRequestWithUser,
  ) {
    return this.activitiesService.create(createActivityDto, req);
  }

  @Roles(users_role.old)
  @Get()
  async findAll(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('year') year?: string,
  ) {
    if (!year && !startDate && !endDate) {
      throw new BadRequestException(
        'At least year or date range must be provided.',
      );
    }
    {
      return this.activitiesService.findAll({
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        year: year ? parseInt(year) : undefined,
      });
    }
  }

  @Roles(users_role.old)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(id);
  }

  @Roles(users_role.member)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activitiesService.update(id, updateActivityDto);
  }

  @Roles(users_role.member)
  @Patch(':id/changeStatus')
  statusChanger(@Param('id') id: string) {
    return this.activitiesService.statusChanger(id);
  }

  @Roles(users_role.member)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(id);
  }
}
