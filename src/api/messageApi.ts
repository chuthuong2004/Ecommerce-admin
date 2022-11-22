import { IBrand } from '../models/brand.model';
import { IMessage } from '../models/message.model';
import { IProduct } from '../models/product.model';
import axiosClient from './axiosClient';

const messageApi = {
  create: (body: {
    conversation?: string;
    sender?: string;
    text: string;
    image?: string;
  }): Promise<IMessage> => {
    const url = 'messages';
    return axiosClient.post(url, body);
  },
  getMessagesFromConversation: (
    conversationId: string,
    params: any,
  ): Promise<{ countDocument: number; resultPerPage: number; data: IMessage[] }> => {
    const url = `messages/${conversationId}`;
    return axiosClient.get(url, { params });
  },
  getMessageLatestFromConversation: (conversationId: string): Promise<IMessage> => {
    const url = `messages/latest/${conversationId}`;
    return axiosClient.get(url);
  },
  updateSeenMessage: (conversationId: string, receiverId: string) => {
    const url = `messages/seen/${conversationId}/${receiverId}`;
    return axiosClient.put(url);
  },
};
export default messageApi;
