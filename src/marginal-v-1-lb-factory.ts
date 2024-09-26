import {
  CollectProtocol as CollectProtocolEvent,
  OwnerChanged as OwnerChangedEvent,
  PoolCreated as PoolCreatedEvent,
  SetFeeProtocol as SetFeeProtocolEvent,
} from "../generated/MarginalV1LBFactory/MarginalV1LBFactory"
import {
  MarginalV1LBFactoryCollectProtocol,
  MarginalV1LBFactoryOwnerChanged,
  MarginalV1LBFactoryPoolCreated,
  MarginalV1LBFactorySetFeeProtocol,
} from "../generated/schema"

export function handleCollectProtocol(event: CollectProtocolEvent): void {
  let entity = new MarginalV1LBFactoryCollectProtocol(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.sender = event.params.sender
  entity.token = event.params.token
  entity.recipient = event.params.recipient
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnerChanged(event: OwnerChangedEvent): void {
  let entity = new MarginalV1LBFactoryOwnerChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.oldOwner = event.params.oldOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePoolCreated(event: PoolCreatedEvent): void {
  let entity = new MarginalV1LBFactoryPoolCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.token0 = event.params.token0
  entity.token1 = event.params.token1
  entity.tickLower = event.params.tickLower
  entity.tickUpper = event.params.tickUpper
  entity.supplier = event.params.supplier
  entity.blockTimestampInitialize = event.params.blockTimestampInitialize
  entity.pool = event.params.pool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetFeeProtocol(event: SetFeeProtocolEvent): void {
  let entity = new MarginalV1LBFactorySetFeeProtocol(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.oldFeeProtocol = event.params.oldFeeProtocol
  entity.newFeeProtocol = event.params.newFeeProtocol

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
