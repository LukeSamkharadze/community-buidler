const { deployments } = require('hardhat');
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect, assert } = require("chai");

describe('Community Community Builder Contract', () => {
    async function deployCommunityBuilderFixture() {
        await deployments.fixture(['CommunityBuilder']);
        accounts = await ethers.getSigners();
        
        const [owner] = await ethers.getSigners();
        tokenOwner = accounts[0];   // also specified in hardhat.config.js

        const CommunityBuilderContract = await ethers.getContract('CommunityBuilder', tokenOwner);
        const CommunityBuilderContract2 = await ethers.getContract('CommunityBuilder', accounts[1]);
        const CommunityTokenContract = await ethers.getContract('CommunityToken', tokenOwner);

        return { CommunityBuilderContract, CommunityTokenContract, CommunityBuilderContract2, owner };
    }

    describe("Deployment", function () {
        it("Fails if token address is not 0", async function () {
            const { CommunityBuilderContract } = await loadFixture(deployCommunityBuilderFixture);
            expect(await CommunityBuilderContract.communityToken.address).to.not.equal(0);
        });
    });

    describe("AddContributor", function () {
        it("Fails if contract token balance is insufficient", async function () {
            const { CommunityBuilderContract, CommunityTokenContract } = await loadFixture(deployCommunityBuilderFixture);
            await expect(CommunityBuilderContract.AddContributor("0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f")).to.be.revertedWith("Unable to add new contributor, insufficient contract token balance");
        });
    });

    describe("CreateEvent", function () {
        /*
        it("Should emit the EventAdded event when successful", async function () {
            const { CommunityBuilderContract, CommunityTokenContract } = await loadFixture(deployCommunityBuilderFixture);

            // transfer tokens to the contract & add a contributor
            await expect(CommunityTokenContract.transfer(CommunityBuilderContract.address, "100000000000000000000000"));
            await expect(CommunityBuilderContract.AddContributor(accounts[0].address));
            await expect(CommunityBuilderContract.CreateEvent(accounts[0].address, {eventTypeName: "test", eventTypeValue: "123"})).to.emit(CommunityBuilderContract, "EventAdded");
        });
        */
        it("Should return event_id 0 when successful", async function () {
            const { CommunityBuilderContract, CommunityTokenContract } = await loadFixture(deployCommunityBuilderFixture);

            // transfer tokens to the contract & add a contributor
            await expect(CommunityTokenContract.transfer(CommunityBuilderContract.address, "100000000000000000000000"));
            await expect(CommunityBuilderContract.AddContributor(accounts[0].address));
//            await expect(await CommunityBuilderContract.CreateEvent(accounts[0].address, {eventTypeName: "test", eventTypeValue: "123"})).to.equal(1);
            await CommunityBuilderContract.CreateEvent(accounts[0].address, {eventTypeName: "test", eventTypeValue: "123"});
//            const test = await CommunityBuilderContract.s_eventCount();

//            console.log("test="+test);


//            const s_eventCount = await expect(CommunityBuilderContract.CreateEvent(accounts[0].address, {eventTypeName: "test", eventTypeValue: "123"}));
//            console.log("s_eventCount="+CommunityBuilderContract.s_eventCount);
        });
    });

    describe("JoinEvent", function () {
        it("Should emit the VisitorJoinedEvent event when successful", async function () {
            const { CommunityBuilderContract, CommunityBuilderContract2, CommunityTokenContract } = await loadFixture(deployCommunityBuilderFixture);

            // transfer tokens to the contract, add a contributor, & add an event
            await expect(await CommunityTokenContract.transfer(CommunityBuilderContract.address, "100000000000000000000000"));
            await expect(await CommunityBuilderContract.AddContributor(accounts[0].address));
            await expect(await CommunityBuilderContract.CreateEvent(accounts[0].address, {eventTypeName: "test", eventTypeValue: "123"}));
            await expect(await CommunityBuilderContract2.JoinEvent(0)).to.emit(CommunityBuilderContract, "VisitorJoinedEvent");
        });
    });

});




