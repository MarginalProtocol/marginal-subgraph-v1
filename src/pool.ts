import {
  Adjust as AdjustEvent,
  Approval as ApprovalEvent,
  Burn as BurnEvent,
  CollectProtocol as CollectProtocolEvent,
  Initialize as InitializeEvent,
  Liquidate as LiquidateEvent,
  Mint as MintEvent,
  Open as OpenEvent,
  SetFeeProtocol as SetFeeProtocolEvent,
  Settle as SettleEvent,
  Swap as SwapEvent,
  Transfer as TransferEvent
} from "../generated/templates/MarginalV1Pool/MarginalV1Pool"
import {
  Adjust,
  Approval,
  Burn,
  CollectProtocol,
  Initialize,
  Liquidate,
  Mint,
  Open,
  SetFeeProtocol,
  Settle,
  Swap,
  Transfer
} from "../generated/schema"

export function handleAdjust(event: AdjustEvent): void {
  let entity = new Adjust(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.MarginalV1Pool_id = event.params.id
  entity.recipient = event.params.recipient
  entity.marginAfter = event.params.marginAfter

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCollectProtocol(event: CollectProtocolEvent): void {
  let entity = new CollectProtocol(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.recipient = event.params.recipient
  entity.amount0 = event.params.amount0
  entity.amount1 = event.params.amount1

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialize(event: InitializeEvent): void {
  let entity = new Initialize(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sqrtPriceX96 = event.params.sqrtPriceX96
  entity.tick = event.params.tick

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLiquidate(event: LiquidateEvent): void {
  let entity = new Liquidate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.MarginalV1Pool_id = event.params.id
  entity.recipient = event.params.recipient
  entity.liquidityAfter = event.params.liquidityAfter
  entity.sqrtPriceX96After = event.params.sqrtPriceX96After
  entity.rewards0 = event.params.rewards0
  entity.rewards1 = event.params.rewards1

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOpen(event: OpenEvent): void {
  let entity = new Open(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.owner = event.params.owner
  entity.MarginalV1Pool_id = event.params.id
  entity.liquidityAfter = event.params.liquidityAfter
  entity.sqrtPriceX96After = event.params.sqrtPriceX96After
  entity.margin = event.params.margin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetFeeProtocol(event: SetFeeProtocolEvent): void {
  let entity = new SetFeeProtocol(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldFeeProtocol = event.params.oldFeeProtocol
  entity.newFeeProtocol = event.params.newFeeProtocol

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSettle(event: SettleEvent): void {
  let entity = new Settle(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.MarginalV1Pool_id = event.params.id
  entity.recipient = event.params.recipient
  entity.liquidityAfter = event.params.liquidityAfter
  entity.sqrtPriceX96After = event.params.sqrtPriceX96After
  entity.amount0 = event.params.amount0
  entity.amount1 = event.params.amount1

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSwap(event: SwapEvent): void {
  let entity = new Swap(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.recipient = event.params.recipient
  entity.amount0 = event.params.amount0
  entity.amount1 = event.params.amount1
  entity.sqrtPriceX96 = event.params.sqrtPriceX96
  entity.liquidity = event.params.liquidity
  entity.tick = event.params.tick

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

