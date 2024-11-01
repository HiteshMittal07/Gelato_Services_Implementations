// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleContract {
    uint256 public myNumber;

    constructor(uint256 _number) {
        myNumber = _number;
    }

    function updateNumber(uint256 _number) public {
        myNumber = _number;
    }

    function getNumber() public view returns (uint256) {
        return myNumber;
    }
}
