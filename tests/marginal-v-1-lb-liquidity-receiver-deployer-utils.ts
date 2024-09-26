import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes } from "@graphprotocol/graph-ts"
import { ReceiverDeployed } from "../generated/MarginalV1LBLiquidityReceiverDeployer/MarginalV1LBLiquidityReceiverDeployer"

export function createReceiverDeployedEvent(
  pool: Address,
  data: Bytes,
  receiver: Address
): ReceiverDeployed {
  let receiverDeployedEvent = changetype<ReceiverDeployed>(newMockEvent())

  receiverDeployedEvent.parameters = new Array()

  receiverDeployedEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )
  receiverDeployedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  receiverDeployedEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )

  return receiverDeployedEvent
}
