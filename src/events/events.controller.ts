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
  Req,
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
import { IRequestWithUser } from '../interfaces/Request.interface';

@UseGuards(AuthGuard, RolesGuard)
@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Roles(users_role.member)
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  async findAll(
    @Req() req: IRequestWithUser,
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('isArchived') isArchived?: string,
    @Query('name') name?: string,
    @Query('theme_id') theme?: string,
    @Query('is_mine') is_mine?: string,
  ): Promise<PageDto<any>> {
    return this.eventsService.findAll(
      req,
      pageOptionsDto,
      isArchived,
      name,
      theme,
      is_mine,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Roles(users_role.member)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Roles(users_role.member)
  @Patch(':id/changeStatus')
  statusChange(@Param('id') id: string) {
    return this.eventsService.statusChange(id);
  }

  @Roles(users_role.member)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
