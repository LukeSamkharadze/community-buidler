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

//    constructor () {}
/*
["Webinar Hosting", 25]
["Webinar - Guest Speaker", 25]
["Webinar - Code-along", 25]
["In Person Workshop - Guest Speaker", 50]
["In Person Workshop - Host", 50]

    constructor (string[] memory _eventTypes)
    {
        for (uint8 i=0; i < _eventTypes.length; i++) 
            Add(s_eventTypes[i]);
    }
*/
    event EventTypeAdded(string type_name, uint256 type_value);

    function Add(eventType memory _eventType) public onlyOwner {
        require(bytes(_eventType.eventTypeName).length > 0,"Empty string not allowed as an event type");
        require(s_eventTypes.length < 256, "Max of 256 event types allowed");

        eventType memory __eventType;
        __eventType.eventTypeName = _eventType.eventTypeName;
        __eventType.eventTypeValue = _eventType.eventTypeValue;

        s_eventTypes.push(__eventType);

        emit EventTypeAdded(_eventType.eventTypeName, _eventType.eventTypeValue);
    }

    function Get() external view returns (eventType[] memory) {
        return s_eventTypes;
    }

    function Flush() external onlyOwner {
        delete s_eventTypes;
    }
}
