import hre from "hardhat";
import { expect } from "chai";
import { before } from "mocha";
import {
  Web3FunctionUserArgs,
  Web3FunctionResultV2,
} from "@gelatonetwork/web3-functions-sdk";
import { Web3FunctionHardhat } from "@gelatonetwork/web3-functions-sdk/hardhat-plugin";
const { ethers, w3f } = hre;
describe("SimpleContract Tests", function () {
  this.timeout(0);
  let contract: any;
  let simpleW3f: Web3FunctionHardhat;
  let userArgs: Web3FunctionUserArgs;
  let dedicatedSigner: any;

  before(async function () {
    const dedicatedMsgSenderAddress = "";
    contract = await ethers.deployContract("SimpleContract", [
      345,
      "0x61F2976610970AFeDc1d83229e1E21bdc3D5cbE4",
    ]);
    await contract.waitForDeployment();

    simpleW3f = w3f.get("web3Functions");
    const address = contract.target as string;
    userArgs = {
      _number: 5,
      contract: address,
    };

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [dedicatedMsgSenderAddress],
    });

    const balanceInWei = ethers.parseEther("100");
    const hexBalance = ethers.toBeHex(balanceInWei);

    await hre.network.provider.request({
      method: "hardhat_setBalance",
      params: [dedicatedMsgSenderAddress, hexBalance],
    });

    dedicatedSigner = await ethers.getSigner(dedicatedMsgSenderAddress);
  });

  it("canExec: true - First execution", async () => {
    let { result } = await simpleW3f.run("onRun", { userArgs });
    result = result as Web3FunctionResultV2;

    expect(result.canExec).to.equal(true);
    if (!result.canExec) throw new Error("!result.canExec");

    const startNumber = (await contract.myNumber()).toString();
    console.log(startNumber);

    const calldataNumber = result.callData[0];
    await dedicatedSigner.sendTransaction({
      to: calldataNumber.to,
      data: calldataNumber.data,
    });

    const updatedNumber = (
      await contract.connect(dedicatedSigner).myNumber()
    ).toString();

    console.log(updatedNumber);

    expect(updatedNumber).to.equal(userArgs._number.toString());
  });
});
