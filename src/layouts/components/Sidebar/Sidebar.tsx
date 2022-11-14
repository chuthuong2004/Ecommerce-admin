import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { LogoIcon, TruckIcon } from '../../../components/Icons';
import { NavLink, useNavigate } from 'react-router-dom';
import config from '../../../config';
import { useLogoutUserMutation } from '../../../services/authApi';
import { logout, selectAuth } from '../../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toast } from 'react-toastify';
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
  {
    to: '#',
    icon: <TruckIcon />,
    title: 'Đăng xuất',
  },
];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const [
    logoutUser,
    {
      data: logoutData,
      isLoading: isLoadingLogout,
      isSuccess: isLogoutSuccess,
      isError: isLogoutError,
      error: logoutError,
    },
  ] = useLogoutUserMutation();

  useEffect(() => {
    if (isLogoutSuccess) {
      dispatch(logout());
      navigate(config.routes.login);
      toast.success((logoutData as any).message);
    }
    if (isLogoutError) {
      console.log(logoutError);
      toast.error((logoutError as any).data.message);
    }
  }, [isLoadingLogout]);
  const handleLogout = async (link: any) => {
    if (link.to === '#') {
      await logoutUser({});
    }
  };
  return (
    <div className={cx('container')}>
      <div className={cx('logo')}>Admin Koga</div>
      <div className={cx('menu')}>
        <div className={cx('menu__account')}>
          <img
            src={
              user?.avatar
                ? process.env.REACT_APP_API_URL + user.avatar
                : 'https://vetra.laborasyon.com/assets/images/user/man_avatar3.jpg'
            }
            className={cx('menu__account__img')}
            alt=""
          />
          <div className={cx('menu__account__info')}>
            <h3>{user?.firstName ? user.firstName + ' ' + user?.lastName : user?.username}</h3>
            <span>Quản lý bán hàng</span>
          </div>
        </div>
        <div className={cx('menu__links')}>
          {links.map((link, i) => (
            <NavLink
              key={i}
              to={link.to}
              onClick={() => handleLogout(link)}
              className={(nav) =>
                cx('menu__links--item', { active: nav.isActive && link.to !== '#' })
              }
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
