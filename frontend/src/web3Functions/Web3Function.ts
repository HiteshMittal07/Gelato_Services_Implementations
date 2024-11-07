import {
  Web3Function,
  Web3FunctionContext,
} from "@gelatonetwork/web3-functions-sdk";
import { SponsoredCall } from "../RelayERC2771/SponsoredCallERC2771";

Web3Function.onRun(async (context: Web3FunctionContext) => {
  const { userArgs, multiChainProvider } = context;

  const provider = multiChainProvider.default();

  await SponsoredCall(150);
  return {
    canExec: true,
    callData: [],
  };
});
