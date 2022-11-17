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
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/292669746_2201903946644853_4420143477729832900_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=d3Cb0y6tDW0AX8rbj4M&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfA2JrE6bNPA-IEm1-VdQ7HXzE_Xymg6mvXWBdOBMN7fjw&oe=63780572"
              alt=""
            />
          </div>
          <div className={cx('user-name-rating')}>
            <span className={cx('username')}>Nguyễn Quốc Trọn</span> <p> Sao nè</p>
          </div>
        </div>
        <div className={cx('content-review')}>Sản phẩm quá đẹp đi mất</div>
      </div>
    </div>
  );
};

export default UserReview;
