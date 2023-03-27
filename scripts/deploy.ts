// Imports
// ========================================================
import { ethers } from "hardhat";
import dotenv from "dotenv";

// Config
// ========================================================
dotenv.config();

// Imports
// ========================================================
async function main() {
  const Contract = await ethers.getContractFactory(`${process.env.CONTRACT_NAME}`);
  const contract = await Contract.deploy(`${process.env.BASE_URL}`);

  await contract.deployed();

  console.log(
    `${`${process.env.CONTRACT_NAME}`} deployed to ${contract.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
