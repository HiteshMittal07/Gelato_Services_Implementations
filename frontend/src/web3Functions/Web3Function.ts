import {
  Web3Function,
  Web3FunctionContext,
} from "@gelatonetwork/web3-functions-sdk";
import { Contract } from "ethers";

const ABI = ["function updateNumber(uint256 _number)"];
Web3Function.onRun(async (context: Web3FunctionContext) => {
  const { userArgs, multiChainProvider } = context;

  const provider = multiChainProvider.default();
  const contractAddress =
    (userArgs.contract as string) ??
    "0xC645269288246e09B10B106248AB4CfbF24af1eA";
  const contract = new Contract(contractAddress, ABI, provider as any);
  const updatedNumber = (userArgs._number as number) ?? 100;

  return {
    canExec: true,
    callData: [
      {
        to: contractAddress,
        data: contract.interface.encodeFunctionData("updateNumber", [
          updatedNumber,
        ]),
      },
    ],
  };
});
