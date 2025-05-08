import React from 'react';
import { FaCheckDouble, FaCircle } from 'react-icons/fa';
import { Badge } from '../../ui/badge';

const OrderList = () => {
  return (
    <div className="flex items-center gap-5 mb-4 p-4 bg-[#f9f9f9] rounded-lg shadow-md">
      {/* User Button */}
      <button className="bg-[#f2f2f2] p-3 text-xl font-bold rounded-lg text-[#333]">
        FF
      </button>

      {/* Order Information */}
      <div className="flex items-center justify-between w-full">
        {/* Customer Info */}
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-[#333] text-lg font-semibold tracking-wide">Filan Fisteku</h1>
          <p className="text-[#555] text-sm">8 items</p>
        </div>

        {/* Table Number */}
        <div>
          <h1 className="text-[#f6b100] font-semibold border border-[#f6b100] rounded-lg p-1">
            Table No: 3
          </h1>
        </div>

        {/* Status Section */}
        <div className="flex flex-col items-start gap-2">
          <Badge variant="success" className="text-green-600">
            <FaCheckDouble className="inline mr-2" /> Ready
          </Badge>
          <p className="text-[#555] text-sm">
            <FaCircle className="inline mr-2 text-green-600" /> Ready to service
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
