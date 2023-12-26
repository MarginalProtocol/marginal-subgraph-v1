import { Position } from "../generated/schema"
import {
  Adjust,
  Liquidate,
  Open,
  Settle,
} from "../generated/templates/MarginalV1Pool/MarginalV1Pool"
import { loadPool, loadTransaction } from "./utils/loaders"
import { ONE_BI } from "./utils/constants"

export function handleOpen(event: Open): void {
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

  pool.txCount = pool.txCount.plus(ONE_BI)
  
  pool.save()
  transaction.save()
  position.save()
}