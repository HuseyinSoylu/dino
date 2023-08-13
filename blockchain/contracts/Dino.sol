// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HashedArticleStorage is ERC721, Ownable {
    mapping(uint256 => string) private articleHashes; // Changed to string
    mapping(address => bool) private hasPurchased;
    uint256 private articleCount;
    uint256 public publishingFee; // Fee in wei

    constructor(string memory name, string memory symbol, uint256 fee) ERC721(name, symbol) {
        publishingFee = fee;
    }

    function setPublishingFee(uint256 fee) public onlyOwner {
        publishingFee = fee;
    }

    function publishArticle(string memory articleHash) public payable { // Changed bytes32 to string
        require(msg.value >= publishingFee, "Insufficient payment");

        articleCount++;
        uint256 tokenId = articleCount;
        articleHashes[tokenId] = articleHash;
        _mint(msg.sender, tokenId);
    }

    function purchaseArticle(uint256 tokenId) public payable {
        require(!_exists(tokenId), "Article does not exist");
        require(!hasPurchased[msg.sender], "Already purchased");

        hasPurchased[msg.sender] = true;
        address owner = ownerOf(tokenId);
        require(msg.value >= publishingFee, "Insufficient payment");
        payable(owner).transfer(publishingFee);
        _safeTransfer(owner, msg.sender, tokenId, "");
    }

    function getArticleHash(uint256 tokenId) public view returns (string memory) { // Changed bytes32 to string
        require(_exists(tokenId), "Token does not exist");
        return articleHashes[tokenId];
    }

    function withdrawBalance() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    // Other functions...
}
