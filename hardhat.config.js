require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/1naLqCFYiCuo_ww9fTLrybN1yZa02CBg",
      accounts: ["f00364f2148cf2319294373017c7cbc63679c5582dba3ce84c37b4b0e0ee53b0"],
    },
  },
};