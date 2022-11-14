import TimeAgo from 'timeago-react';
// import { register } from 'timeago.js';
import styles from './Message.module.scss';
import classNames from 'classnames/bind';
// import it first.
import vi from 'timeago.js/lib/lang/vi';
import { IMessage } from '../../models/message.model';
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
        {message?.image ? (
          <img
            className={cx('message-img-text')}
            src={process.env.REACT_APP_API_URL + message.image}
            alt=""
          />
        ) : (
          <div className={cx('message-text')}>
            {/* {loading ? (
              <div className={cx('loading')}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              message
            )} */}
            {message.text}
          </div>
        )}
      </div>
      {/* {!loading && ( */}
      <div className={cx('message-bottom')}>
        <TimeAgo datetime={'2022-11-11 08:08:08'} locale="vi" />
      </div>
      {/* )} */}
    </div>
  );
};

export default Message;
