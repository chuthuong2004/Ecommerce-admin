import React, { FC, ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './Table.module.scss';
import { BsThreeDots } from 'react-icons/bs';

const cx = classNames.bind(styles);

type Props = {
  columns: string[];
  children: ReactNode[];
};
const Table: FC<Props> = ({ columns, children }) => {
  const childrenCustom = children.map((child: any) => {
    const childrenUpdate = [
      <div className={cx('table-cell')}>
        {' '}
        <input type="checkbox" name="" id="" />
      </div>,
      ...child.props.children,
      <div className={cx('table-cell')}>
        <BsThreeDots className={cx('icon-more')} />
      </div>,
    ];
    return {
      ...child,
      props: {
        ...child.props,
        children: childrenUpdate,
        className: cx('table-row', {
          [child.props.className]: child.props.className,
        }),
      },
    };
  });
  console.log(childrenCustom);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('content')}>
          <div className={cx('table-header')}>
            <div className={cx('table-row')}>
              <div className={cx('table-cell')}>
                <input type="checkBox" className={cx('check-box')} />
              </div>
              {columns.map((column, index) => (
                <div className={cx('table-cell')} key={index}>
                  {column}
                </div>
              ))}
              <div className={cx('table-cell')}>actions</div>
            </div>
          </div>
          <div className={cx('table-body')}>
            {childrenCustom.map((row: any, index) => (
              <>{row}</>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
