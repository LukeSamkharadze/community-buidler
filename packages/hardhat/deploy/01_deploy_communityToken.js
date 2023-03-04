const hre = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
//  const chainId = network.config.chainId

//  if (chainId == 31337) {
    const communityToken = await deploy("CommunityToken", {
          from: deployer,
          log: true,
      });

      process.env.TOKEN_ADDRESS = communityToken.address;

      console.log(
        `Deployed CommunityToken.sol to ${communityToken.address}`
      );
//    }
}