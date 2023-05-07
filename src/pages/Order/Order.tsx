import React from 'react';
import "./_order.scss";
import { AiFillCaretDown } from "react-icons/ai"
const Order = () => {
  return (
    <div className="order-filter">
      <div className="order-filter-title">All Orders</div>
      <div className="order-filter-item">
        <div className="order-filter-item-type">
          <select id="type">
            <option value="sortBy">Sort by</option>
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>
        <div className='order-filter-item-number'>
          <select id='number'>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className='order-filter-item-search'>
          <input type="search" id='search' name='search' placeholder='Search'/>
        </div>
      </div>
      <div className='order-filter-button'>
        <button type='button'>Action <AiFillCaretDown/></button>
      </div>
    </div>
  );
};

export default Order;
