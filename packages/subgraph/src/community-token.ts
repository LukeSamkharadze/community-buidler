import {
  ContributorAdded as ContributorAddedEvent,
  ContributorPayout as ContributorPayoutEvent,
  EventAdded as EventAddedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  Unpaused as UnpausedEvent,
  VisitorJoinedEvent as VisitorJoinedEventEvent
} from "../generated/CommunityToken/CommunityToken"
import {
  ContributorAdded,
  ContributorPayout,
  EventAdded,
  OwnershipTransferred,
  Paused,
  Unpaused,
  VisitorJoinedEvent
} from "../generated/schema"

export function handleContributorAdded(event: ContributorAddedEvent): void {
  let entity = new ContributorAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.contributor = event.params.contributor

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleContributorPayout(event: ContributorPayoutEvent): void {
  let entity = new ContributorPayout(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.contributor = event.params.contributor
  entity.payout_amount = event.params.payout_amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEventAdded(event: EventAddedEvent): void {
  let entity = new EventAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.event_id = event.params.event_id
  entity.contributor = event.params.contributor
  entity.event_type_name = event.params.event_type_name
  entity.event_type_value = event.params.event_type_value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVisitorJoinedEvent(event: VisitorJoinedEventEvent): void {
  let entity = new VisitorJoinedEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.event_id = event.params.event_id
  entity.visitor = event.params.visitor

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
