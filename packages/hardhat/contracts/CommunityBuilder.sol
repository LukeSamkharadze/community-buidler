// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./CommunityToken.sol";
import "./CommunityEventTypes.sol";

/**
 * @title CommunityBuilder
 * @dev Contract for Community Buidler functionality.  May need to be broken n2 multiple contracts.
 * @custom:dev-run-script file_path
*/

// need to check for reentry

contract CommunityBuilder is Pausable, Ownable {
    CommunityToken public immutable communityToken;
    
    uint256 private s_contributorCount;
    address[] private s_contributors; 

    uint256 private s_eventCount;

    struct Event {
        address contributor;
        string eventType;
        uint256 eventValue;
    }

    mapping (uint256 => uint256 ) public s_EventVisitorCount;   // cchange back to private
    mapping (uint256 => mapping (uint256 => address)) public s_EventVisitors; // cchange back to private

    Event[] private s_EventsArray;

    event EventAdded(uint256 indexed event_id, address indexed contributor, string event_type_name, uint event_type_value);
    event ContributorAdded(address indexed contributor);
    event ContributorPayout(address indexed contributor, uint256 payout_amount);
    event VisitorJoinedEvent(uint256 indexed event_id, address indexed visitor);

    constructor(address _tokenAddress) {
        require(address(_tokenAddress) != address(0),"Token Address cannot be address 0");  
        communityToken = CommunityToken(_tokenAddress);
    }

    function AddContributor(address _contributor) external onlyOwner {
        uint256 balance = GetTokenBalance(address(this));
        require (balance >= 1,  "Unable to add new contributor, insufficient contract token balance");

        // adding a contributor givens them 1 token
        if (GetTokenBalance(_contributor) == 0) {
            communityToken.transfer(_contributor, 1);
            s_contributors.push(_contributor);
            s_contributorCount++;

            emit ContributorAdded(_contributor);
        }
    }

    function JoinEvent(uint _eventId) external {
        require (s_EventsArray[_eventId].contributor != _msgSender(), "Contributor cannot join their own event");
        
        s_EventVisitors[_eventId][s_EventVisitorCount[_eventId]++] = _msgSender();

        // transfer tokens here
        require (communityToken.balanceOf(address(this)) >= s_EventsArray[_eventId].eventValue, "Unable to join event, insufficient contract token balance");

        communityToken.transfer(s_EventsArray[_eventId].contributor, s_EventsArray[_eventId].eventValue);

        emit VisitorJoinedEvent(_eventId, _msgSender());
    }

    function GetContributors() external view onlyOwner returns (address[] memory) 
    {
        return s_contributors;
    }

    function ContributorCreateEvent(CommunityEventTypes.eventType memory _eventType) external returns (uint256)
    {
        return CreateEvent(msg.sender, _eventType);
    }

// need to see if the onlyOwner modifier still happens when in the internal context of boing called
    function CreateEvent(address _contributor, CommunityEventTypes.eventType memory _eventType) public onlyOwner returns (uint256)
    {
        require(address(_msgSender()) != address(0),"Contributor Address cannot be address 0");  
        require(bytes(_eventType.eventTypeName).length > 0,"Empty string not allowed as event type");

        s_EventsArray.push(Event(
            _contributor, _eventType.eventTypeName, _eventType.eventTypeValue));

        emit EventAdded(s_eventCount, _contributor, _eventType.eventTypeName, _eventType.eventTypeValue);

        return s_eventCount++;
    }

    function GetEvents() external view onlyOwner returns (Event[] memory) {
        return s_EventsArray;
    }

    function Payout() external {
        uint256 senderBalance = GetTokenBalance(_msgSender());

        require (senderBalance > 1, "Balance Insufficient, more than 1 token is needed to call payout");

        communityToken.transferFrom(_msgSender(), address(this), senderBalance);

        emit ContributorPayout(_msgSender(), senderBalance);
    }

    function GetTokenBalance(address _address) public view returns (uint256) {
        return communityToken.balanceOf(_address);
    }
}
