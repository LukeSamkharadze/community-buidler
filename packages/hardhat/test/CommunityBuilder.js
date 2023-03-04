const { deployments } = require('hardhat');
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect, assert } = require("chai");

describe('Community Community Builder Contract', () => {
    async function deployCommunityBuilderFixture() {
        await deployments.fixture(['CommunityBuilder']);
        accounts = await ethers.getSigners();
        tokenOwner = accounts[0];   // also specified in hardhat.config.js

        const CommunityBuilderContract = await ethers.getContract('CommunityBuilder', tokenOwner);
        const CommunityTokenContract = await ethers.getContract('CommunityToken', tokenOwner);

        const [owner] = await ethers.getSigners();

        return { CommunityBuilderContract, CommunityTokenContract, owner };
    }

    describe("Deployment", function () {
        it("Fails if token address is not 0", async function () {
            const { CommunityBuilderContract } = await loadFixture(deployCommunityBuilderFixture);
            expect(await CommunityBuilderContract.communityToken.address).to.not.equal(0);
        });
    });

    describe("addContributor", function () {
        it("Fails if contract token balance is insufficient", async function () {
            const { CommunityBuilderContract, CommunityTokenContract } = await loadFixture(deployCommunityBuilderFixture);
            await expect(CommunityBuilderContract.addContributor("0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f")).to.be.revertedWith("Unable to add new contributor, insufficient contract token balance");
        });
    });
});




