'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  card,
} from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Wallet, HDNodeWallet } from 'ethers';
import bs58 from 'bs58';

type ethwallet = {
  publickey: string;
  privatekey: string;
  path: string;
  mnemonic: string;
};
type proptype = {
  mnemonic: string;
};
//button to create wallet,instantly shows wallets below as well.
// remove enter seed phase once not empty
export default function CreateEthWallet({ mnemonic }: proptype) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // const [publicKeys, setPublicKeys] = useState<Keypair['publicKey'][]>([]);
  const [ethWallets, setethWallets] = useState<ethwallet[]>([]);
  // change the storage from just array to array object

  useEffect(() => {
    const storedwallets = localStorage.getItem('wallets');
    if (storedwallets) {
      setethWallets(JSON.parse(storedwallets));
    }
  }, []);

  const incrementIndex = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1); // Correct usage
  };
  const generatewallet = (mnemonic: string): ethwallet | null => {
    try {
      const seed = mnemonicToSeedSync(mnemonic);
      const path = `m/44'/60'/${currentIndex}'/0'`;
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(path);
      const privateKey = child.privateKey;
      const wallet = new Wallet(privateKey);
      const privateKeyUint8Array = Uint8Array.from(
        Buffer.from(wallet.privateKey.slice(2), 'hex')
      );
      let privatekeyenc = bs58.encode(privateKeyUint8Array);
      const publicKeyUint8Array = Uint8Array.from(
        Buffer.from(wallet.address.slice(2), 'hex')
      );
      let publickeyenc = bs58.encode(publicKeyUint8Array);
      incrementIndex();
      // setPublicKeys([...publicKeys, keypair.publicKey]); do someting about it
      return {
        publickey: publickeyenc,
        privatekey: privatekeyenc,
        path,
        mnemonic,
      };
    } catch (error) {
      return null;
    }
  };

  const createWallet = () => {
    const newwallet = generatewallet(mnemonic);
    if (newwallet) {
      setethWallets([...ethWallets, newwallet]);
      localStorage.setItem('wallets', JSON.stringify(ethWallets));
    }
  };

  const deletewallet = (toremoveindex: number) => {
    setethWallets((prev) =>
      prev.filter((item, index) => index !== toremoveindex)
    );
    localStorage.setItem('wallets', JSON.stringify(ethWallets));
  };
  const clearall = () => {
    setethWallets([]);
    localStorage.setItem('wallets', JSON.stringify(ethWallets));
  };
  return (
    <div className="wallet-div flex flex-col w-[80vw] mx-auto gap">
      <div className="buttons self-end flex gap-[1vw]">
        <Button onClick={createWallet} color="primary">
          <h2 className="text-background">Add Wallet</h2>
        </Button>
        <Button onClick={clearall} color="danger">
          Clear all Wallet
        </Button>
      </div>
      <div className="flex flex-col mt-[2vh] ml-[0.5vw]">
        <h2 className="text-[2rem]">Ethereum Wallet</h2>
        <div className="wallet-div flex flex-col gap-[3vh] mt-[1vh] ">
          {ethWallets.map((wallet: ethwallet, index: number) => (
            <Card shadow="md" radius="md">
              <CardHeader>
                <h2 className="text-[2rem]">Wallet {index + 1}</h2>
              </CardHeader>
              <Divider></Divider>
              <CardBody className="flex flex-col gap-[1vh] p-[1vw]">
                <h2>Public key is :{wallet.publickey}</h2>
                <h2>Private key is :{wallet.privatekey}</h2>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
