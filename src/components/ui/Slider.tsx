'use client';

import { useState } from 'react';
import { cn } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useSliderContext } from '@/context/SliderContext';

export default function Slider() {
  const router = useRouter();
  const { sol, setSol } = useSliderContext();
  const toggleWallet = () => {
    setSol(!sol);
  };

  return (
    <div
      className="bg-primary dark:bg-primary-dark rounded-[49px] w-[17.8vw] h-[8vh] relative"
      onClick={toggleWallet}
    >
      <div
        className={cn(
          'bg-background dark:bg-background-dark  absolute left-[0.4vw] top-[0.7vh] rounded-[49px] w-[8.5vw] h-[6.5vh] transition-transform duration-500 ease-in-out',
          sol ? '' : 'translate-x-[100%]'
        )}
      ></div>
      <div className="flex flex-row absolute top-[2.3vh] w-[17.8vw] justify-around">
        <h2 className="text-primary dark:text-primary-dark">Solana wallet</h2>
        <h2 className="text-primary dark:text-primary-dark">Eth wallet</h2>
      </div>
    </div>
  );
}
