import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { LocationsModule } from './locations/locations.module';
import { ActivitiesModule } from './activities/activities.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [NotificationsModule, LocationsModule, ActivitiesModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
