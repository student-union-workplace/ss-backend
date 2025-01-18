import { Request } from 'express';
import { IUsers } from '../users/interfaces/users.interface';

export interface IRequestWithUser extends Request {
  user: IUsers;
}
