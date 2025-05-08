import React from 'react';
import { FaSearch } from 'react-icons/fa';
import OrderList from './OrderList';

const RecentOrders = () => {
  return (
    <div className='px-8 mt-6'>
      <div className='bg-[#ffffff] w-full h-[450px] rounded-lg shadow-md'>
        <div className='flex justify-between items-center px-6 py-4'>
          <h1 className='text-[#333] text-lg font-semibold tracking-wide'>Recent Orders</h1>
          <a href="orders" className='text-[#025cca] text-sm font-semibold'>View all</a>
        </div>

      
        <div className='flex items-center gap-4 bg-[#f9f9f9] rounded-lg px-6 py-4 mx-6'>
          <FaSearch className="text-[#333]" />
          <input placeholder="Search Orders" className="bg-[#f9f9f9] outline-none text-2xl text-[#333]" />
        </div>

        
        <div className="bg-[#f9f9f9] mt-4 px-6 overflow-y-auto max-h-[300px] scrollbar-hide">
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
