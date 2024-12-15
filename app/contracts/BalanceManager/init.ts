import Web3, { Contract } from "web3";
import abi from "./ABI";
const address = "0xafBC084241302FeD788b8Dd295eDb1481D705ac9";

export default function BalanceManager(web3: Web3): Contract<typeof abi> {
  if (!web3) throw new Error("Web3 not initialized!");
  return new web3.eth.Contract(abi, address)
}
