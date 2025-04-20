import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { IRequestWithUser } from '../interfaces/Request.interface';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Roles } from '../decorators/roles.decorator';
import { users_role } from '@prisma/client';

@UseGuards(AuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Roles(users_role.member)
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: IRequestWithUser,
  ) {
    return this.tasksService.create(createTaskDto, req);
  }

  @Get()
  async findAll(
    @Query() filters: FilterTasksDto,
    @Req() req: IRequestWithUser,
  ) {
    return this.tasksService.getAll(filters, req);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Roles(users_role.member)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Roles(users_role.member)
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto.status);
  }
}
