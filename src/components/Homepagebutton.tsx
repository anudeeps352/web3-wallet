'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';

export default function Homepagebutton() {
  const router = useRouter();

  return (
    <Button
      className="bg-[#ECDBBB]"
      onClick={() => router.push('/create-wallet')}
    >
      Create Wallet
    </Button>
  );
}
