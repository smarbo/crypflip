import { FaWindowClose } from "react-icons/fa"
import WalletContext from "./WalletContext";
import BalanceManager from "../contracts/BalanceManager/init"
import { useContext, useState } from "react";

function floorToPrecision(num: number, precision: number) {
  if (num === 0) return 0;

  const factor = Math.pow(10, precision - Math.floor(Math.log10(Math.abs(num))) - 1);
  return Math.floor(num * factor) / factor;
}


export default function DepositModal({ close }: { close: () => void }) {
  const { ethBalance, connectWallet, walletAddress, web3 } = useContext(WalletContext);
  const [inputEth, setInputEth] = useState<number>(0);

  const deposit = async () => {
    const bm = BalanceManager(web3);
    const wei = web3.utils.toWei(inputEth, "ether");
    try {
      const tx = await bm.methods.deposit().send({
        from: walletAddress,
        value: wei,
      });
      return tx;
    } catch (error) {
      console.log("Error while depositing:", error);
    }
  };

  const handleDeposit = async () => {
    if (walletAddress && inputEth > 0 && inputEth <= ethBalance) {
      await deposit();
    }
  };

  return (
    <>
      <div onClick={close} className="w-[100vw] h-[100vh] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] fixed z-[9998] bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
      </div>
      <div className="fixed sm:w-[70vw] sm:h-[80vh] md:w-[50vw] md:h-[70vh] lg:w-[600px] lg:h-[500px] flex flex-col top-[50%] z-[9999] left-[50%] translate-x-[-50%] rounded-md translate-y-[-50%] bg-background w-full h-full">
        <div className="border-b px-4 flex justify-between items-center border-[1px] border-gray-700 h-[50px]">
          <h1 className="text-2xl">Deposit</h1>
          <FaWindowClose onClick={close} className="text-2xl"></FaWindowClose>
        </div>
        <div className="grow font-sans px-4 pt-8">
          <label className="pl-2 mb-1 text-primary">Source Chain</label>
          <input className="cursor-pointer px-3 text-sm w-full h-[3rem] bg-background text-text border-solid border-gray-600 border-[1px] rounded-md" value="Holesky Testnet" disabled />
          <input className="cursor-pointer px-2 text-sm w-full mt-2 h-[3rem] bg-background border-solid border-gray-600 border-[1px] rounded-md" value="Ethereum ($ETH)" disabled />
          <input value={inputEth} onChange={(e) => { setInputEth(parseFloat(e.target.value)) }} className="focus:outline-none text-sm cursor-pointer px-3 w-full mt-2 h-[3rem] bg-background border-solid border-gray-600 border-[1px] rounded-md" placeholder="Amount" type="number" />
          <label onClick={() => { setInputEth(floorToPrecision(ethBalance, 5)) }} className="mt-1 text-primary text-sm">Available: {ethBalance} ETH</label>
        </div>
        <div className="border-t border-[1px] p-2 border-gray-700 h-[60px]">
          <button onClick={walletAddress ? handleDeposit : connectWallet} className="bg-accent rounded-md text-lg w-full h-full">{walletAddress ? "Confirm" : "Connect Wallet"}</button>
        </div>
      </div>
    </>
  )
}
