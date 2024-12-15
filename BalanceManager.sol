// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract BalanceManager {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Permission Error");
        _;
    }

    mapping(address=>uint) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }

    function withdraw(uint amount) public {
        require((balances[msg.sender] >= amount), "Insufficient Balance");
        uint withdrawAmount;
        if (msg.sender == owner) {
            withdrawAmount = amount;
        } else {
            withdrawAmount = (amount/20)*19;
            balances[owner] += amount/20;
        }

        balances[msg.sender] -= amount;

        require(address(this).balance >= withdrawAmount, "Withdrawal failed; contract balance error");
        payable(msg.sender).transfer(withdrawAmount);
    } 
    
    function withdrawContract(uint256 amount) public onlyOwner {
        require(address(this).balance >= amount, "Insufficient Balance");
        payable(owner).transfer(amount);
    }

    function withdrawContractMax() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
