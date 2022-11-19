import React, { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Conversation.module.scss';
// import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { ImageIcon } from '../Icons';
import { FaImage, FaEllipsisH } from 'react-icons/fa';
import { IConversation } from '../../models/conversation.model';
import { useAppSelector } from '../../app/hooks';
import { selectAuth } from '../../features/authSlice';
import { IMessage } from '../../models/message.model';
import { IUser } from '../../models/user.model';
import axiosClient from '../../api/axiosClient';
import { useSockets } from '../../context/socket.context';
import config from '../../config';
import messageApi from '../../api/messageApi';
import moment from 'moment';
require('moment/locale/vi');
const cx = classNames.bind(styles);

// moment.locale('vi');
type Props = {
  conversation: IConversation;
  active: boolean;
  latestMessageChanged?: IMessage;
};
const Conversation: React.FC<Props> = ({ conversation, active, latestMessageChanged }) => {
  // console.log(conversation);
  const { socket } = useSockets();
  const { user } = useAppSelector(selectAuth);
  const [receiver, setReceiver] = useState(
    conversation.members.find((member: IUser) => member._id !== user?._id),
  );
  const [latestMessage, setLatestMessage] = useState<IMessage | undefined>(undefined);

  useEffect(() => {
    const getLatestMessage = async () => {
      try {
        const res: IMessage = await messageApi.getMessageLatestFromConversation(conversation._id);
        setLatestMessage(res);
      } catch (error) {
        console.log(error);
      }
    };
    getLatestMessage();
    socket.on(config.socketEvents.SERVER.GET_MESSAGE, ({ message }: { message: IMessage }) => {
      if (conversation._id === message.conversation) setLatestMessage(message);
    });
  }, []);
  useEffect(() => {
    latestMessageChanged &&
      conversation._id === latestMessageChanged._id &&
      setLatestMessage(latestMessageChanged);
  }, [latestMessageChanged]);
  useEffect(() => {
    const getLatestMessage = async () => {
      try {
        const res: IMessage = await axiosClient.get(`/messages/latest/${conversation._id}`);
        setLatestMessage(res);
      } catch (error) {
        console.log(error);
      }
    };
    active && getLatestMessage();
  }, [conversation, active]);
  return (
    <div
      className={cx(
        'container',
        !latestMessage?.seen && latestMessage?.sender._id !== user?._id && 'unread',
        active && 'active',
      )}
    >
      <div className={cx('conversation-img', 'online')}>
        {receiver?.avatar ? (
          <img src={process.env.REACT_APP_API_URL + receiver.avatar} className={cx('img')} alt="" />
        ) : (
          <span className={cx('span-img')}>
            {receiver?.firstName ? receiver.firstName[0] : receiver?.username[0]}
          </span>
        )}

        <span className={cx('dot-online', 'active')}></span>
      </div>

      <div className={cx('conversation-right')}>
        <div className={cx('conversation-info')}>
          <p className={cx('name')}>
            {receiver?.firstName
              ? receiver?.firstName + ' ' + receiver?.lastName
              : receiver?.username}
          </p>
          {latestMessage?.images && latestMessage?.images.length > 0 ? (
            <div className={cx('text-muted')}>
              <span>
                {latestMessage?.sender._id === user?._id
                  ? 'Bạn'
                  : receiver?.lastName || receiver?.username}{' '}
                đã gửi {latestMessage?.images.length} ảnh
              </span>
            </div>
          ) : (
            <div className={cx('text-muted')}>
              {latestMessage?.sender._id === user?._id && 'Bạn: '}
              {latestMessage?.text}
            </div>
          )}
        </div>
        <div className={cx('actions')}>
          <div className={cx('actions-icon')}>
            <FaEllipsisH />
          </div>
          <p>{moment(latestMessage?.createdAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(Conversation);
