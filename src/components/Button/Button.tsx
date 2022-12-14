import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
const cx = classNames.bind(styles);
export type Props = {
  to?: string;
  href?: string;
  primary?: boolean;
  outline?: boolean;
  disabled?: boolean;
  text?: boolean;
  large?: boolean;
  small?: boolean;
  rounded?: boolean;
  border?: boolean;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  state?: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
const Button: React.FC<Props> = ({
  to,
  href,
  primary = false,
  outline = false,
  disabled = false,
  text = false,
  large = false,
  small = false,
  rounded = false,
  children,
  className,
  leftIcon,
  rightIcon,
  border,
  icon,
  onClick,
  ...passProps
}) => {
  let Comp: any = 'button';
  const props: any = {
    onClick,
    ...passProps,
  };
  // if (disabled) {
  //     delete props.onClick;
  // }
  // Remove event
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof key === 'function') {
        delete props[key];
      }
    });
  }
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }
  const classes = cx('wrapper', {
    primary,
    outline,
    small,
    large,
    text,
    disabled,
    rounded,
    border,
    [className ? className : '']: className,
  });
  return (
    <Comp className={classes} {...props}>
      {icon && <span className={cx('icon-abs')}>{icon}</span>}
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  );
};
// Button.propTypes = {
//     to: PropTypes.string,
//     href: PropTypes.string,
//     primary: PropTypes.bool,
//     outline: PropTypes.bool,
//     disabled: PropTypes.bool,
//     text: PropTypes.bool,
//     large: PropTypes.bool,
//     small: PropTypes.bool,
//     rounded: PropTypes.bool,
//     children: PropTypes.node.isRequired,
//     className: PropTypes.string,
//     leftIcon: PropTypes.node,
//     rightIcon: PropTypes.node,
//     onClick: PropTypes.func,
// };
export default Button;
