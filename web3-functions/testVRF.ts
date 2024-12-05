import { ethers } from "ethers";
import { SimpleVRFContract__factory } from "../typechain-types";

const PRIVATE_KEY = "";
async function main() {
  const contractAddress = "0x829c89B65dab8E8e18624012784b3512D965880c";
  const RPC_URL = "";
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  const vrfContract = SimpleVRFContract__factory.connect(
    contractAddress,
    signer
  );
  const data = ethers.encodeBytes32String("VRF test implementation");
  console.log(data);
  const tx = await vrfContract.requestRandomness(data, { gasLimit: 1000000 });
  console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
