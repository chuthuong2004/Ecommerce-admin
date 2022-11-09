import React from 'react'
import { PrevArrowIcon } from '../Icons';

type Props = {
    classNames?: string;
    style?: any,
    onClick?: any
}
const PrevArrow: React.FC<Props> = ({ style, classNames, onClick }) => {
    return (
        <div
            className={`btn-arrow btn-prev ${classNames}`}
            style={{
                ...style,
            }}
            onClick={onClick}
        >
            <PrevArrowIcon />
        </div>
    );
};

export default PrevArrow