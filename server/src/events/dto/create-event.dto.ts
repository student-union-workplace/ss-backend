import { IEvents } from '../interface/events.interface';

export class CreateEventDto implements IEvents {
  name: string;
  description: string;
  date: Date;
  is_archived: boolean;
  managers?: string[];
  users?: string[];
  locations?: string[];
  past_event_id?: string;
  theme_id?: string;
  created_at: Date;
  updated_at: Date;
}
