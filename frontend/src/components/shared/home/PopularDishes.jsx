import React from 'react';
import { dishes } from "../../constants";
import { Card } from "@/components/ui/Card";
import { CardContent } from '@/components/ui/CardContent';

const PopularDishes = () => {
  return (
    <div className='mt-6 pr-6'>
      <div className='bg-[#f1f1f1] w-full rounded-lg'>
        <div className='flex justify-between items-center px-6 py-4'>
          <h1 className='text-[#333] text-lg font-semibold tracking-wide'>Popular Dishes</h1>
          <a href="#" className='text-[#025cca] text-sm font-semibold'>View all</a>
        </div>

        <div className='overflow-y-scroll h-[780px] scrollbar-hidden pr-2'>
          {dishes.map((dish) => (
            <Card
              key={dish.id}
              className="flex flex-row items-center bg-[#e0e0e0] rounded-md px-4 py-3 mt-4 mx-4"
            >
              <CardContent className="flex w-full items-center">
                {/* Foto pak më e madhe */}
                <div className="flex-shrink-0">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className='w-[70px] h-[70px] rounded-full object-cover'
                  />
                </div>

                {/* Teksti më ngushtë, djathtas */}
                <div className="ml-4">
                  <h1 className='text-[#333] text-base font-semibold'>{dish.name}</h1>
                  <p className='text-[#555] text-sm mt-1'>
                    <span className='text-[#999]'>Orders:</span> {dish.NumberOfOrders}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
