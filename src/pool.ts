import {
  Adjust as AdjustEvent,
  Liquidate as LiquidateEvent,
  Settle as SettleEvent,
} from "../generated/templates/MarginalV1Pool/MarginalV1Pool"
import { loadPool, loadPoolPosition } from "./utils/loaders"
import {  ZERO_BI } from "./utils/constants"

export function handleAdjust(event: AdjustEvent): void {
  let pool = loadPool(event, event.address)
  let positionId = event.params.id.toString()
  let position = loadPoolPosition(event, positionId, pool.address.toHexString())

  position.margin = event.params.marginAfter

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