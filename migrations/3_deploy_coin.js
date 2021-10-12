const { web3 } = require("../src/config");

const Coin = artifacts.require("Coin");

module.exports = function (deployer) {
  const initialAmount = 10;
  const safeAmount = web3.utils.toWei(initialAmount, 'ether')
  const tokens = web3.utils.toBN(safeAmount)
  deployer.deploy(Coin, tokens);
};
