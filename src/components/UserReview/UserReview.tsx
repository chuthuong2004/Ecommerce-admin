import React from 'react';
import classNames from 'classnames/bind';
import styles from './UserReview.module.scss';
const cx = classNames.bind(styles);
const UserReview = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <div className={cx('info-user')}>
          <div className={cx('avatar')}>
            <img
              src="http://localhost:1337/public/avatars/202211131030159337294c598c4295b686da6393c07839.jpg"
              alt=""
            />
          </div>
          <div className={cx('user-name-rating')}>
            <span className={cx('username')}>Đào Văn Thương</span> <p></p>
          </div>
        </div>
        <div className={cx('content-review')}>Sản phẩm quá đẹp đi mất</div>
      </div>
    </div>
  );
};

export default UserReview;
