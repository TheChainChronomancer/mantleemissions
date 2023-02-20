// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    mapping(address => uint256[]) ownedTokens;

    constructor() ERC721("CO2 NFT", "CO2") {}

    function mintCO2savings(address player, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _tokenIds.increment();
        ownedTokens[player].push(newItemId);
        return newItemId;
    }

    function getTotalTokens() public view returns (uint256) {
        return _tokenIds.current();
    }

    function getTokensByOwner(address owner) public view returns (uint256[] memory) {
        return ownedTokens[owner];
    }
}