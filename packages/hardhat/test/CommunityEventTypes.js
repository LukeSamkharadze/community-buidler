const { deployments } = require('hardhat');
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect, assert } = require("chai");

describe('Community Event Types Contract', () => {
    async function deployCommunityEventTypesFixture() {
        await deployments.fixture(['CommunityEventTypes']);
        accounts = await ethers.getSigners();
        tokenOwner = accounts[0];   // also specified in hardhat.config.js

        const CommunityEventTypesContract = await ethers.getContract('CommunityEventTypes', tokenOwner);
        console.log(`CommunityEventTypesContract.address for CommunityEventTypes.js found at ${CommunityEventTypesContract.address}`);

        const [owner] = await ethers.getSigners();

        return { CommunityEventTypesContract, owner };
    }

    describe("Add", function () {
        it("Fails if Event Type Name is empty string", async function () {
            const { CommunityEventTypesContract } = await loadFixture(deployCommunityEventTypesFixture);
            await expect(CommunityEventTypesContract.Add({eventTypeName: "", eventTypeValue: "123"})).to.be.revertedWith("Empty string not allowed as an event type");
        });
    });
});