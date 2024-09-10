import styles from './landing.module.css';
import Image from 'next/image';

import Homepagebutton from '@/components/Homepagebutton';
export default function Home() {
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: 'url(/bg-landing.png)' }}
    >
      <main className="flex h-full flex-col items-center relative">
        <h2 className="font-grotesk mx-auto mt-[30vh] text-[3rem] text-[#F3EEE7]">
          Crypt Wallet
        </h2>
        <Homepagebutton />
      </main>
    </div>
  );
}
