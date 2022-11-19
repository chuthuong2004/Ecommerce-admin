import { IUser } from './user.model';

export interface IMessage {
  _id: string;
  conversation: string;
  sender: IUser;
  text: string;
  images?: string[];
  seen: boolean;
  createdAt: string;
  updatedAt: string;
  seenAt?: string;
  isLoading?: boolean;
  __v: number;
}
