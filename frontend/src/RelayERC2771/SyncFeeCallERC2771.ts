import {
  GelatoRelay,
  CallWithSyncFeeERC2771Request,
} from "@gelatonetwork/relay-sdk";
import { ethers } from "ethers";
import ABI from "../abi/SimpleContractSyncFee.json";

export const SyncFeeCallERC2771 = async (updateNumber: number) => {
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
  const feeToken = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  const request: CallWithSyncFeeERC2771Request = {
    chainId,
    target: contractAddress,
    data: data,
    user: address,
    feeToken: feeToken,
    isRelayContext: true,
  };

  const response = await relay.callWithSyncFeeERC2771(request, signer as any);

  window.alert(`https://relay.gelato.digital/tasks/status/${response.taskId}`);
};
