import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import React, { useEffect, ReactNode } from 'react';
const cx = classNames.bind(styles);

const Dashboard = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <div className={cx('container-chart')}>
          <div className={cx('sales-chart')}>
            <span className={cx('title')}>Sales Chart</span>
            <div className={cx('chart')}> Chart</div>
          </div>
          <div className={cx('channel')}>
            <span className={cx('title')}>Channels</span>
            <div className={cx('channel-chart')}>Channels</div>
          </div>
        </div>
        <div className={cx('graph')}>
          <div className={cx('graph-orders')}>
            <span className={cx('title')}>Orders</span>
          </div>
          <div className={cx('graph-sales')}>
            <span className={cx('title')}>Sales</span>
          </div>
          <div className={cx('graph-reviews')}>
            <span className={cx('title')}>Reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
