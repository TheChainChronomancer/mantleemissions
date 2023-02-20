/** @type import('hardhat/config').HardhatUserConfig */


require("@nomiclabs/hardhat-ethers")

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    mantle: {
      url:"https://rpc.testnet.mantle.xyz/",
      accounts: ['0x'],
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/H5ECZjhXpPjR3U7BAU4dJahMDtm_ryrw`,
      accounts: ['0x']
    },
  }
};
