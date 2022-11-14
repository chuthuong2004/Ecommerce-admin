import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import SearchInput from '../../components/SearchInput';
import Conversation from '../../components/Conversation';
import Message from '../../components/Message';
import {
  FaFileImage,
  FaGift,
  FaInfoCircle,
  FaPaperclip,
  FaPaperPlane,
  FaPhone,
  FaPlusCircle,
  FaSmile,
  FaVideo,
} from 'react-icons/fa';
import Input from '../../components/Input';
import { useSockets } from '../../context/socket.context';
import axiosClient from '../../api/axiosClient';
import { IConversation } from '../../models/conversation.model';
import { IUser } from '../../models/user.model';
import { IMessage } from '../../models/message.model';
import { useAppSelector } from '../../app/hooks';
import { selectAuth } from '../../features/authSlice';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
const Chat = () => {
  const { user } = useAppSelector(selectAuth);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [loadingConversation, setLoadingConversation] = useState(false);
  const [loadingGetMessage, setLoadingGetMessage] = useState(false);
  const [currentChat, setCurrentChat] = useState<IConversation | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [receiver, setReceiver] = useState<IUser | undefined>(undefined);

  const { socket } = useSockets();
  const messageInputRef = useRef<HTMLInputElement>(null);
  console.log(socket.id);
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoadingConversation(true);
        const res: IConversation[] = await axiosClient.get('conversations');
        console.log(res);
        if (res) {
          setConversations(res);
          setLoadingConversation(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversations();
  }, []);
  useEffect(() => {
    const getMessages = async () => {
      setReceiver(currentChat?.members.find((member) => member._id !== user?._id));
      try {
        setLoadingGetMessage(true);
        const res: IMessage[] = await axiosClient.get(`messages/${currentChat?._id}`);
        console.log(res);

        if (res) {
          setMessages(res);
          setLoadingGetMessage(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    currentChat && getMessages();
  }, [currentChat]);
  const handleClickConversation = (conversation: IConversation) => {
    setCurrentChat(conversation);
  };
  console.log(currentChat);
  const handleSendMessage = async () => {
    console.log(messageInputRef.current?.value);
    if (messageInputRef.current?.value) {
      try {
        const message: IMessage = await axiosClient.post('/messages', {
          conversation: currentChat?._id,
          sender: user?._id,
          text: messageInputRef.current?.value,
        });
        if (message) {
          setMessages((prev) => [...prev, message]);

          messageInputRef.current?.focus();
        }
      } catch (error) {}
    } else {
      toast.info('Vui lòng nhập thông tin');
    }
  };
  return (
    <div className={cx('chat')}>
      <div className={cx('chat-sidebar')}>
        <div className={cx('chat-sidebar__header')}>
          <div className={cx('chat-sidebar__link')}>
            <div className={cx('chat-sidebar__link-item', 'active')}>All Chats</div>
            <div className={cx('chat-sidebar__link-item')}>Call</div>
            <div className={cx('chat-sidebar__link-item')}>Contacts</div>
          </div>
          <div className={cx('chat-sidebar__search')}>
            <SearchInput
              loading={false}
              value="Chu Thương"
              onChange={() => {}}
              handleClearInput={() => {}}
            />
          </div>
        </div>
        <div className={cx('chat-sidebar__content')}>
          <div className={cx('conversations')}>
            {loadingConversation ? (
              <div>Loading conversation...</div>
            ) : conversations ? (
              conversations.map((conversation) => (
                <div key={conversation._id} onClick={() => handleClickConversation(conversation)}>
                  <Conversation
                    conversation={conversation}
                    active={currentChat?._id === conversation._id}
                    latestMessageChange={
                      currentChat?._id === conversation._id
                        ? messages[messages.length - 1]
                        : undefined
                    }
                  />
                </div>
              ))
            ) : (
              <div>Không có tin nhắn nào</div>
            )}
          </div>
        </div>
      </div>
      <div className={cx('chat-box', 'empty-chat')}>
        {loadingGetMessage ? (
          <div>Loading...</div>
        ) : currentChat ? (
          <>
            <div className={cx('chat-box__title')}>
              <div className={cx('chat-box__title-info')}>
                <div className={cx('title-info-img')}>
                  <img
                    src={
                      receiver?.avatar
                        ? process.env.REACT_APP_API_URL + receiver.avatar
                        : 'https://vetra.laborasyon.com/assets/images/user/man_avatar1.jpg'
                    }
                    alt=""
                    className={cx('chat-box-info-img')}
                  />
                  <div className={cx('dot-online', 'logged')}></div>
                </div>
                <div className={cx('info')}>
                  <h3 className={cx('user-chat-box')}>
                    {receiver?.firstName
                      ? receiver?.firstName + ' ' + receiver?.lastName
                      : receiver?.username}
                  </h3>
                  <span className={cx('active-text')}>Active now</span>
                </div>
              </div>
              <div className={cx('chat-box__title-options')}>
                <FaPhone className={cx('option-icon')} />
                <FaVideo className={cx('option-icon')} />
                <FaInfoCircle className={cx('option-icon')} />
              </div>
            </div>
            <div className={cx('chat-box__body')}>
              {messages.map((message) => (
                <div key={message._id}>
                  <Message message={message} own={message?.sender?._id === user?._id} />
                </div>
              ))}
            </div>
            <div className={cx('chat-box__footer')}>
              <div className={cx('icon')}>
                <FaPlusCircle />
              </div>
              <div className={cx('icon')}>
                <FaFileImage />
              </div>
              <div className={cx('icon')}>
                <FaPaperclip />
              </div>
              <div className={cx('icon')}>
                <FaGift />
              </div>
              <div className={cx('chat-input')}>
                <input
                  ref={messageInputRef}
                  className={cx('input')}
                  name="message"
                  placeholder="Aa"
                  // onKeyUp={handleKeyUp}
                />
                <div className={cx('icon', 'emoji')}>
                  <FaSmile />
                </div>
              </div>

              <button onClick={handleSendMessage} className={cx('chat-submit')}>
                <FaPaperPlane />
              </button>
            </div>
          </>
        ) : (
          <div className={cx('empty-conversation')}>
            <div className={cx('empty-conversation__wrapper')}>
              <img src="https://vetra.laborasyon.com/assets/svg/not-selected-chat.svg" alt="" />
              <p>Chọn cuộc trò chuyện để xem tin nhắn </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
