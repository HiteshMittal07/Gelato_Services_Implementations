import {
  CallWithSyncFeeERC2771Request,
  GelatoRelay,
} from "@gelatonetwork/relay-sdk";
import { ethers } from "ethers";

const RPC_URL = `your rpc url`;

const provider = new ethers.JsonRpcProvider(RPC_URL);
const signer = new ethers.Wallet("Your private key", provider);

const relay = new GelatoRelay();

const testSyncFeeCallERC2771 = async () => {
  const contractAddress = "your contract address";
  const abi = ["function updateNumber(uint256 _number)"];

  const user = await signer.getAddress();
  console.log(user);
  const chainId = (await provider.getNetwork()).chainId;

  const contract = new ethers.Contract(contractAddress, abi, signer);
  const { data } = await contract.updateNumber.populateTransaction(100);

  const feeToken = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  const request: CallWithSyncFeeERC2771Request = {
    chainId,
    target: contractAddress,
    data: data,
    user: user,
    feeToken: feeToken,
    isRelayContext: true,
  };

  const response = await relay.callWithSyncFeeERC2771(request, signer as any);

  console.log(`https://relay.gelato.digital/tasks/status/${response.taskId}`);
};

testSyncFeeCallERC2771();
