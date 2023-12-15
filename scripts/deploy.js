
const hre = require("hardhat");

async function main() {

  const NFT =await hre.ethers.deployContract("NFT");
  await NFT.waitForDeployment();
  console.log("Contract deployed to address:", NFT);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// contract deploy address 
//	0xe69326235041a67d6c374a0180be5d10e208fb2f
//  0xF518ACD72A5fC37BE3978634964a6088Cc40d8E5