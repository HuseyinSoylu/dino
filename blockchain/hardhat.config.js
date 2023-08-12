require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('hardhat-deploy');
require('dotenv').config();
require('@openzeppelin/hardhat-upgrades');

const { PRIVATE_KEY } = process.env;

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      chainId: 43113,
      gasPrice: 225000000000, // You can set any gas price you want here
      accounts: [`0x${PRIVATE_KEY}`],
    },
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      chainId: 80001,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    sepolia: {
      url: 'https://eth-sepolia.public.blastapi.io',
      chainId: 11155111,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    owner: {
      default: 0,
    },
  },
  paths: {
    deploy: 'deploy',
    deployments: 'deployments',
    imports: 'imports',
    tests: 'test',
  },
};