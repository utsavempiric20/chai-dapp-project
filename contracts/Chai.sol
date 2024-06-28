// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Chai {
    struct Memo {
        string name;
        string message;
        uint256 timestamp;
        address from;
    }

    Memo[] memo;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyChai(string memory name, string memory message) public payable {
        require(msg.value > 0, "Pay money more than 0.");
        owner.transfer(msg.value);
        memo.push(
            Memo({
                name: name,
                message: message,
                timestamp: block.timestamp,
                from: msg.sender
            })
        );
    }

    function getMemo() public view returns (Memo[] memory) {
        return memo;
    }
}
