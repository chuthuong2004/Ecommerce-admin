import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import React, { useEffect, ReactNode } from 'react';
const cx = classNames.bind(styles);

const Dashboard = () => {
  return <div className={cx('container')}>Dashboard</div>;
};

export default Dashboard;
