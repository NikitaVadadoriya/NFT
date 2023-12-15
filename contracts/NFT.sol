// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage, Ownable
{
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    struct Royalty 
    {
        address recipient;
        uint96 value;
    }
     mapping(uint256 => Royalty) private _royalties;
    constructor() ERC721("Photography of Nature", "PHN") {}
    
    function mintNFT(address recipient, string memory tokenURI)
    public
    onlyOwner
    returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
    
    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);
        _resetTokenRoyalty(tokenId);
    }
    
    function burnNFT(uint256 tokenId) public onlyOwner {
        _burn(tokenId);
    }
    
   function mintNFTWithRoyalty(
        address recipient,
        string memory tokenURI,
        address royaltyReceiver,
        uint96 feeNumerator
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = mintNFT(recipient, tokenURI);
        _setTokenRoyalty(tokenId, royaltyReceiver, feeNumerator);
        return tokenId;
    }

    function _resetTokenRoyalty(uint256 tokenId) internal 
    {
        delete _royalties[tokenId];
    }

    function _setTokenRoyalty(uint256 tokenId, address royaltyReceiver, uint96 feeNumerator) internal 
    {
        require(feeNumerator <= 100, "Invalid feeNumerator");
        _royalties[tokenId] = Royalty(royaltyReceiver, feeNumerator);
    }
}