const Coin = artifacts.require("Coin");

module.exports = function (deployer) {
  deployer.deploy(Coin, 1000000000000);
};
