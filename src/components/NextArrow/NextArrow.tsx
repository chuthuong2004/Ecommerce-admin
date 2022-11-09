import React from 'react'
import { NextArrowIcon } from '../Icons';

type Props = {
    classNames?: string;
    style?: any,
    onClick?: any
}
const NextArrow: React.FC<Props> = ({ style, classNames, onClick }) => {
    return (
        <div
            className={`btn-arrow btn-next ${classNames}`}
            style={{
                ...style,
            }}
            onClick={onClick}
        >
            <NextArrowIcon />
        </div>
    );
};

export default NextArrow