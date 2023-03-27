// Imports
// ========================================================
import { ethers } from "hardhat";
import dotenv from "dotenv";

// Config
// ========================================================
dotenv.config();
const TOKEN_ID = 1; // tokenID - modify if ID not minted

// Imports
// ========================================================
async function main() {
  console.group('Reading...');
  console.log({ TOKEN_ID });
  const Contract = await ethers.getContractAt(`${process.env.CONTRACT_NAME}`, `${process.env.CONTRACT_ADDRESS}`);
  const tx = await Contract.uri(TOKEN_ID);
  console.log({ tx });
  console.groupEnd();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
