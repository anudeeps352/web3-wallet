'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';

export default function CreateWalletButton() {
  const router = useRouter();

  return (
    <div className="w-[10vw] relative">
      <Button
        className="bg-[#ECDBBB] text-black"
        onClick={() => router.push('/create-wallet')}
        fullWidth
      >
        Create Wallet
      </Button>
    </div>
  );
}
