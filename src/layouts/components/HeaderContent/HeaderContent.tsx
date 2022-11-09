import classNames from 'classnames/bind';
import styles from './HeaderContent.module.scss';
// import ScrollToTop from '../components/ScrollToTop';
import { useLocation, useParams } from 'react-router-dom';
import React, { useEffect, ReactNode } from 'react';
import SearchInput from '../../../components/SearchInput';
import Button from '../../../components/Button';
import {
  BellIcon,
  CameraIcon,
  MessageIcon,
  PlusIcon,
  PlusStrongIcon,
} from '../../../components/Icons';
const cx = classNames.bind(styles);
const HeaderContent = () => {
  return (
    <div className={cx('container')}>
      <h3 className={cx('title')}>Tổng quan</h3>
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
