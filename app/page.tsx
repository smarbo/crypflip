"use client";

import { useState, useContext, useEffect } from "react";
import WalletContext from "./components/WalletContext";
import BalanceManager from "./contracts/BalanceManager/init";
import DepositModal from "./components/DepositModal";

export default function Home() {
  const { walletAddress, connectWallet, web3, ethBalance } = useContext(WalletContext);
  const [balance, setBalance] = useState(0);


  const getBalance = async () => {
    const bm = BalanceManager(web3);
    try {
      const balanceWei: string = await bm.methods.getBalance().call({ from: walletAddress });
      const eth = web3.utils.fromWei(balanceWei, "ether");
      return parseFloat(eth);
    } catch (err) {
      console.log(err)
    }
  }

  const renderBalance = () => {
    getBalance().then(b => {
      console.log(b!);
      setBalance(b!)
    })
  }

  useEffect(() => {
    if (walletAddress) {
      renderBalance();
    }
  }, [])

  return (
    <>
    </>
  );
}

