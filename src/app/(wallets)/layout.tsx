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
      <div className="slider-div absolute top-[2vh] left-[80vw] ">
        <Slider />
      </div>
      {children}
    </AppWrapper>
  );
}
