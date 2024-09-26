import { ReceiverDeployed as ReceiverDeployedEvent } from "../generated/MarginalV1LBLiquidityReceiverDeployer/MarginalV1LBLiquidityReceiverDeployer"
import { ReceiverDeployed } from "../generated/schema"

export function handleReceiverDeployed(event: ReceiverDeployedEvent): void {
  let entity = new ReceiverDeployed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.pool = event.params.pool
  entity.data = event.params.data
  entity.receiver = event.params.receiver

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
