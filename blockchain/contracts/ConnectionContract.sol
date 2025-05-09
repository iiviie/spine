// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ConnectionContract {
enum ConnectionType { SUPPORTS, CONTRADICTS }

struct Connection {
    uint256 fromTokenId;
    uint256 toTokenId;
    ConnectionType connectionType;
    address creator;
    uint256 votes;
}

Connection[] public connections;

function createConnection(
    uint256 fromTokenId,
    uint256 toTokenId,
    ConnectionType connectionType
) public {
    connections.push(Connection({
        fromTokenId: fromTokenId,
        toTokenId: toTokenId,
        connectionType: connectionType,
        creator: msg.sender,
        votes: 0
    }));
}

function getAllConnections() public view returns (Connection[] memory) {
    return connections;
}

}