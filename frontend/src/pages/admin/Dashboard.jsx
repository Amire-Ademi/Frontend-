import React from 'react';
import BootomNav from '../components/shared/BootomNav';
import Greetings from '../components/shared/home/Greetings';
import MiniCard from '../components/shared/home/MiniCard';
import RecentOrders from '../components/shared/home/RecentOrders';
import PopularDishes from '../components/shared/home/PopularDishes';
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";

const Home = () => {
  return (
    <section className='bg-[#fffdfd] h-[calc(100vh-5rem)] overflow-hidden flex gap-3'>
      {/* Left Section */}
      <div className='flex-[3]'>
        <Greetings />
        <div className='flex items-center w-full gap-3 px-8 mt-8'>
          <MiniCard title="Total" icon={<BsCashCoin />} number={512} footerNum={1.15} />
          <MiniCard title="In Progress" icon={<GrInProgress />} number={12} footerNum={3.6} />
        </div>
        <RecentOrders />
      </div>

      {/* Right Section */}
      <div className='flex-[2]'>
        <PopularDishes />
      </div>
      
      <BootomNav />
    </section>
  );
}

export default Home;
