import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CollectProtocol,
  OwnerChanged,
  PoolCreated,
  SetFeeProtocol
} from "../generated/MarginalV1LBFactory/MarginalV1LBFactory"

export function createCollectProtocolEvent(
  sender: Address,
  token: Address,
  recipient: Address,
  amount: BigInt
): CollectProtocol {
  let collectProtocolEvent = changetype<CollectProtocol>(newMockEvent())

  collectProtocolEvent.parameters = new Array()

  collectProtocolEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  collectProtocolEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  collectProtocolEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  collectProtocolEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return collectProtocolEvent
}

export function createOwnerChangedEvent(
  oldOwner: Address,
  newOwner: Address
): OwnerChanged {
  let ownerChangedEvent = changetype<OwnerChanged>(newMockEvent())

  ownerChangedEvent.parameters = new Array()

  ownerChangedEvent.parameters.push(
    new ethereum.EventParam("oldOwner", ethereum.Value.fromAddress(oldOwner))
  )
  ownerChangedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownerChangedEvent
}

export function createPoolCreatedEvent(
  token0: Address,
  token1: Address,
  tickLower: i32,
  tickUpper: i32,
  supplier: Address,
  blockTimestampInitialize: BigInt,
  pool: Address
): PoolCreated {
  let poolCreatedEvent = changetype<PoolCreated>(newMockEvent())

  poolCreatedEvent.parameters = new Array()

  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("token0", ethereum.Value.fromAddress(token0))
  )
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("token1", ethereum.Value.fromAddress(token1))
  )
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("tickLower", ethereum.Value.fromI32(tickLower))
  )
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("tickUpper", ethereum.Value.fromI32(tickUpper))
  )
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("supplier", ethereum.Value.fromAddress(supplier))
  )
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "blockTimestampInitialize",
      ethereum.Value.fromUnsignedBigInt(blockTimestampInitialize)
    )
  )
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )

  return poolCreatedEvent
}

export function createSetFeeProtocolEvent(
  oldFeeProtocol: i32,
  newFeeProtocol: i32
): SetFeeProtocol {
  let setFeeProtocolEvent = changetype<SetFeeProtocol>(newMockEvent())

  setFeeProtocolEvent.parameters = new Array()

  setFeeProtocolEvent.parameters.push(
    new ethereum.EventParam(
      "oldFeeProtocol",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(oldFeeProtocol))
    )
  )
  setFeeProtocolEvent.parameters.push(
    new ethereum.EventParam(
      "newFeeProtocol",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(newFeeProtocol))
    )
  )

  return setFeeProtocolEvent
}
