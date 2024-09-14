'use client';
import { Button } from '@nextui-org/react';
import Slider from '@/components/ui/Slider';
import { Input } from '@nextui-org/react';
import AccordionElement from '@/components/ui/AccordionElement';
import { useState } from 'react';
import { generateMnemonic } from 'bip39';
import { useSliderContext } from '@/context/SliderContext';
import CreateEthWallet from '@/components/CreateEthWallet';
import CreateSolanaWallet from '@/components/CreateSolanaWallet';

export default function CreateWallet() {
  const [mnemonic, setmnemonic] = useState('');
  const { sol, setSol } = useSliderContext();
  return (
    <>
      <div className="main-div p-8 pt-[10vh] h-[100vh] flex flex-col w-[100vw] bg-background dark:bg-background-dark">
        <div className="form justify-center mt-[10vh] ">
          <form className="flex flex-row ">
            <div className="inputdiv w-[80vw] ml-[4vw]">
              <Input
                type="text"
                label="Enter Recovery Phrase or leave blank to auto gen"
                radius="full"
                variant="bordered"
                fullWidth={true}
              ></Input>
            </div>
            <Button
              className="m-auto"
              radius="full"
              size="lg"
              color="primary"
              onClick={async function () {
                if (mnemonic === '') {
                  const mn = generateMnemonic();
                  setmnemonic(mn);
                }
              }}
            >
              <h2 className="text-black">Generate Wallet</h2>
            </Button>
          </form>
        </div>
        <div className="secretphrases justify-end w-[90vw] mt-[5vh] self-center">
          <AccordionElement mnemonic={mnemonic} />
        </div>
        {sol ? <CreateSolanaWallet mnemonic={mnemonic} /> : <CreateEthWallet />}
      </div>
    </>
  );
}
