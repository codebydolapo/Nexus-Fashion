// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// A smart contract that accepts matic payments and emits an event
contract Nexus {
    // The owner of the contract
    address payable public owner;

    // The event that is emitted when a payment is received
    event PaymentReceived(address indexed sender, uint256 amount);

    mapping (address=> uint256) public payers;

    // The constructor that sets the owner of the contract
    constructor() {
        owner = payable(msg.sender);
    }

    // The fallback function that accepts matic payments
    receive() external payable {
        // Emit the event with the sender and the amount
        emit PaymentReceived(msg.sender, msg.value);
    }

    function pay(address _payer) payable public {
        emit PaymentReceived(msg.sender, msg.value);
        payers[_payer] = msg.value;
    }

    // A function that allows the owner to withdraw the balance
    function withdraw() public {
        // Only the owner can call this function
        require(msg.sender == owner, "Only the owner can withdraw");
        // Transfer the balance to the owner
        owner.transfer(address(this).balance);
    }
}
