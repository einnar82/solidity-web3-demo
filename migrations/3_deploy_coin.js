const Coin = artifacts.require("Coin");

module.exports = function (deployer) {
  const initialAmount = 10;
  const amountInWei = initialAmount * Math.pow(10, 18);
  deployer.deploy(Coin, String(amountInWei));
};
