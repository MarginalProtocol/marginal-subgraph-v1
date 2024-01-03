import { Position, Open } from "../generated/schema"
import {
  Adjust as AdjustEvent,
  Liquidate as LiquidateEvent,
  Open as OpenEvent,
  Settle as SettleEvent,
} from "../generated/templates/MarginalV1Pool/MarginalV1Pool"
import { loadPool, loadTransaction } from "./utils/loaders"
import { ONE_BI } from "./utils/constants"

export function handleOpen(event: OpenEvent): void {
  let pool = loadPool(event, event.address)
  let transaction = loadTransaction(event)

  let sender = event.params.sender.toHexString()
  let positionId = event.params.id.toHexString()

  let position = new Position(positionId) as Position

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

export function handleSettle(event: SettleEvent): void {
  
}