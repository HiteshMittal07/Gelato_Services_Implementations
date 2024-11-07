import {
  CallWithERC2771Request,
  ERC2771Type,
  GelatoRelay,
  SponsoredCallRequest,
} from "@gelatonetwork/relay-sdk";
import { ethers } from "ethers";

const API_KEY = "";
const PRIVATE_KEY = "";
const SponsoredCall = async () => {
  const RPC_URL = "";
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  console.log(provider);
  const signer = new ethers.Wallet(PRIVATE_KEY as string, provider);
  const relay = new GelatoRelay();

  const abi = ["function updateNumber(uint256 _number)"];
  const address = await signer.getAddress();
  const chainId = (await provider.getNetwork()).chainId;
  console.log(chainId);
  const contractAddress = "";
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const { data } = await contract.updateNumber.populateTransaction(100);
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

  console.log(`https://relay.gelato.digital/tasks/status/${response.taskId}`);
};
SponsoredCall();
