import { Position, Open, Settle, Adjust, Liquidate } from "../generated/schema"
import {
  Adjust as AdjustEvent,
  Liquidate as LiquidateEvent,
  Open as OpenEvent,
  Settle as SettleEvent,
} from "../generated/templates/MarginalV1Pool/MarginalV1Pool"
import { loadPool, loadTransaction, loadPosition } from "./utils/loaders"
import { ONE_BI } from "./utils/constants"

export function handleOpen(event: OpenEvent): void {
  let pool = loadPool(event, event.address)
  let transaction = loadTransaction(event)

  let sender = event.params.sender.toHexString()
  let positionId = event.params.id.toHexString()

  // Create unique id using pool and positionId
  let _positionId = pool.id.concat('-').concat(positionId)
  
  let position = new Position(_positionId) as Position

  position.owner = sender
  position.pool = pool.id
  position.margin = event.params.margin
  position.blockNumber = event.block.number
  position.timestamp = event.block.timestamp
  position.transaction = transaction.id
  position.isLiquidated = false
  position.isSettled = false
  position.isClosed = false

  let open = new Open(positionId) as Open

  open.transaction = transaction.id
  open.timestamp = transaction.timestamp
  open.pool = pool.id
  open.token0 = pool.token0
  open.token1 = pool.token1
  open.owner = event.params.owner
  open.sender = event.params.sender
  open.margin = event.params.margin

  pool.txCount = pool.txCount.plus(ONE_BI)

  pool.save()
  transaction.save()
  position.save()
  open.save()
}

export function handleAdjust(event: AdjustEvent): void {
  let positionId = event.params.id.toHexString()

  let transaction = loadTransaction(event)
  let pool = loadPool(event, event.address)

  let adjust = new Adjust(positionId) as Adjust

  adjust.transaction = transaction.id
  adjust.timestamp = transaction.timestamp
  adjust.pool = pool.id
  adjust.token0 = pool.token0
  adjust.token1 = pool.token1
  adjust.owner = event.params.owner
  adjust.recipient = event.params.recipient
  adjust.margin = event.params.marginAfter

  adjust.save()
} 

export function handleSettle(event: SettleEvent): void {
  let transaction = loadTransaction(event)
  let pool = loadPool(event, event.address)

  let positionId = event.params.id.toHexString()
  let _positionId = pool.id.concat('-').concat(positionId)

  let position = loadPosition(event, event.params.owner, pool, _positionId)

  let settle = new Settle(positionId) as Settle

  settle.transaction = transaction.id
  settle.timestamp = transaction.timestamp
  settle.pool = pool.id
  settle.token0 = pool.token0
  settle.token1 = pool.token1
  settle.owner = event.params.owner
  settle.recipient = event.params.recipient
  settle.amount0 = event.params.amount0
  settle.amount1 = event.params.amount1

  position.isSettled = true
  position.isClosed = true
  
  position.save()
  settle.save()
}

export function handleLiquidate(event: LiquidateEvent): void {
  let transaction = loadTransaction(event)
  let pool = loadPool(event, event.address)

  let positionId = event.params.id.toHexString()
  let _positionId = pool.id.concat('-').concat(positionId)

  let position = loadPosition(event, event.params.owner, pool, _positionId)

  let liquidate = new Liquidate(positionId) as Liquidate

  liquidate.transaction = transaction.id
  liquidate.timestamp = transaction.timestamp
  liquidate.pool = pool.id
  liquidate.token0 = pool.token0
  liquidate.token1 = pool.token1
  liquidate.owner = event.params.owner
  liquidate.recipient = event.params.recipient
  liquidate.rewards0 = event.params.rewards0
  liquidate.rewards1 = event.params.rewards1

  position.isLiquidated = true
  position.isClosed = true
  
  position.save()
  liquidate.save()
}