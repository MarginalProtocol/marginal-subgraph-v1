import {
  LeverageEnabled as LeverageEnabledEvent,
  OwnerChanged as OwnerChangedEvent,
  PoolCreated as PoolCreatedEvent
} from "../generated/MarginalV1Factory/MarginalV1Factory"
import { LeverageEnabled, OwnerChanged, PoolCreated } from "../generated/schema"

export function handlePoolCreated(event: PoolCreatedEvent): void {
  let entity = new PoolCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token0 = event.params.token0
  entity.token1 = event.params.token1
  entity.maintenance = event.params.maintenance
  entity.oracle = event.params.oracle
  entity.pool = event.params.pool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLeverageEnabled(event: LeverageEnabledEvent): void {
  let entity = new LeverageEnabled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.maintenance = event.params.maintenance
  entity.leverage = event.params.leverage

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnerChanged(event: OwnerChangedEvent): void {
  let entity = new OwnerChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldOwner = event.params.oldOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

