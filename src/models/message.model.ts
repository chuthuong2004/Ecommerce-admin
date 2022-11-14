import { IUser } from './user.model';

export interface IMessage {
  _id: string;
  conversation: string;
  sender: IUser;
  text: string;
  image?: string;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
  seenAt?: string;
  __v: number;
}
