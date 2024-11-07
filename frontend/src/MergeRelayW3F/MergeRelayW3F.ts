import {
  Web3Function,
  Web3FunctionContext,
} from "@gelatonetwork/web3-functions-sdk";
import { CallWithERC2771Request, GelatoRelay } from "@gelatonetwork/relay-sdk";
import ethers from "ethers";

const ABI = ["function updateNumber(uint256 _number)"];
const PRIVATE_KEY = "";

Web3Function.onRun(async (context: Web3FunctionContext) => {
  const { userArgs, multiChainProvider } = context;
  const provider = multiChainProvider.default();
  const signer = new ethers.Wallet(PRIVATE_KEY as string, provider as any);
  const chainId: any = (await provider.getNetwork()).chainId;
  const contractAddress =
    (userArgs.contract as string) ??
    "0xC645269288246e09B10B106248AB4CfbF24af1eA";
  const userAddress = (userArgs.userAddress as string) ?? "";
  const contract = new ethers.Contract(contractAddress, ABI, provider as any);
  const updatedNumber = (userArgs._number as number) ?? 100;
  const API_KEY = "";
  const relay = new GelatoRelay();

  const { data } = await contract.updateNumber.populateTransaction(
    updatedNumber
  );

  const request: CallWithERC2771Request = {
    chainId,
    target: contractAddress,
    data: data,
    user: userAddress,
  };

  const response = await relay.sponsoredCallERC2771(
    request,
    signer as any,
    API_KEY as string
  );

  console.log(`https://relay.gelato.digital/tasks/status/${response.taskId}`);
  return {
    canExec: true,
    callData: [],
  };
});
