import classNames from 'classnames/bind';
import { memo } from 'react';
import styles from './ToggleSwitch.module.scss';
import { v4 as uuidv4 } from 'uuid';
const cx = classNames.bind(styles);

type Props = {
  checked: boolean;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const ToggleSwitch: React.FC<Props> = ({ name, checked, handleChange }) => {
  return (
    <div className={cx('toggle-switch')}>
      <input
        type="checkbox"
        className={cx('toggle-switch-checkbox')}
        name={name}
        id={uuidv4()}
        checked={checked}
        onChange={handleChange}
      />
      <label className={cx('toggle-switch-label')} htmlFor={uuidv4()}>
        <span className={cx('toggle-switch-inner')} />
        <span className={cx('toggle-switch-switch')} />
      </label>
    </div>
  );
};

export default memo(ToggleSwitch);
