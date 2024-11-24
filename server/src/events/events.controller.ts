import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  async findAll(
    @Query('is_archived') isArchived?: string,  // Получаем параметр как строку
    @Query('name') name?: string,
    @Query('theme') theme?: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    // Преобразуем строку в boolean: если 'true', то true, иначе false или undefined
    const isArchivedBoolean = isArchived === 'true'; // Преобразование из строки в boolean

    return this.eventsService.findAll({
      is_archived: isArchivedBoolean, // Передаем значение как boolean
      name,
      theme,
      page,
      pageSize,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Patch(':id/changeStatus')
  statusChange(@Param('id') id: string) {
    return this.eventsService.statusChange(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
