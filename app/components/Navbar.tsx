"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import WalletContext from "./WalletContext";
import DepositModal from "./DepositModal";

function shortAddr(str: string) {
  if (str.length <= 10) {
    return str;  // If the string is 10 characters or fewer, just return it as is.
  }
  const firstPart = str.substring(0, 6);  // Get the first 6 characters
  const lastPart = str.substring(str.length - 4);  // Get the last 4 characters
  return firstPart + '...' + lastPart;
}

export default function Navbar() {
  const { walletAddress, connectWallet } = useContext(WalletContext);
  const [depositOpen, setDepositOpen] = useState(false);
  return (
    <div className="sticky z-[99] top-0 w-full bg-background h-16 flex-row flex items-center justify-between border-solid border-b-gray-500 border-b-2">
      {/*change max-w for changing banner width*/}
      <Link href={"/"} className="max-w-[160px] ml-5">
        <Image src="/banner.svg" alt="Crypflip banner" width={100000000} height={100000000} ></Image>
      </Link>
      <div className="mr-16 flex items-center">
        <button onClick={walletAddress ? () => { setDepositOpen(true) } : connectWallet} className="bg-accent max-w-32 truncate hover:bg-primary rounded-md px-6 py-2 text-text text-sm">
          {walletAddress ? "Deposit" : "Connect"}
        </button>
        <h1 className="ml-4">{shortAddr(walletAddress)}</h1>
      </div>
      {depositOpen && <DepositModal close={() => { setDepositOpen(false) }}></DepositModal>}
    </div >
  )
}
