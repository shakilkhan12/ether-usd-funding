/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    networks: {
      hardhat: {},
      goerli: {
        url: "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78",
        accounts: [
          `2f82210869bb8f02f352c50955c657bf0e3e3e9e361eb265eadf7cd8ce672d45`,
        ],
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
