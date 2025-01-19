import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  name?: string;
  description?: string;
  date?: Date;
  is_archived?: boolean;
  managers?: string[];
  users?: string[];
  locations?: string[];
  prev_same_event_id?: string;
  theme_id?: string;
  created_at: Date;
  updated_at: Date;
}
