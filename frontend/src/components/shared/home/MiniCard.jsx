import React from 'react';
import { Card, CardHeader, CardContent } from '../../ui/card'; 
import { Button } from '../../ui/button';  

const MiniCard = ({ title, icon, number, footerNum }) => {
  return (
    <Card className="bg-[#f9f9f9] py-6 px-6 rounded-lg shadow-md">
      <CardHeader className="flex items-center justify-between mb-4">
        <h1 className="text-[#333] text-lg font-semibold">{title}</h1>
        <Button
          variant="outline"
          className={`${title === "Total" ? "bg-[#02ca3a]" : "bg-[#f6b100]"} p-3 rounded-lg text-[#f5f5f5] text-2xl`}
        >
          {icon}
        </Button>
      </CardHeader>

      <CardContent className="text-center">
        <h1 className="text-[#333] text-4xl font-bold">{number}</h1>
        <h2 className="text-[#333] text-lg mt-2">
          <span className="text-[#02ca3a]">{footerNum}%</span> than yesterday
        </h2>
      </CardContent>
    </Card>
  );
};

export default MiniCard;
