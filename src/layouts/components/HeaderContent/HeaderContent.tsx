import classNames from 'classnames/bind';
import styles from './HeaderContent.module.scss';
import { CameraIcon, MessageIcon, PlusStrongIcon } from '../../../components/Icons';
import { Button, SearchInput } from '../../../components';
const cx = classNames.bind(styles);
const HeaderContent = () => {
  return (
    <div className={cx('container')}>
      <h3 className={cx('title')}>Tin nhắn</h3>
      <div className={cx('search')}>
        <SearchInput loading={false} value="" onChange={() => {}} handleClearInput={() => {}} />
      </div>
      <div className={cx('actions')}>
        <div className={cx('notify')}>
          <CameraIcon />
        </div>
        <div className={cx('notify')}>
          <MessageIcon color="#2e2e2e" width="34" height="34" />
        </div>
        <Button primary small rounded leftIcon={<PlusStrongIcon color="#ffffff" />}>
          Thêm sản phẩm
        </Button>
      </div>
    </div>
  );
};

export default HeaderContent;
