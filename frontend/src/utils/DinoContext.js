import { ethers } from "ethers";
import { MarketAddress, MarketAddressABI } from "./constants";
const infuraProjectId = "5e38499cc0dc41bf8c52ed42cc26e75b"; // Replace with your Infura Project ID

export const publishArticle = async (articleHash, price, publishingFee) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      MarketAddress,
      MarketAddressABI,
      signer
    );

    const priceInWei = ethers.utils.parseUnits(price, "ether");
    const transaction = await contract.publishArticle(articleHash, priceInWei, {
      value: publishingFee,
    });

    await transaction.wait();
    return transaction;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getLatestArticleNumberFromContract = async () => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://optimism-goerli.infura.io/v3/${infuraProjectId}`
    );
    const contract = new ethers.Contract(
      MarketAddress,
      MarketAddressABI,
      provider
    );

    const latestArticleNumber = await contract.getLatestArticleNumber();

    return latestArticleNumber.toNumber();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getArticleHashFromContract = async (tokenId) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://optimism-goerli.infura.io/v3/${infuraProjectId}`
    );
    const contract = new ethers.Contract(
      MarketAddress,
      MarketAddressABI,
      provider
    );

    const articleHash = await contract.getArticleHash(tokenId);
    return articleHash;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const purchaseArticle = async (tokenId, price) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      MarketAddress,
      MarketAddressABI,
      signer
    );

    const tx = await contract.purchaseArticle(tokenId, price, {
      value: 1000000000000, // Send the specified price as Ether
    });

    await tx.wait();

    localStorage.setItem("purchasedId", tokenId);
    console.log("Article purchased successfully");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
