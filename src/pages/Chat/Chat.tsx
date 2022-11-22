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
import { MdClose } from 'react-icons/md';
import { useSockets } from '../../context/socket.context';
import { IConversation } from '../../models/conversation.model';
import { FileResponse, IUser } from '../../models/user.model';
import { IMessage } from '../../models/message.model';
import { useAppSelector } from '../../app/hooks';
import { selectAuth } from '../../features/authSlice';
import { toast } from 'react-toastify';
import messageApi from './../../api/messageApi';
import conversationApi from '../../api/conversationApi';
import config from '../../config';
import axiosClient from '../../api/axiosClient';
const cx = classNames.bind(styles);
const Chat = () => {
  const { user } = useAppSelector(selectAuth);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [loadingConversation, setLoadingConversation] = useState(false);
  const [loadingGetMessage, setLoadingGetMessage] = useState(false);
  const [currentChat, setCurrentChat] = useState<IConversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [receiver, setReceiver] = useState<IUser | undefined>(undefined);
  const [fileImages, setFileImages] = useState<File[]>([]);
  const [currentPageYOffset, setCurrentPageYOffset] = useState({ page: 2, limit: 20, height: 0 });
  const { socket } = useSockets();
  const messageInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  console.log(socket.id);
  useEffect(() => {
    socket.on(config.socketEvents.SERVER.GET_MESSAGE, ({ message }: { message: IMessage }) => {
      setMessages((prev) => {
        const lastPrevMessage = prev[prev.length - 1];
        if (
          lastPrevMessage &&
          // user?._id !== message.sender._id &&
          lastPrevMessage.conversation === message.conversation &&
          lastPrevMessage._id !== message._id
        ) {
          const prevMessages = prev.filter((message) => message._id !== '923457923845729454279525');
          return [...prevMessages, message];
        }
        return prev;
      });
      // }
      const handleUpdateConversation = async () => {
        try {
          const res = await conversationApi.updateConversation(message.conversation);
          if (res) {
            setConversations((prev) => [
              res,
              ...prev.filter((conversation) => conversation._id !== res._id),
            ]);
          }
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      };
      handleUpdateConversation();
      console.log('getMessage', message);
    });
  }, []);
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoadingConversation(true);
        const res: IConversation[] = await conversationApi.getMyConversation();
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
  }, [user?._id]);
  useEffect(() => {
    const getMessages = async () => {
      setReceiver(currentChat?.members.find((member) => member._id !== user?._id));
      try {
        const params = {
          page: 1,
          limit: currentPageYOffset.limit,
        };
        setLoadingGetMessage(true);
        const res = await messageApi.getMessagesFromConversation(currentChat?._id || '', params);
        // console.log(res);
        if (res.data.length > 0) {
          setMessages(res.data);
          setLoadingGetMessage(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    setCurrentPageYOffset({ page: 2, limit: 20, height: 0 });
    currentChat && getMessages();
    socket.on(
      config.socketEvents.SERVER.LOADING,
      (data: {
        isKeyPressedDown: boolean;
        senderId: string;
        receiverId: string;
        conversationId: string;
      }) => {
        console.log('nhận được rồi', data);

        if (currentChat && currentChat?._id === data.conversationId) {
          setMessages((prev) => {
            if (prev.find((message) => message?.isLoading)) {
              // clearTimeout(timeout);
              return [...prev];
            }
            const messageIncludeSender = prev.find(
              (message) => message.sender?._id === data.senderId,
            );
            if (messageIncludeSender?.conversation === data.conversationId) {
              return [
                ...prev,
                {
                  _id: '923457923845729454279525',
                  sender: messageIncludeSender.sender,
                  text: 'loading',
                  conversation: data.conversationId,
                  seen: true,
                  isLoading: true,
                  createdAt: String(Date.now()),
                  updatedAt: String(Date.now()),
                  __v: 0,
                },
              ];
            }
            return [...prev];
          });
          // setTimeout(() => {
          //   setMessages((prev) => {
          //     const newMessage = prev.filter(
          //       (message) => message._id !== '923457923845729454279525',
          //     );
          //     return newMessage;
          //   });
          // }, 1500);
        }
      },
    );
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (currentChat && receiver?._id === messages[messages.length - 1]?.sender._id) {
      handleUpdateSeenMessage(currentChat?._id, receiver?._id);
    }
  }, [messages]);

  const handleUpdateSeenMessage = async (conversation: string, receiverId: string) => {
    try {
      const res = await messageApi.updateSeenMessage(conversation, receiverId);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickConversation = (conversation: IConversation) => {
    const receiverId = conversation.members.find((member) => member._id !== user?._id)?._id || '';
    handleUpdateSeenMessage(conversation._id, receiverId);
    setCurrentChat(conversation);
  };
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    let createMessage: {
      conversation?: string;
      sender?: string;
      text: string;
      images?: string[];
    } = {
      conversation: currentChat?._id,
      sender: user?._id,
      text: '',
    };
    if (fileImages.length > 0) {
      let formData = new FormData();
      fileImages.map((image) => {
        formData.append('imageMessage', image);
      });
      const res = await axiosClient.post('/upload/messages', formData);
      console.log(res.data.imageMessage);
      const images = res.data.imageMessage.map(
        (image: FileResponse) => '/public/messages/' + image.filename,
      );
      createMessage.images = images;
    }
    console.log(createMessage);

    if (newMessage || (createMessage?.images && createMessage?.images?.length > 0)) {
      try {
        if (newMessage) createMessage.text = newMessage;
        const message: IMessage = await messageApi.create(createMessage);
        if (message) {
          // setMessages((prev) => [...prev, message]);
          socket.emit(config.socketEvents.CLIENT.SEND_MESSAGE, {
            message,
            receiverId: receiver?._id,
          });
          setNewMessage('');
          setFileImages([]);
          messageInputRef.current?.focus();
        }
      } catch (error) {}
    } else {
      toast.info('Vui lòng nhập thông tin');
    }
  };
  const handleScroll = async (e: any) => {
    setCurrentPageYOffset({ ...currentPageYOffset, height: e.target.scrollTop });
    if (e.target.scrollTop === 0 && e.target.scrollTop < currentPageYOffset.height) {
      try {
        const params = {
          page: currentPageYOffset.page,
          limit: currentPageYOffset.limit,
          skip: messages.length,
        };
        console.log(params);
        const res = await messageApi.getMessagesFromConversation(currentChat?._id || '', params);
        console.log(res);

        if (res.data.length > 0) {
          const isExist = messages.find((message) => message._id === res.data[0]._id);
          if (res.resultPerPage === currentPageYOffset.page && !isExist) {
            setCurrentPageYOffset({ ...currentPageYOffset, page: currentPageYOffset.page + 1 });
            setMessages((prev) => [...res.data, ...prev]);
          }
          // setLoadingGetMessage(false);
        }

        // if (res.data.length > 0) {
        //   const isExist = messages.find((message) => message._id === res.data[0]._id);
        //   if (res.resultPerPage === currentPageYOffset.page && !isExist) {
        //     setCurrentPageYOffset({ ...currentPageYOffset, page: currentPageYOffset.page + 1 });
        //     setMessages((prev) => [...res.data, ...prev]);
        //   }
        // }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleKeyDown = () => {
    socket.emit(config.socketEvents.CLIENT.KEY_DOWN, {
      isKeyPressedDown: true,
      senderId: user?._id || '',
      conversationId: currentChat?._id || '',
      receiverId: receiver?._id || '',
    });
  };
  const handleRemoveImageFile = (file: File) => {
    setFileImages((prev) => {
      return prev.filter((fileImage) => fileImage !== file);
    });
  };
  const handlePasteClipboard = (e: any) => {
    if (e.clipboardData.files[0] as File) {
      setFileImages((prev) => {
        const isExist = prev.find(
          (fileImage) => fileImage.size === (e.clipboardData.files[0] as File).size,
        );
        if (isExist) {
          return prev;
        }
        return [...prev, e.clipboardData.files[0] as File];
      });
    }
  };
  console.log('files: ', fileImages);

  console.log('====================================');

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
                    latestMessageChanged={
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
                  {receiver?.avatar ? (
                    <img
                      src={process.env.REACT_APP_API_URL + receiver.avatar}
                      className={cx('img')}
                      alt=""
                    />
                  ) : (
                    <span className={cx('span-img')}>
                      {receiver?.firstName ? receiver.firstName[0] : receiver?.username[0]}
                    </span>
                  )}
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
            <div className={cx('chat-box__body')} onScroll={handleScroll}>
              {messages.map((message) => (
                <div ref={scrollRef} key={message._id}>
                  <Message message={message} own={message?.sender?._id === user?._id} />
                </div>
              ))}
            </div>
            <form className={cx('chat-box__footer')}>
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
                  value={newMessage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewMessage(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  onPaste={handlePasteClipboard}
                />

                {fileImages.length > 0 && (
                  <div className={cx('prev-image-container')}>
                    {fileImages.map((fileImage, i) => (
                      <div className={cx('chat-image-input')} key={i}>
                        <img src={URL.createObjectURL(fileImage)} alt="" />
                        <span
                          onClick={() => handleRemoveImageFile(fileImage)}
                          className={cx('close-icon')}
                        >
                          <MdClose />
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <div className={cx('icon', 'emoji')}>
                  <FaSmile />
                </div>
              </div>

              <button onClick={handleSendMessage} className={cx('chat-submit')}>
                <FaPaperPlane />
              </button>
            </form>
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
