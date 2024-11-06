import {
  CallWithERC2771Request,
  ERC2771Type,
  GelatoRelay,
  SponsoredCallRequest,
} from "@gelatonetwork/relay-sdk";
import { ethers } from "ethers";
import ABI from "../abi/SimpleContract.json";

export const SponsoredCall = async (updateNumber: number) => {
  const API_KEY = "Your API Key";
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner();
  const relay = new GelatoRelay();
  const abi = ABI.abi;
  const address = await signer.getAddress();
  const chainId = (await provider.getNetwork()).chainId;
  const contractAddress = "Your contract Address";
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const { data } = await contract.updateNumber.populateTransaction(
    updateNumber
  );
  const request: CallWithERC2771Request = {
    chainId,
    target: contractAddress,
    data: data,
    user: address,
  };

  const response = await relay.sponsoredCallERC2771(
    request,
    signer as any,
    API_KEY as string
  );

  window.alert(`https://relay.gelato.digital/tasks/status/${response.taskId}`);
};
