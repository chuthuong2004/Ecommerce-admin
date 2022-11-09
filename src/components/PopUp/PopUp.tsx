import classNames from 'classnames/bind';
import styles from './PopUp.module.scss';
import { ReactNode, useEffect, useRef } from 'react';
const cx = classNames.bind(styles);

type Props = {
  isOpen: boolean;
  children: ReactNode;
  trigger: ReactNode;
  handleClose: () => void;
  position?: string;
};
const PopUp: React.FC<Props> = ({ trigger, isOpen, handleClose, children, position = 'right' }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        modalRef.current!.style.display = 'none';
      }, 450);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      modalRef.current!.style.display = 'block';
    }
  }, [isOpen]);
  return (
    <>
      {trigger}
      <div ref={modalRef} className={cx('modal', isOpen ? 'active' : 'no-active', position)}>
        <div onClick={handleClose} className={cx('overlay')}></div>
        {children}
      </div>
    </>
  );
};

export default PopUp;
