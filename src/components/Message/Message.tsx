import TimeAgo from 'timeago-react';
// import { register } from 'timeago.js';
import styles from './Message.module.scss';
import classNames from 'classnames/bind';
// import it first.
import vi from 'timeago.js/lib/lang/vi';
import { IMessage } from '../../models/message.model';
import moment from 'moment';

require('moment/locale/vi');
const cx = classNames.bind(styles);
type Props = {
  message: IMessage;
  own: boolean;
};
// register it.
// register('vi', vi);
const Message: React.FC<Props> = ({ message, own }) => {
  return (
    <div className={cx('message', own && 'own')}>
      <div className={cx('message-top')}>
        {!own && (
          <div className={cx('message-img-container')}>
            {message.sender?.avatar ? (
              <img
                src={process.env.REACT_APP_API_URL + message.sender?.avatar}
                alt=""
                className={cx('message-img')}
              />
            ) : (
              <span className={cx('message-img-name')}>
                {message.sender?.firstName
                  ? message.sender.firstName[0]
                  : message.sender.username[0]}
              </span>
            )}
            <div className={cx('dot-online', 'logged')}></div>
          </div>
        )}
        <div className={cx('content')}>
          <div className={cx('container-image')}>
            {message?.images &&
              message.images.length > 0 &&
              message.images.map((image) => (
                <img
                  className={cx('message-img-text')}
                  src={process.env.REACT_APP_API_URL + image}
                  alt=""
                />
              ))}
          </div>
          {message.text && (
            <div className={cx('message-text')}>
              {message?.isLoading ? (
                <div className={cx('loading')}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                message.text
              )}
            </div>
          )}

          <div className={cx('time')}>
            {moment().diff(moment(message.createdAt), 'minutes')}

            {moment().diff(moment(message.createdAt), 'days') > 7 ? (
              <span>{moment(message.createdAt).format('llll')}</span>
            ) : (
              <span>{moment(message.createdAt).calendar()}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
