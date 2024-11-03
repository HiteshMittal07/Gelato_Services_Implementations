// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {GelatoRelayContextERC2771} from "@gelatonetwork/relay-context/contracts/GelatoRelayContextERC2771.sol";

contract SimpleContractSyncFee is GelatoRelayContextERC2771 {
    uint256 public myNumber;

    constructor(uint256 _number) {
        myNumber = _number;
    }

    function updateNumber(uint256 _number) public {
        myNumber = _number;
        _transferRelayFee();
    }

    function getNumber() public view returns (uint256) {
        return myNumber;
    }
}
