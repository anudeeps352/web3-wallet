'use client';
import React from 'react';
import Slider from '@/components/ui/Slider';

import { AppWrapper } from '@/context/SliderContext';
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppWrapper>
      <div className="slider-div fixed top-[2vh] right-[2vw] ">
        <Slider />
      </div>
      {children}
    </AppWrapper>
  );
}
