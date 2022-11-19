import classNames from 'classnames/bind';
import React, { useEffect, ReactNode, useState } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { BsThreeDots, BsCreditCard2Front } from 'react-icons/bs';
import HeadlessTippy from '@tippyjs/react/headless';
import Slider from 'react-slick';
import { BsTruck, BsReceipt } from 'react-icons/bs';
import { HiOutlineChartBar } from 'react-icons/hi';
import { FaRegPaperPlane } from 'react-icons/fa';

import styles from './Dashboard.module.scss';
import Button from '../../components/Button';
import UserReview from '../../components/UserReview';
import Table from '../../components/Table';

const cx = classNames.bind(styles);
const settings = {
  infinite: true,
  speed: 100,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const renderTippy = (attrs: any) => (
  <div className={cx('menu-more')} tabIndex="-1" {...attrs}>
    <div className={cx('action-more')}>
      <button className={cx('btn-action-more')}>View Detail</button>
      <button className={cx('btn-action-more')}>Download</button>
    </div>
  </div>
);
const test = [{ text: 'test' }, { text: 'test' }, { text: 'test' }];
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
            <div className={cx('card-title')}>
              <span className={cx('title')}>Recent Reviews</span>
              <span className={cx('view-all')}>View all</span>
            </div>
            <div className={cx('reviewers')}>
              <Slider {...settings}>
                <UserReview />
                <UserReview />
                <UserReview />
                <UserReview />
                <UserReview />
              </Slider>
            </div>
          </div>
        </div>
        <div className={cx('overview-actions')}>
          <div className={cx('cards-overview')}>
            <span className={cx('title-overview')}>Activity Overview</span>
            <div className={cx('cards')}>
              <div className={cx('card', 'card-delivered')}>
                <p className={cx('icon')}>
                  <BsTruck />
                </p>
                <span className={cx('title')}>Delivered</span>
                <p className={cx('info-detail')}>15 New Packages</p>
                <div className={cx('card-process')}>
                  <div className={cx('process-bar')}></div>
                </div>
              </div>
              <div className={cx('card', 'card-order')}>
                <p className={cx('icon')}>
                  <BsReceipt />
                </p>
                <span className={cx('title')}>Ordered</span>
                <p className={cx('info-detail')}>75 New Items</p>
                <div className={cx('card-process')}>
                  <div className={cx('process-bar')}></div>
                </div>
              </div>
              <div className={cx('card', 'card-reported')}>
                <p className={cx('icon')}>
                  <HiOutlineChartBar />
                </p>
                <span className={cx('title')}>Reported</span>
                <p className={cx('info-detail')}>50 Support New Case</p>
                <div className={cx('card-process')}>
                  <div className={cx('process-bar')}></div>
                </div>
              </div>
              <div className={cx('card', 'card-arrived')}>
                <p className={cx('icon')}>
                  <FaRegPaperPlane />
                </p>
                <span className={cx('title')}>Arrived</span>
                <p className={cx('info-detail')}>34 Upgrade Boxed</p>
                <div className={cx('card-process')}>
                  <div className={cx('process-bar')}></div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('recent-product')}>
            <span className={cx('title-overview')}>
              <span>Recent Product</span>
              <p>
                <BsThreeDots className={cx('icon-more')} />
              </p>
            </span>
            <div className={cx('table-product')}>
              <p className={cx('title-table')}>Products added today. Click here for more details</p>
              <div className={cx('table')}>
                <Table columns={['Photo', 'Name', 'Stock', 'Price']}>
                  {test.map((test) => (
                    <div className={cx('test')}>
                      <img
                        src="http://localhost:1337/public/avatars/202211131030159421842f73874a0695ed2a78c5b74dea.png"
                        alt=""
                      />
                      <div>Test</div>
                      <div>Test</div>
                      <div>Test</div>
                    </div>
                  ))}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
