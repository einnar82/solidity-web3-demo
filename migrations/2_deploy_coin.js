const  { web3 } = require('../src/config');
const { TOTAL_SUPPLY } = require('../src/config/coin')
const Coin = artifacts.require("Coin");


module.exports = function (deployer) {
  const safeAmount = web3.utils.toWei(TOTAL_SUPPLY, 'ether')
  const tokens = web3.utils.toBN(safeAmount)
  deployer.deploy(Coin, tokens);
};