// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import {GelatoRelayContext} from "@gelatonetwork/relay-context/contracts/GelatoRelayContext.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract SimpleContractUserPermit is GelatoRelayContext {
    uint256 public supply;
    ERC20Permit public token;
    uint256 public price;
    uint256 public myNumber;

    constructor(ERC20Permit _token, uint256 _price) {
        token = _token;
        price = _price;
    }

    function updateNumber(
        address to,
        uint256 amount,
        uint256 deadline,
        uint256 _number,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external onlyGelatoRelay {
        require(address(token) == _getFeeToken(), "Incorrect Fee Token");

        token.permit(to, address(this), amount, deadline, v, r, s);
        token.transferFrom(to, address(this), price);

        myNumber = _number;
        uint256 fee = _getFee();
        token.transferFrom(to, _getFeeCollector(), fee);
    }
}
