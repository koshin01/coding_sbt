import { ethers } from "hardhat";

async function main() {

  const entryPass = await ethers.deployContract("EntryPass");

  await entryPass.waitForDeployment();

  console.log("Deployed contract address : ", entryPass.target);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});