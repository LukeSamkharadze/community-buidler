// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

  /**
   * @title ContractName
   * @dev ContractDescription
   * @custom:dev-run-script file_path
   */
contract CommunityEventTypes is Ownable {
    struct eventType {
        string eventTypeName;
        uint256 eventTypeValue;
    }

    eventType[] private s_eventTypes;

    constructor () {}
/*
["testname", 123]

    constructor (string[] memory _eventTypes)
    {
        for (uint8 i=0; i < _eventTypes.length; i++) 
            Add(s_eventTypes[i]);
    }
*/

    function Add(eventType memory _eventType) public onlyOwner {
        require(bytes(_eventType.eventTypeName).length > 0,"Empty string not allowed as an event type");
        require(s_eventTypes.length < 256, "Max of 256 event types allowed");

        eventType memory __eventType;
        __eventType.eventTypeName = _eventType.eventTypeName;
        __eventType.eventTypeValue = _eventType.eventTypeValue;

        s_eventTypes.push(__eventType);
    }

    function Get() external view returns (eventType[] memory) {
        return s_eventTypes;
    }

    function Flush() external onlyOwner {
        delete s_eventTypes;
    }
}
