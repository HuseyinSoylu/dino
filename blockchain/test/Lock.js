const { expect } = require("chai");

describe("HashedArticleStorage", function () {
  let hashedArticleStorage;
  let owner;
  let user1;
  let user2;

  beforeEach(async () => {
    const HashedArticleStorage = await ethers.getContractFactory("HashedArticleStorage");
    hashedArticleStorage = await HashedArticleStorage.deploy("HashedArticleStorage", "HASH", ethers.utils.parseEther("0.01"));
    await hashedArticleStorage.deployed();

    [owner, user1, user2] = await ethers.getSigners();
  });

  it("should deploy and set publishing fee", async function () {
    const publishingFee = await hashedArticleStorage.publishingFee();
    expect(publishingFee).to.equal(ethers.utils.parseEther("0.01"));
  });

  it("should publish and purchase an article", async function () {
    await hashedArticleStorage.connect(user1).publishArticle("0x123");
    await hashedArticleStorage.connect(user2).publishArticle("0x456");

    await hashedArticleStorage.connect(user2).purchaseArticle(1, { value: ethers.utils.parseEther("0.01") });

    const articleHash = await hashedArticleStorage.getArticleHash(1);
    expect(articleHash).to.equal("0x123");

    const user2BalanceBefore = await ethers.provider.getBalance(user2.address);
    await hashedArticleStorage.connect(user2).purchaseArticle(2, { value: ethers.utils.parseEther("0.01") });
    const user2BalanceAfter = await ethers.provider.getBalance(user2.address);

    expect(user2BalanceAfter).to.be.lt(user2BalanceBefore);
  });

  it("should not allow double purchase", async function () {
    await hashedArticleStorage.connect(user1).publishArticle("0x123");
    await hashedArticleStorage.connect(user2).publishArticle("0x456");

    await hashedArticleStorage.connect(user2).purchaseArticle(1, { value: ethers.utils.parseEther("0.01") });
    await expect(hashedArticleStorage.connect(user2).purchaseArticle(1, { value: ethers.utils.parseEther("0.01") })).to.be.revertedWith("Already purchased");
  });

  it("should withdraw balance", async function () {
    await hashedArticleStorage.connect(user1).publishArticle("0x123");
    await hashedArticleStorage.connect(user2).publishArticle("0x456");

    await hashedArticleStorage.connect(user2).purchaseArticle(1, { value: ethers.utils.parseEther("0.01") });
    await hashedArticleStorage.connect(user2).purchaseArticle(2, { value: ethers.utils.parseEther("0.01") });

    const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
    await hashedArticleStorage.connect(owner).withdrawBalance();
    const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);

    expect(ownerBalanceAfter).to.be.gt(ownerBalanceBefore);
  });
});
