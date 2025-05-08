import React from 'react';
import { Card, CardHeader, CardContent } from '../../ui/card';

const Greetings = () => {
  return (
    <div className="flex justify-between items-center px-8 mt-5">
      <Card className="bg-[#f9f9f9] p-6 rounded-lg shadow-md w-full">
        <CardHeader>
          <h1 className="text-[#333] text-2xl font-semibold tracking-wide">Greetings</h1>
          <p className="text-[#777] text-sm">Give your best services for customers</p>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Greetings;
