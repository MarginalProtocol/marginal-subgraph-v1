import {
  Adjust,
  Liquidate,
  Open,
  Settle,
} from "../generated/templates/MarginalV1Pool/MarginalV1Pool"
import { loadPool } from "./utils/loaders"

export function handleOpen(event: Open): void {
  let pool = loadPool(event, event.address)
  let sender = event.params.sender

  
}