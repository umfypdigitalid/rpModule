const Migrations = artifacts.require("Migrations");
const CVC = artifacts.require("EthereumClaimsRegistry");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
