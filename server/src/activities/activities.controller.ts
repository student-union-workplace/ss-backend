import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) { }

  @Post()
  create(@Body() createActivityDto: CreateActivityDto, createNotificationDto: CreateNotificationDto) {
    return this.activitiesService.create(createActivityDto, createNotificationDto);
  }

  @Get()
  async findAll(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('year') year?: string
  ) {
    if (!year && !startDate && !endDate) {
      throw new BadRequestException('At least year or date range must be provided.');
    }
    {
      return this.activitiesService.findAll({
        startDate: startDate ? new Date(parseInt(startDate)) : undefined,
        endDate: endDate ? new Date(parseInt(endDate)) : undefined,
        year: year ? parseInt(year) : undefined,
      });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activitiesService.update(id, updateActivityDto);
  }

  @Patch(':id/com')
  compliter(@Param('id') id: string) {
    return this.activitiesService.compliter(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(id);
  }
}
