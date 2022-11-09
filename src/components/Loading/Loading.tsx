import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import React, { ReactNode } from 'react';
import ReactLoading from 'react-loading';
const cx = classNames.bind(styles);
const Loading = () => {
    return (
        <div className={cx('container')}>
            <ReactLoading type='bubbles' color="#2E2E2E" width={120} height={120} delay={10} />

        </div>
    )
}

export default Loading
