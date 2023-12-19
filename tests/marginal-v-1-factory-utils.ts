import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  LeverageEnabled,
  OwnerChanged,
  PoolCreated
} from "../generated/MarginalV1Factory/MarginalV1Factory"

export function createLeverageEnabledEvent(
  maintenance: i32,
  leverage: BigInt
): LeverageEnabled {
  let leverageEnabledEvent = changetype<LeverageEnabled>(newMockEvent())

  leverageEnabledEvent.parameters = new Array()

  leverageEnabledEvent.parameters.push(
    new ethereum.EventParam(
      "maintenance",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(maintenance))
    )
  )
  leverageEnabledEvent.parameters.push(
    new ethereum.EventParam(
      "leverage",
      ethereum.Value.fromUnsignedBigInt(leverage)
    )
  )

  return leverageEnabledEvent
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
  maintenance: i32,
  oracle: Address,
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
    new ethereum.EventParam(
      "maintenance",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(maintenance))
    )
  )
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("oracle", ethereum.Value.fromAddress(oracle))
  )
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )

  return poolCreatedEvent
}
