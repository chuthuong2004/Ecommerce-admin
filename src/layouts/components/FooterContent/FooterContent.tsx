import classNames from 'classnames/bind';
import styles from './FooterContent.module.scss';
const cx = classNames.bind(styles);
const FooterContent = () => {
  return (
    <div className={cx('container')}>
      <h3 className={cx('title')}>© 2021 Vetra - Laborasyon</h3>
    </div>
  );
};

export default FooterContent;
