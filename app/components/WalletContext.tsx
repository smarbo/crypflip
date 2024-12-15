"use client";

import React, { createContext, useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers"
import Web3 from "web3";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

type CtxValue = {
  walletAddress: string;
  connectWallet: () => Promise<void>;
  web3: Web3;
  ethBalance: number;
}

const WalletContext = createContext<CtxValue>({
  walletAddress: "", async connectWallet() { }, web3: new Web3(), ethBalance: 0,
});

export const WalletProvider = ({ children }: any) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [ethBalance, setEthBalance] = useState(0);
  const [web3, setWeb3] = useState<Web3>(new Web3());

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }) as Array<string>;
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: "0x4268", rpcUrls: ["https://ethereum-holesky-rpc.publicnode.com"], chainName: "Holesky", nativeCurrency: {
              name: "Ethereum",
              symbol: "ETH",
              decimals: 18,
            }
          }]
        })
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x4268" }]
        })
        const w3 = new Web3(window.ethereum);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          w3.eth.getBalance(accounts[0]).then(b => {
            setEthBalance(parseFloat(w3.utils.fromWei(b, "ether")))
          })
        }
        setWeb3(w3)
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log("MetaMask not found.");
    }
  }

  return (
    <WalletContext.Provider value={{ walletAddress, connectWallet, web3, ethBalance }}>
      {children}
    </WalletContext.Provider>
  )
}

export default WalletContext;
