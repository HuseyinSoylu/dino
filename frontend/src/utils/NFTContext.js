import {ethers} from "ethers"

export const checkIfWalletIsConnect = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask.");
    return false;
  }


  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  if (accounts.length) {
    console.log(accounts);
    return true;
  } else {
    console.log("No accounts found");
    return false;
  }
};

export const connectWallet = async () => {
  if (!window.ethereum) return alert("Please install MetaMask.");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  console.log(address);
  return address;
};

export const askForSign = async (message) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();
  const sig = await signer.signMessage(message);
  return sig;
}

export const getNetworkId = async () => {
  if (!window.ethereum) return alert("Please install MetaMask.");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const networkId = await provider.getNetwork();
  console.log(networkId);
  return networkId.chainId;
};

export const switchNetwork = async () => {
  const CHAIN_ID_REQUIRED = 43114;
  if (!window.ethereum) return alert("Please install MetaMask.");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const networkId = await provider.getNetwork();

  if (networkId.chainId != 43114) {
    await provider.send("wallet_switchEthereumChain", [{
      chainId: `0x${CHAIN_ID_REQUIRED.toString(16)}`
    }, ]);
  }
};

export const createNft = async (url, price) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const price1 = ethers.utils.parseUnits(price, "ether");
  const contract = fetchContract(signer);
  const listingPrice = await contract.getlistFee();

  const transaction = await contract.createAndMintNft(url, price1, {
    value: listingPrice.toString(),
  });

  await transaction.wait();
  return transaction;
};

export const buyNft = async (tokenId, price) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(MarketAddress, abi, signer);

  const price2 = ethers.utils.parseUnits(price, "ether");
  console.log(price2);
  const transaction = await contract.BuyNft(tokenId, price2, {
    value: price2,
  });
  console.log(transaction);

  await transaction.wait();
  return transaction;
};

export const transferNft = async (tokenId, owner) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(MarketAddress, abi, signer);

  const transaction = await contract.TransferNft(tokenId, owner);
  console.log(transaction);

  await transaction.wait();
  return transaction;
};

export const getAssetId = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = fetchContract(signer);
  const currentToken = await contract.getCurrentToken();
  console.log(currentToken);
  return currentToken;
};

export const toHexNumber = (number) => {
  console.log(number);
  return parseInt(Number(number));
};

export const accountsChanged = async () => {
  window.ethereum.on("accountsChanged", async () => {
    const address = await connectWallet();
    return address;
  });
};