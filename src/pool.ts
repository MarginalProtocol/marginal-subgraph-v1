import {
  Open as OpenEvent,
  Adjust as AdjustEvent,
  Liquidate as LiquidateEvent,
  Settle as SettleEvent,
  Swap as SwapEvent,
} from "../generated/templates/MarginalV1Pool/MarginalV1Pool"
import { loadPool, loadPoolPosition, loadTransaction } from "./utils/loaders"
import { Swap } from "../generated/schema"
import { ZERO_BI } from './constants'
import { BigInt } from '@graphprotocol/graph-ts'

export function handleOpen(event: OpenEvent): void {
  let pool = loadPool(event, event.address)
  let positionId = event.params.id.toString()
  let position = loadPoolPosition(event, positionId, pool.address.toHexString())

  position.initialSqrtPriceX96After = event.params.sqrtPriceX96After

  position.save()
}

export function handleAdjust(event: AdjustEvent): void {
  let pool = loadPool(event, event.address)
  let positionId = event.params.id.toString()
  let position = loadPoolPosition(event, positionId, pool.address.toHexString())

  // position.margin = event.params.marginAfter

  position.save()
} 

export function handleSettle(event: SettleEvent): void {
  let pool = loadPool(event, event.address)
  let positionId = event.params.id.toString()
  let position = loadPoolPosition(event, positionId, pool.address.toHexString())

  position.pool = pool.id
  position.isLiquidated = false
  position.isSettled = true
  position.isClosed = true

  position.save()
}

export function handleLiquidate(event: LiquidateEvent): void {
  let pool = loadPool(event, event.address)
  let positionId = event.params.id.toString()
  let position = loadPoolPosition(event, positionId, pool.address.toHexString())
  
  position.marginAmountOut = ZERO_BI
  position.pool = pool.id
  position.isLiquidated = true
  position.isClosed = true

  position.save()
}

export function handleSwap(event: SwapEvent): void {
  let pool = loadPool(event, event.address)
  let transaction = loadTransaction(event)
  
  // Create Swap entity
  let swap = new Swap(transaction.id)
  swap.sender = event.params.sender
  swap.recipient = event.params.recipient
  swap.amount0 = event.params.amount0
  swap.amount1 = event.params.amount1
  swap.sqrtPriceX96 = event.params.sqrtPriceX96
  swap.liquidity = event.params.liquidity
  swap.tick = BigInt.fromI32(event.params.tick)
  swap.transaction = transaction.id
  swap.pool = pool.id

  // Update transaction
  transaction.type = 'SWAP'
  transaction.sender = event.transaction.from.toHexString()

  transaction.save()
  swap.save()
}