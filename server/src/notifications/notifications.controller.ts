import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @Post('qq')
  // декоратор @Body() указывает на то, что переменная createNotificationDto содержит данные, которые передают через тело (body) запроса
  // используем описанный класс CreateNotificationDto для описания списка полей и их типов, которые должны нам прийти
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get('qw')
  findAll() {
    return this.notificationsService.findAll();
  }

  @Delete(':id')
  /*
  как правило объекты удаляются по их id
  этот id указывается прямо в адресе запроса
  в нашем случае путь данного запроса будет: http://localhost:5000/notifications/12345
  где 12345 - id. Сюда нужно подставлять id существующего уведомления из базы данных
  Декоратор @Param('...') позволяет показывать переменной, что она и есть этот параметр
  В нашем случае id - это строка
   */
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }
}
