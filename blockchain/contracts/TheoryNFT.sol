// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TheoryNFT is ERC721URIStorage, Ownable {
uint256 public tokenCounter;
constructor() ERC721("ConspiracyTheory", "THRY") {
    tokenCounter = 0;
}

function mintTheory(address recipient, string memory ipfsURI) public returns (uint256) {
    uint256 tokenId = tokenCounter;
    _safeMint(recipient, tokenId);
    _setTokenURI(tokenId, ipfsURI);
    tokenCounter += 1;
    return tokenId;
}
}