import classNames from 'classnames/bind';
import React, { useEffect, ReactNode, useState } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { BsThreeDots, BsCreditCard2Front } from 'react-icons/bs';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Dashboard.module.scss';
import Button from '../../components/Button';

const cx = classNames.bind(styles);
const renderTippy = (attrs: any) => (
  <div className={cx('menu-more')} tabIndex="-1" {...attrs}>
    <div className={cx('action-more')}>
      <button className={cx('btn-action-more')}>View Detail</button>
      <button className={cx('btn-action-more')}>Download</button>
    </div>
  </div>
);
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
            <span className={cx('icon')}>
              <FaShoppingBasket className={cx('icon-graph')} />
              <HeadlessTippy
                trigger="click"
                interactive={true}
                placement="bottom-end"
                render={renderTippy}
              >
                <p>
                  <BsThreeDots className={cx('icon-more')} />
                </p>
              </HeadlessTippy>
            </span>
            <span className={cx('title')}>Orders</span>
            <span className={cx('amount')}>310</span>
            <p className={cx('rate-of-change')}>
              Over last month 1.4% <FiArrowUp />
            </p>
          </div>
          <div className={cx('graph-sales')}>
            <span className={cx('icon')}>
              <BsCreditCard2Front className={cx('icon-graph')} />
              <HeadlessTippy
                trigger="click"
                interactive={true}
                placement="bottom-end"
                render={renderTippy}
              >
                <p>
                  <BsThreeDots className={cx('icon-more')} />
                </p>
              </HeadlessTippy>
            </span>
            <span className={cx('title')}>Sales</span>
            <span className={cx('amount')}>$3.759,00</span>
            <p className={cx('rate-of-change')}>
              Over last month 1.4% <FiArrowDown />
            </p>
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
