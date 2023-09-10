// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SimpleVoting {
    uint public counter = 0;
    address public admin;

    struct Ballot {
        string question;
        string[] options;
        bool isEnabled;
    }

    mapping(uint => Ballot) private _ballots;
    mapping(uint => mapping(uint => uint)) private _tally;
    mapping(uint => mapping(address => bool)) public hasVoted;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    function createBallot(
        string memory question_,
        string[] memory options_
    ) external onlyAdmin {
        require(options_.length >= 2, "Provide at minimum two options");
        _ballots[counter] = Ballot(question_, options_, false);
        counter++;
    }

    function setVotingStatus(uint ballotIndex_, bool status) external onlyAdmin {
        _ballots[ballotIndex_].isEnabled = status;
    }

    function getBallotByIndex(uint index_) external view returns (Ballot memory ballot) {
        ballot = _ballots[index_];
    }

    function cast(uint ballotIndex_, uint optionIndex_) external {
        require(!hasVoted[ballotIndex_][msg.sender], "Address already casted a vote for ballot");
        Ballot memory ballot = _ballots[ballotIndex_];
        require(ballot.isEnabled, "Voting is not enabled for this ballot");
        _tally[ballotIndex_][optionIndex_]++;
        hasVoted[ballotIndex_][msg.sender] = true;
    }

    function getTally(uint ballotIndex_, uint optionIndex_) external view returns (uint) {
        return _tally[ballotIndex_][optionIndex_];
    }

    function results(uint ballotIndex_) external view returns (uint[] memory) {
        Ballot memory ballot = _ballots[ballotIndex_];
        uint len = ballot.options.length;
        uint[] memory result = new uint[](len);
        for (uint i = 0; i < len; i++) {
            result[i] = _tally[ballotIndex_][i];
        }
        return result;
    }

    function winners(uint ballotIndex_) external view returns (bool[] memory) {
        Ballot memory ballot = _ballots[ballotIndex_];
        uint len = ballot.options.length;
        uint[] memory result = new uint[](len);
        uint max;
        for (uint i = 0; i < len; i++) {
            result[i] = _tally[ballotIndex_][i];
            if (result[i] > max) {
                max = result[i];
            }
        }
        bool[] memory winner = new bool[](len);
        for (uint i = 0; i < len; i++) {
            if (result[i] == max) {
                winner[i] = true;
            }
        }
        return winner;
    }
}
