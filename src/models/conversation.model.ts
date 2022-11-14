import { IUser } from './user.model';

export interface IConversation {
  _id: string;
  members: IUser[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
