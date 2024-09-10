'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { mnemonicToSeed } from 'bip39';
import nacl from 'tweetnacl';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';

type solwallets = {
  publickey: string;
  privatekey: string;
  path: string;
  menmonic: string;
};
//button to create wallet,instantly shows wallets below as well.
// remove enter seed phase once not empty
function CreateSolanaWallet(mnemonic: string) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [publicKeys, setPublicKeys] = useState<Keypair['publicKey'][]>([]);
  const [solWallets, setsolWallets] = useState<solwallets[]>([]);
  // change the storage from just array to array object

  const generatewallet = (
    path: string,
    menmonic: string,
    currentIndex: string
  ): solwallets | null => {
    try {
    } catch (error) {
      return null;
    }
  };
  return (
    <div className="flex flex-col ">
      <h2>Solana Wallet</h2>
      <div className="wallet-div">
        <Button
          onClick={async () => {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString('hex')).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            setCurrentIndex(currentIndex + 1);
            setPublicKeys([...publicKeys, keypair.publicKey]);
          }}
        ></Button>
      </div>
    </div>
  );
}

export default CreateSolanaWallet;
