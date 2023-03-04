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
    address[] private s_contributors;    // stored twice, suggest cleanup

    uint256 private s_eventCount;

    struct Event {
        address contributor;
        string eventType;
        uint256 eventValue;
    }

    mapping (address => Event[]) private s_EventsMap;

    mapping (uint256 => uint256 ) private s_EventVisitorCount;
    mapping (uint256 => mapping (uint256 => address)) private s_EventVisitors;

    Event[] private s_EventsArray;

    event EventAdded(uint256 indexed event_id, address indexed contributor, string event_type_name, uint event_type_value);
    event ContributorAdded(address indexed contributor);
    event ContributorPayout(address indexed contributor, uint256 payout_amount);
    event VisitorJoinedEvent(uint256 indexed event_id, address indexed visitor);

    constructor(address _tokenAddress) {
        require(address(_tokenAddress) != address(0),"Token Address cannot be address 0");  
        communityToken = CommunityToken(_tokenAddress);

//        s_communityTokenBalance = communityToken.balanceOf(address(this));
    }

    function addContributor(address _contributor) external onlyOwner {
        require (communityToken.balanceOf(address(this)) >= 1, "Unable to add new contributor, insufficient contract token balance");

        // adding a contributor givens them 1 token
        if (getTokenBalance(_contributor) == 0) {
            communityToken.transfer(_contributor, 1);
            s_contributors[s_contributorCount++] = _contributor;

            emit ContributorAdded(_contributor);
        }
    }

    function JoinEvent(uint _eventId) external {
        require (s_EventsMap[msg.sender][s_eventCount].contributor != _msgSender(), "Contributor cannot join their own event");
        s_EventVisitors[_eventId][s_EventVisitorCount[_eventId]++] = _msgSender();

        // transfer tokens here
        require (communityToken.balanceOf(address(this)) >= s_EventsArray[_eventId].eventValue, "Unable to join event, insufficient contract token balance");

        communityToken.transfer(s_EventsArray[_eventId].contributor, s_EventsArray[_eventId].eventValue);

        emit VisitorJoinedEvent(_eventId, _msgSender());
    }

    function getContributors() external view onlyOwner returns (address[] memory) 
    {
        return s_contributors;
    }

    function CreateEvent(CommunityEventTypes.eventType memory _eventType) external returns (uint256)
    {
        return CreateEvent(msg.sender, _eventType);
    }

// need to see if the onlyOwner modifier still happens when in the internal context of boing called
    function CreateEvent(address _contributor, CommunityEventTypes.eventType memory _eventType) public onlyOwner returns (uint256)
    {
        require(address(_msgSender()) != address(0),"Contributor Address cannot be address 0");  
        require(bytes(_eventType.eventTypeName).length > 0,"Empty string not allowed as event type");

        s_EventsMap[msg.sender][s_eventCount].contributor = _contributor;
        s_EventsMap[msg.sender][s_eventCount].eventType = _eventType.eventTypeName;
        s_EventsMap[msg.sender][s_eventCount].eventValue = _eventType.eventTypeValue;

        s_EventsArray.push(Event(
            _msgSender(), _eventType.eventTypeName, _eventType.eventTypeValue));

        emit EventAdded(s_eventCount, _msgSender(), _eventType.eventTypeName, _eventType.eventTypeValue);

        return (s_eventCount++-1);
    }

    function GetEvents() external view onlyOwner returns (Event[] memory) {
        return s_EventsArray;
    }

    function GetContributorEvents(address _contributor) external view returns (Event[] memory) {
        return s_EventsMap[_contributor];
    }

    function Payout() external {
        uint256 senderBalance = getTokenBalance(_msgSender());

        require (senderBalance > 1, "Balance Insufficient, more than 1 token is needed to call payout");

        communityToken.transferFrom(_msgSender(), address(this), senderBalance);

        emit ContributorPayout(_msgSender(), senderBalance);
    }

    function getTokenBalance(address _address) public view returns (uint256) {
        return communityToken.balanceOf(_address);
    }

}
