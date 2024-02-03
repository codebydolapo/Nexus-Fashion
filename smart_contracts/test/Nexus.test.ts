import { expect } from "chai"
import { deployments, ethers, getNamedAccounts } from "hardhat"


// Define the test suite
describe("nexus contract", async function () {
  // Declare some variables to store the contract instances and the accounts
  let Nexus: any;
  let nexus: any;
  let owner: any;
  let addr1: any;
  let addr2: any;
  let addrs: any;

  // Before each test, deploy a new instance of the contract and get the accounts
  beforeEach(async function () {
    console.log("hello")
    Nexus = await ethers.getContractFactory("Nexus");
    nexus = await Nexus.deploy();
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  });

  // Test the deployment and the initial state of the contract
  it("Should set the right owner and the initial balance", async function () {
    // Check that the owner is the deployer
    expect(await nexus.owner()).to.equal(owner.address);
    // Check that the initial balance is zero
    // expect(await nexus.balanceOf()).to.equal(0);
    expect(await ethers.provider.getBalance(nexus)).to.equal(0);
  });

  // Test the receive function and the PaymentReceived event
  it("Should receive payments and emit events", async function () {
    await nexus.connect(addr1).pay(addr1.address, { value: ethers.parseEther("1.0") })
    // Check that the contract balance increased

    expect(await ethers.provider.getBalance(nexus)).to.equal(ethers.parseEther("1.0"));

    expect(await nexus.connect(addr1).pay(addr1.address, { value: ethers.parseEther("0.5") }))
      .to.emit(nexus, "PaymentReceived")
      .withArgs(addr1.address, ethers.parseEther("0.5"))
  });

  // Test the withdraw function and the access control
  it("Should allow the owner to withdraw the balance", async function () {

    await nexus.connect(addr1).pay(addr1.address, { value: ethers.parseEther("1.0") })

    await nexus.connect(addr2).pay(addr2.address, { value: ethers.parseEther("2.0") })
    // Check that the contract balance is correct
    expect(await ethers.provider.getBalance(nexus)).to.equal(ethers.parseEther("3.0"));
    // Store the initial balance of the owner
    // const ownerBalance = await (ethers.provider.getBalance(owner));
    // Call the withdraw function from the owner account
    await nexus.connect(owner).withdraw();

    // Check that the contract balance is zero
    expect(await ethers.provider.getBalance(nexus)).to.equal(0);

    expect(await ethers.provider.getBalance(owner)).to.be.above(ethers.parseEther("1000"))


  });

  // Test the withdraw function and the access control
  it("Should revert if a non-owner tries to withdraw the balance", async function () {
    // Send some matic to the contract from addr1 and addr2
    await nexus.connect(addr1).pay(addr1.address, { value: ethers.parseEther("1.0") })

    await nexus.connect(addr2).pay(addr2.address, { value: ethers.parseEther("2.0") })
    // Check that the contract balance is correct
    expect(await ethers.provider.getBalance(nexus)).to.equal(ethers.parseEther("3.0"));
    // Try to call the withdraw function from addr1
    await expect(nexus.connect(addr1).withdraw()).to.be.revertedWith(
      "Only the owner can withdraw"
    );
    // Check that the contract balance did not change
    expect(await ethers.provider.getBalance(nexus)).to.equal(ethers.parseEther("3.0"));
  });
});
