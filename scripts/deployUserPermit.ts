import { ethers } from "hardhat";

async function main() {
  const WETH = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";
  const price = 10n ** 8n;
  const contract = await ethers.deployContract("SimpleContractUserPermit", [
    WETH,
    price,
  ]);
  await contract.waitForDeployment();

  console.log("Contract Address:", contract.target);
}

main().catch((error: unknown) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
