// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Imports
// ========================================================
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// Contract
// ========================================================
contract ZkMythicCards is ERC1155, Ownable, Pausable, ERC1155Burnable, ERC1155Supply {
    // Extending functionality
    using Strings for uint256;
    uint256 public randomNumber;


    /**
     * Main constructor seting the the baseURI
     */
    constructor(string memory newuri)
        ERC1155(newuri)
    {}

    /**
     * @dev Sets a new URI for all token types, by relying on the token type ID
     */
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    /**
     * @dev Triggers stopped state.
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev Returns to normal state.
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Creates random number based on number of loops to generate
     */
    function generateRandomNumber(uint256 loopCount) public {
        for (uint256 i = 0; i < loopCount; i++) {
            uint256 blockValue = uint256(blockhash(block.number - i));
            randomNumber = uint256(keccak256(abi.encodePacked(blockValue, randomNumber, i)));
        }
    }

    /**
     * @dev Creates `amount` tokens of token type `id`, and assigns them to `to`.
     */
    function mint(uint256 amount)
        public
    {
        for (uint i = 0; i < amount; i++) {
            generateRandomNumber(i);
            _mint(msg.sender, randomNumber % 4 + 1, 1, "");
        }
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning, as well as batched variants.
     */
    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    /**
     * @dev See {IERC1155MetadataURI-uri}.
     */
    function uri(uint256 _tokenId) override public view returns (string memory) {
        if(!exists(_tokenId)) {
            revert("URI: nonexistent token");
        }
        return string(abi.encodePacked(super.uri(_tokenId), Strings.toString(_tokenId), ".json"));
    }
}