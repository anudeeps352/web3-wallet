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
import { mnemonicToSeed, mnemonicToSeedSync } from 'bip39';
import nacl from 'tweetnacl';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

type solwallet = {
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
export default function CreateSolanaWallet({ mnemonic }: proptype) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [publicKeys, setPublicKeys] = useState<Keypair['publicKey'][]>([]);
  const [solWallets, setsolWallets] = useState<solwallet[]>([]);
  // change the storage from just array to array object

  useEffect(() => {
    const storedwallets = localStorage.getItem('wallets');
    if (storedwallets) {
      setsolWallets(JSON.parse(storedwallets));
    }
  }, []);

  useEffect(() => {
    if (solWallets.length > 0) {
      localStorage.setItem('wallets', JSON.stringify(solWallets));
    }
  }, [solWallets]);

  const incrementIndex = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1); // Correct usage
  };
  const generatewallet = (mnemonic: string): solwallet | null => {
    try {
      const seed = mnemonicToSeedSync(mnemonic);
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString('hex')).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);
      let privatekeyenc = bs58.encode(keypair.secretKey);
      let publickeyenc = keypair.publicKey.toBase58();
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
      const updatedwallet = [...solWallets, newwallet];
      setsolWallets(updatedwallet);
    }
  };

  const deletewallet = (toremoveindex: number) => {
    setsolWallets((prev) =>
      prev.filter((item, index) => index !== toremoveindex)
    );
  };
  const clearall = () => {
    setsolWallets([]);
    localStorage.setItem('wallets', JSON.stringify([]));
  };
  return (
    <div className="wallet-div flex flex-col w-[80vw] mx-auto gap">
      <div className="buttons self-end flex gap-[1vw]">
        <Button onClick={() => createWallet()} color="primary">
          <h2 className="text-background">Add Wallet</h2>
        </Button>
        <Button onClick={clearall} color="danger">
          Clear all Wallet
        </Button>
      </div>
      <div className="flex flex-col mt-[2vh] ml-[0.5vw]">
        <h2 className="text-[2rem]">Solana Wallet</h2>
        <div className="wallet-div flex flex-col gap-[3vh] mt-[1vh] ">
          {solWallets.map((wallet: solwallet, index: number) => (
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
