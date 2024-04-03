import { Position, Open, Settle, Adjust, Liquidate } from "../generated/schema"
import {
  Adjust as AdjustEvent,
  Liquidate as LiquidateEvent,
  Open as OpenEvent,
  Settle as SettleEvent,
} from "../generated/templates/MarginalV1Pool/MarginalV1Pool"
import { loadPool, loadTransaction, loadPosition, loadPoolPosition } from "./utils/loaders"
import { ONE_BI, ZERO_BI } from "./utils/constants"

export function handleOpen(event: OpenEvent): void {
  // let pool = loadPool(event, event.address)
  // let transaction = loadTransaction(event)

  // let sender = event.params.sender.toHexString()
  // let positionId = event.params.id.toHexString()
  // let owner = event.params.owner.toHexString()
  
  // // Create unique id using pool and positionId
  // let _positionId = pool.id.concat('-').concat(positionId)
  
  // let position = new Position(_positionId) as Position
  // position.owner = owner
  // position.pool = pool.id
  // position.margin = event.params.margin
  // position.blockNumber = event.block.number
  // position.timestamp = event.block.timestamp
  // position.transaction = transaction.id
  // position.isLiquidated = false
  // position.isSettled = false
  // position.isClosed = false

  // let open = new Open(positionId) as Open
  // open.transaction = transaction.id
  // open.timestamp = transaction.timestamp
  // open.pool = pool.id
  // open.token0 = pool.token0
  // open.token1 = pool.token1
  // open.owner = event.params.owner
  // open.sender = event.params.sender
  // open.margin = event.params.margin

  // pool.txCount = pool.txCount.plus(ONE_BI)

  // pool.save()
  // transaction.save()
  // position.save()
  // open.save()
}

export function handleAdjust(event: AdjustEvent): void {
  let pool = loadPool(event, event.address)

  let positionId = event.params.id.toString()

  let position = loadPoolPosition(event, positionId, pool.address.toHexString())
  position.margin = event.params.marginAfter

  position.save()
} 

export function handleSettle(event: SettleEvent): void {
  // let transaction = loadTransaction(event)
  let pool = loadPool(event, event.address)

  let positionId = event.params.id.toString()

  let position = loadPoolPosition(event, positionId, pool.address.toHexString())
  position.pool = pool.id
  position.isLiquidated = false
  position.isSettled = true
  position.isClosed = true

  position.save()
  // transaction.save()
}

export function handleLiquidate(event: LiquidateEvent): void {
  // let transaction = loadTransaction(event)
  let pool = loadPool(event, event.address)

  let positionId = event.params.id.toString()

  let position = loadPoolPosition(event, positionId, pool.address.toHexString())
  position.marginAmountOut = ZERO_BI
  position.pool = pool.id
  position.isLiquidated = true
  position.isClosed = true

  position.save()
  // transaction.save()
}