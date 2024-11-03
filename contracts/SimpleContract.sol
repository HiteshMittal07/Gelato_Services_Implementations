// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {ERC2771Context} from "@gelatonetwork/relay-context/contracts/vendor/ERC2771Context.sol";

contract SimpleContract is ERC2771Context {
    uint256 public myNumber;

    constructor(
        uint256 _number,
        address _trustedForwader
    ) ERC2771Context(_trustedForwader) {
        myNumber = _number;
    }

    function updateNumber(uint256 _number) public {
        myNumber = _number;
    }

    function getNumber() public view returns (uint256) {
        return myNumber;
    }
}
