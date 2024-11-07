import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.deployContract("SimpleContractSyncFee", [345]);
  await contract.waitForDeployment();

  console.log("Contract Address:", contract.target);
}

main().catch((error: unknown) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
