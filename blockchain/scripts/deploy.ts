import { ethers } from "hardhat";

async function main() {
  // Get the contract factory
  const TheoryNFT = await ethers.getContractFactory("TheoryNFT");
  
  // Deploy the contract
  const theoryNFT = await TheoryNFT.deploy();
  
  // Wait for deployment to finish
  await theoryNFT.waitForDeployment();

  // Get the contract address
  const address = await theoryNFT.getAddress();
  
  console.log("TheoryNFT deployed to:", address);
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 