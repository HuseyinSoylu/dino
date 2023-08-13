// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HashedArticleStorage is ERC721, Ownable {
    mapping(uint256 => string) private articleHashes;
    mapping(address => bool) private hasPurchased;
    mapping(uint256 => uint256) private articlePrices; // Add mapping for article prices
    uint256 private articleCount;
    uint256 public publishingFee; // Fee in wei

    constructor(string memory name, string memory symbol, uint256 fee) ERC721(name, symbol) {
        publishingFee = fee;
    }

    function setPublishingFee(uint256 fee) public onlyOwner {
        publishingFee = fee;
    }

    function publishArticle(string memory articleHash, uint256 price) public payable {
        require(msg.value >= publishingFee, "Insufficient payment");

        articleCount++;
        uint256 tokenId = articleCount;
        articleHashes[tokenId] = articleHash;
        _mint(msg.sender, tokenId);

        // Set article price
        articlePrices[tokenId] = price;
    }

    function purchaseArticle(uint256 tokenId) public payable {
        require(!_exists(tokenId), "Article does not exist");
        require(!hasPurchased[msg.sender], "Already purchased");

        hasPurchased[msg.sender] = true;
        address owner = ownerOf(tokenId);
        require(msg.value >= articlePrices[tokenId], "Insufficient payment"); // Use article price for payment check
        payable(owner).transfer(articlePrices[tokenId]);
        _safeTransfer(owner, msg.sender, tokenId, "");
    }

    function getArticleHash(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return articleHashes[tokenId];
    }

    function getLatestArticleNumber() public view returns (uint256) {
        return articleCount;
    }

    function withdrawBalance() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    // Other functions...
}
