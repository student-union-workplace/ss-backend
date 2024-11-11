import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [NotificationsModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
