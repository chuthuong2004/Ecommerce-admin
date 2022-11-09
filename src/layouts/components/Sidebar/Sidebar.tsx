import React from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { LogoIcon, TruckIcon } from '../../../components/Icons';
import { NavLink } from 'react-router-dom';
import config from '../../../config';
const cx = classNames.bind(styles);
const links = [
  {
    to: config.routes.dashboard,
    icon: <TruckIcon />,
    title: 'Dashboard',
  },
  {
    to: config.routes.order,
    icon: <TruckIcon />,
    title: 'Đơn hàng',
  },
  {
    to: config.routes.brand,
    icon: <TruckIcon />,
    title: 'Thương hiệu',
  },
  {
    to: config.routes.catalog,
    icon: <TruckIcon />,
    title: 'Thể loại',
  },
  {
    to: config.routes.category,
    icon: <TruckIcon />,
    title: 'Danh mục',
  },
  {
    to: config.routes.product,
    icon: <TruckIcon />,
    title: 'Sản phẩm',
  },

  {
    to: config.routes.customer,
    icon: <TruckIcon />,
    title: 'Khách hàng',
  },
  {
    to: config.routes.chat,
    icon: <TruckIcon />,
    title: 'Tin nhắn',
  },
  {
    to: config.routes.review,
    icon: <TruckIcon />,
    title: 'Đánh giá',
  },
];
const Sidebar = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('logo')}>Admin Koga</div>
      <div className={cx('menu')}>
        <div className={cx('menu__account')}>
          <img
            src="https://vetra.laborasyon.com/assets/images/user/man_avatar3.jpg"
            className={cx('menu__account__img')}
            alt=""
          />
          <div className={cx('menu__account__info')}>
            <h3>Đào Văn Thương</h3>
            <span>Quản lý bán hàng</span>
          </div>
        </div>
        <div className={cx('menu__links')}>
          {links.map((link, i) => (
            <NavLink
              key={i}
              to={link.to}
              className={(nav) => cx('menu__links--item', { active: nav.isActive })}
            >
              {link.icon}
              <span>{link.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
