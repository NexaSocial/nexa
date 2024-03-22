// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {ERC721URIStorage} from "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract NEXA is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    uint256 public gas = 0.1 ether;
    uint256 public price = 0.1 ether;

    mapping(address => bool) public validatedInstitutions;

    constructor() ERC721("NEXA", "NX") Ownable(msg.sender) {}

    function safeMint(address to, string memory uri) external payable {
        //require(msg.value >= gas + price, "Insufficient ether sent");

        //Retirar esta validação apenas para na rede testnet
        //require(validatedInstitutions[msg.sender], "Only validated institutions can mint");

        uint256 tokenId = totalSupply() + 1;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function getURIsFromJsonFiles(address owner) external view returns (string[] memory) {
        require(owner != address(0), "Owner address must not be empty");
        uint256 tokenCount = balanceOf(owner);
        string[] memory uris = new string[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(owner, i);
            uris[i] = tokenURI(tokenId);
        }
        return uris;
    }

    //Owner functions ------------------------------------------------------------------

    function validateInstitution(address institutionAddress) external onlyOwner {
        validatedInstitutions[institutionAddress] = true;
    }

    function removeInstitution(address institutionAddress) external onlyOwner {
        delete validatedInstitutions[institutionAddress];
    }

    function setGas(uint256 _gas) external onlyOwner {
        gas = _gas;
    }

    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    //Other functions ------------------------------------------------------------

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
