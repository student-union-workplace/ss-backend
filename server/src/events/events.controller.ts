import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PageOptionsDto } from 'src/pagination/dto/page-options.dto';
import { PageDto } from 'src/pagination/dto/page.dto';
import { Roles } from '../decorators/roles.decorator';
import { users_role } from '@prisma/client';
import { RolesGuard } from '../guards/roles.guard';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard, RolesGuard)
@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Roles(users_role.member)
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('isArchived') isArchived?: string,
    @Query('name') name?: string,
    @Query('theme') theme?: string,
  ): Promise<PageDto<any>> {
    return this.eventsService.findAll(pageOptionsDto, isArchived, name, theme);
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
