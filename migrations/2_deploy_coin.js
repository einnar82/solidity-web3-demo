const Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const Coin = artifacts.require("Coin");

module.exports = function (deployer) {
  const initialAmount = '100000000';
  const safeAmount = web3.utils.toWei(initialAmount, 'ether')
  const tokens = web3.utils.toBN(safeAmount)
  deployer.deploy(Coin, tokens);
};