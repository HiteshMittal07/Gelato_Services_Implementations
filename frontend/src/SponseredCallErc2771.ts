import {
  CallWithERC2771Request,
  ERC2771Type,
  GelatoRelay,
  SponsoredCallRequest,
} from "@gelatonetwork/relay-sdk";
import { ethers } from "ethers";
import ABI from "./abi/SimpleContract.json";
const API_KEY = process.env.API_KEY;
export const SponsoredCall = async (updateNumber: any) => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();
  const relay = new GelatoRelay();

  const abi = ABI.abi;
  const address = await signer.getAddress();
  const chainId = BigInt((await provider.getNetwork()).chainId);
  const contractAddress = "0xC645269288246e09B10B106248AB4CfbF24af1eA";
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const { data } = await contract.populateTransaction.updateNumber(
    updateNumber
  );
  const request: CallWithERC2771Request = {
    chainId,
    target: contractAddress,
    data: data as string,
    user: address,
  };

  const response = await relay.sponsoredCallERC2771(
    request,
    signer as any,
    API_KEY as string
  );

  window.alert(`https://relay.gelato.digital/tasks/status/${response.taskId}`);
};
