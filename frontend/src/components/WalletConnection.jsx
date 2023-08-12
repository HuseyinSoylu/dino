// WalletConnection.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';


function WalletConnection() {


  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const connectWalletHandler = async () => {

    try {
      if (window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        await accountChangedHandler(signer);
        setShowDropdown(true); // Show the dropdown after connecting
      } else {
        setErrorMessage("Please Install Metamask!!!");
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setErrorMessage("An error occurred while connecting your wallet.");
    }
  };


   useEffect(() => {
    // Check for a stored signature on page load
    const storedSignature = localStorage.getItem('signature');
    if (storedSignature) {
      setShowDropdown(true);
      verifySignature(); // Verify the stored signature
    }
  }, []);

  useEffect(() => {
    // Check for a stored signature on page load
    const storedWallet = localStorage.getItem('defaultAccount');
    if (storedWallet) {
      setShowDropdown(true);
      verifyWallet(); // Verify the stored signature
    }
  }, []);

  const accountChangedHandler = async (newAccount) => {
    const address = await newAccount.getAddress();
    setDefaultAccount(address);
    const balance = await newAccount.getBalance();
    setUserBalance(ethers.utils.formatEther(balance));
    await getUserBalance(address);
  };

  const getUserBalance = async (address) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/optimism");
      const balance = await provider.getBalance(address);
      console.log("User Balance:", balance);
    } catch (error) {
      console.error('Error fetching user balance:', error);
    }
  };

  const signMessage = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const message = "Welcome!\nPlease sign this request, so we can keep your data securely!";
      const signature = await signer.signMessage(message);

      // Store the signature in localStorage
      localStorage.setItem('signature', signature);
      localStorage.setItem('defaultAccount', defaultAccount)
      location.reload();


    } catch (error) {
      console.error('Error signing message:', error);
    }
  };

  const verifySignature = () => {
    const storedSignature = localStorage.getItem('signature');
    if (storedSignature) {
      console.log('Signature in localStorage:', storedSignature);
      // You can verify the signature using your own logic here
    } else {
      console.log('Signature not found in localStorage.');
    }
  };

    const verifyWallet = () => {
    const storedWallet = localStorage.getItem('defaultAccount');
    if (storedWallet) {
      console.log('Wallet in localStorage:', storedWallet);
      setDefaultAccount(storedWallet)
    } else {
      console.log('Wallet not found in localStorage.');
    }
  };

  const signOutHandler = () => {
    setDefaultAccount(null);
    setUserBalance(null);
    setShowDropdown(false);
    localStorage.removeItem('signature');
    localStorage.removeItem('defaultAccount');
  };

  return (
    <div className="relative">
      {showDropdown ? (
        <div className="dropdown dropdown-end">
          <div className="px-4 py-2 bg-white shadow-md rounded">
            <p>Connected Account: {defaultAccount}</p>
            {userBalance && <p>User Balance: {userBalance} ETH</p>}

            {(!localStorage.getItem("signature")) && ( // Show these buttons only if defaultAccount or userBalance is not available
              <button onClick={signMessage} className="btn btn-primary mt-2">
                Sign Message
              </button>
            )}
            {(!localStorage.getItem("signature")) && (
              <button onClick={verifySignature} className="btn btn-secondary mt-2">
                Verify Signature
              </button>
            )}
            <button onClick={signOutHandler} className="btn btn-secondary mt-2">
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <button onClick={connectWalletHandler} className={`btn btn-primary`}>
          Connect Wallet
        </button>
      )}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default WalletConnection;
