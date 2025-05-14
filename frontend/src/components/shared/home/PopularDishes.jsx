import React from 'react';
import { dishes } from "../../constants";
import { Card } from "@/components/ui/Card";
import { CardContent } from '@/components/ui/CardContent';
import { Link } from 'react-router-dom';
import BootomNav from '../BootomNav';

const DishCard = ({ dish }) => (
  <Card className="flex flex-row items-center bg-[#e0e0e0] rounded-md px-4 py-3 mt-4 mx-4">
    <CardContent className="flex w-full items-center">
      <div className="flex-shrink-0">
        <img
          src={dish.image}
          alt={dish.name}
          className='w-[70px] h-[70px] rounded-full object-cover'
        />
      </div>
      <div className="ml-4">
        <h1 className='text-[#333] text-base font-semibold'>{dish.name}</h1>
        <p className='text-[#555] text-sm mt-1'>
          <span className='text-[#999]'>Orders:</span> {dish.numberOfOrders}
        </p>
      </div>
    </CardContent>
  </Card>
);

const PopularDishes = () => {
  return (
    <div className='mt-6 pr-6'>
      <div className='bg-[#f1f1f1] w-full rounded-lg'>
        <div className='flex justify-between items-center px-6 py-4'>
          <h1 className='text-[#333] text-lg font-semibold tracking-wide'>Popular Dishes</h1>
          <Link to="/AdminFoods" className='text-[#025cca] text-sm font-semibold'>View all</Link>
        </div>

        <div className='overflow-y-auto max-h-[80vh] pr-2 scrollbar-none'>
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
          
      <BootomNav/>
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
