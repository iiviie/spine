const hre = require("hardhat");

async function main() {
  // Deploy the contract
  const TheoryNFT = await hre.ethers.getContractFactory("TheoryNFT");
  const theoryNFT = await TheoryNFT.deploy();

  await theoryNFT.waitForDeployment();

  const address = await theoryNFT.getAddress();
  console.log("TheoryNFT deployed to:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 