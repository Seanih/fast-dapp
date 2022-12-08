// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract AddWords {
    string[] public wordsArray;
    address public owner;

    event WordAdded(address indexed _user, string _addedWord, string _message);

    constructor(string memory _firstWord) {
        wordsArray.push(_firstWord);

        emit WordAdded(msg.sender, _firstWord, "the first word was added");
    }

    function addWord(string memory _word, string calldata _message)
        public
        returns (bool)
    {
        wordsArray.push(_word);

        emit WordAdded(msg.sender, _word, _message);

        return true;
    }

    function getWordsArray() external view returns (string[] memory) {
        return wordsArray;
    }
}
