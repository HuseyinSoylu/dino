const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const HashedArticleStorage = await ethers.getContractFactory("HashedArticleStorage");
  const publishingFee = ethers.utils.parseEther("0.01"); // Set the publishing fee in ether (adjust as needed)
  const hashedArticleStorage = await HashedArticleStorage.deploy("HashedArticleStorage", "HASH", publishingFee);

  await hashedArticleStorage.deployed();

  console.log("HashedArticleStorage deployed to:", hashedArticleStorage.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
