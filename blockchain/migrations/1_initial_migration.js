const Migrations = artifacts.require("Migrations");
const CVC = artifacts.require("cvc");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(CVC);
};
