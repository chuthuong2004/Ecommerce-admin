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
const cx = classNames.bind(styles);
type Props = {
  conversation: IConversation;
  latestMessageChange?: IMessage;
  active: boolean;
};
const Conversation: React.FC<Props> = ({ conversation, latestMessageChange, active }) => {
  console.log(conversation);

  const { user } = useAppSelector(selectAuth);
  const [receiver, setReceiver] = useState(
    conversation.members.find((member: IUser) => member._id !== user?._id),
  );
  const [latestMessage, setLatestMessage] = useState<IMessage | undefined>(undefined);
  useEffect(() => {
    const getLatestMessage = async () => {
      try {
        const res: IMessage = await axiosClient.get(`/messages/latest/${conversation._id}`);
        setLatestMessage(res);
      } catch (error) {
        console.log(error);
      }
    };
    getLatestMessage();
  }, [conversation, latestMessageChange]);
  return (
    <div
      className={cx(
        'container',
        !latestMessage?.seen && latestMessage?.sender._id !== user?._id && 'unread',
        active && 'active',
      )}
    >
      <div className={cx('conversation-img', 'online')}>
        <img
          src={
            receiver?.avatar
              ? process.env.REACT_APP_API_URL + receiver.avatar
              : 'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/305843184_789881652216377_5919645094904983728_n.jpg?stp=dst-jpg_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=YoJqzRNx2qQAX8R5sRn&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfDrEiozueQb9zsXwDcDocawUM1ubLZ7ka33peSs1vqAew&oe=63750220'
          }
          className={cx('img')}
          alt=""
        />
        <span className={cx('dot-online', 'active')}></span>
      </div>

      <div className={cx('conversation-right')}>
        <div className={cx('conversation-info')}>
          <p className={cx('name')}>
            {receiver?.firstName
              ? receiver?.firstName + ' ' + receiver?.lastName
              : receiver?.username}
          </p>
          {latestMessage?.image ? (
            <div className={cx('text-muted')}>
              <FaImage />
              Photo
            </div>
          ) : (
            <p className={cx('text-muted')}>
              {latestMessage?.sender._id === user?._id && 'Bạn: '}
              {latestMessage?.text}
            </p>
          )}
        </div>
        <div className={cx('actions')}>
          <div className={cx('actions-icon')}>
            <FaEllipsisH />
          </div>
          <p>08:27 PM</p>
        </div>
      </div>
    </div>
  );
};

export default memo(Conversation);
