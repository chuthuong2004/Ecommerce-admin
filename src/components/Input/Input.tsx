import classNames from 'classnames/bind';
import { EyeIcon, EyeActiveIcon } from '../Icons';
import styles from './Input.module.scss';
import React, { useState, useEffect, memo, useId } from 'react';
const cx = classNames.bind(styles);
type Props = {
  label?: string;
  type?: string;
  placeholder?: string;
  name?: string;
  error?: any;
  disabled?: boolean;
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};
const Input: React.FC<Props> = ({
  label,
  type = 'text',
  placeholder = `Nhập ${label ? label : 'thông tin vào trường này'}`,
  name = '',
  error = null,
  onChange,
  ...passProps
}) => {
  const idInput = useId();
  const [displayed, setDisplayed] = useState(false);
  const handleClickEye: React.MouseEventHandler<HTMLDivElement> = () => {
    setDisplayed(!displayed);
  };
  const props: any = {
    onChange,
    ...passProps,
  };
  useEffect(() => {
    setDisplayed(false);
  }, [!props.value]);
  return (
    <div>
      {type === 'checkbox' || type === 'radio' ? (
        <div className={cx('checkbox')}>
          <input type={type} name="" id={idInput} />
          <label htmlFor={idInput}>
            <span></span>
            {label}
          </label>
        </div>
      ) : (
        <div className={cx('input-container')}>
          {label && (
            <label className={cx('input-label')} htmlFor={idInput}>
              {label}
            </label>
          )}
          <div className={cx('input')}>
            {/* keyof typeof error => 'email' | 'password' | 'phone' */}
            {error && error[name as keyof typeof error] && (
              <span className={cx('message-error', 'error')}>
                {error[name as keyof typeof error]
                  ? error[name as keyof typeof error]
                  : 'Bạn không được để trống dòng này'}
              </span>
            )}
            <input
              type={displayed ? 'text' : type}
              name={name}
              id={idInput}
              placeholder={placeholder}
              {...props}
            />
            {type === 'password' && (
              <div
                onClick={props.value ? handleClickEye : undefined}
                className={cx('icon-eye', !props.value && 'disabled')}
              >
                {displayed ? <EyeActiveIcon /> : <EyeIcon />}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Input);
