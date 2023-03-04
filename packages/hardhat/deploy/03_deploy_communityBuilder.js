const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments}) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    
    const args = [
        process.env.TOKEN_ADDRESS, 
    ]

    const communityBuilder = await deploy("CommunityBuilder", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmation: 6,
    })

    console.log(
        `Deployed CommunityBuilder.sol to ${communityBuilder.address} with ${process.env.TOKEN_ADDRESS} as communityBuilder address`
      );
}