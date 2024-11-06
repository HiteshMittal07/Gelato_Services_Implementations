import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.deployContract("SimpleContract", [
    345,
    "add trusted forwarder address for the network",
  ]);
  await contract.waitForDeployment();

  console.log("Contract Address:", contract.target);
}

main().catch((error: unknown) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
