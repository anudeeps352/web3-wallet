'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';

export default function ViewWalletButton() {
  const router = useRouter();

  return (
    <div className="w-[10vw] relative">
      <Button
        className="bg-[#ECDBBB]"
        onClick={() => router.push('/view-wallet')}
        fullWidth
      >
        View Wallet
      </Button>
    </div>
  );
}
