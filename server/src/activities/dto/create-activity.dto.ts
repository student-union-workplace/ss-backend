import { IActivities } from '../interface/activities.interface';

export class CreateActivityDto implements IActivities {
  name: string;
  description: string;
  date: Date;
  location_id: string;
  created_by_user_id: string;
  is_completed?: boolean;
  created_at: Date;
  updated_at: Date;
  users: string[];
}
