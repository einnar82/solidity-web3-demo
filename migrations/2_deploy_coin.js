const  { web3 } = require('../src/config');
const Coin = artifacts.require("Coin");

const TOTAL_SUPPLY = '100000000';

module.exports = function (deployer) {
  const safeAmount = web3.utils.toWei(TOTAL_SUPPLY, 'ether')
  const tokens = web3.utils.toBN(safeAmount)
  deployer.deploy(Coin, tokens);
};