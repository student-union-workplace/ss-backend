import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';
import { LocationsModule } from './locations/locations.module';
import { ActivitiesModule } from './activities/activities.module';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GoogleSheetsModule } from './google-sheets/google-sheets.module';
import { GoogleDocsModule } from './google-docs/google-docs.module';
import { TasksModule } from './tasks/tasks.module';
import { ThemesModule } from './themes/themes.module';
import { DepartmentsModule } from './departments/departments.module';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NotificationsModule,
    LocationsModule,
    ActivitiesModule,
    EventsModule,
    UsersModule,
    AuthModule,
    GoogleSheetsModule,
    GoogleDocsModule,
    TasksModule,
    ThemesModule,
    DepartmentsModule,
    FilesModule,
  ],
})
export class AppModule {}
