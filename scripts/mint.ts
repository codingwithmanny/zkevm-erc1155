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
  console.group('Minting...');
  const MIN = 1;
  const MAX = parseInt(`${process.env.NUMBER_NFT_TYPES}`, 0);
  const Contract = await ethers.getContractAt(`${process.env.CONTRACT_NAME}`, `${process.env.CONTRACT_ADDRESS}`);
  const tx = await Contract.mint(Math.floor(Math.random() * (MAX - MIN + 1) + MIN)); // Amount of nfts to mint
  console.log({ tx });
  const result = await tx.wait();
  console.log({ result });
  console.groupEnd();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
