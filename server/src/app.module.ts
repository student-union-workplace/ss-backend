import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { LocationsModule } from './locations/locations.module';
import { ActivitiesModule } from './activities/activities.module';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GoogleSheetsModule } from './google-sheets/google-sheets.module';
import { GoogleDocsModule } from './google-docs/google-docs.module';

@Module({
  imports: [
    NotificationsModule,
    LocationsModule,
    ActivitiesModule,
    EventsModule,
    UsersModule,
    AuthModule,
    GoogleSheetsModule,
    GoogleDocsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
