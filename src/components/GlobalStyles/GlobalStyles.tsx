import './GlobalStyles.scss';
import PropTypes from 'prop-types';
import React,{ ReactNode } from 'react';

type Props = {
    children: any
}
const GlobalStyles = ({ children }: Props) => {
    return children;
}
export default GlobalStyles;
