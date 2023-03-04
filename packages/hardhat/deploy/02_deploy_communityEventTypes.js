const hre = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
//  const chainId = network.config.chainId

//  if (chainId == 31337) {
    const communityEventTypes = await deploy("CommunityEventTypes", {
          from: deployer,
          log: true,
      });

      console.log(
        `Deployed CommunityEventTypes.sol to ${communityEventTypes.address}`
      );
//    }
}