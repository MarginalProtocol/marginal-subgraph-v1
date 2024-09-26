import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  Burn,
  Finalize,
  Initialize,
  Mint,
  Swap,
  Transfer
} from "../generated/MarginalV1LBPool/MarginalV1LBPool"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createBurnEvent(
  owner: Address,
  recipient: Address,
  liquidityDelta: BigInt,
  amount0: BigInt,
  amount1: BigInt,
  fees0: BigInt,
  fees1: BigInt
): Burn {
  let burnEvent = changetype<Burn>(newMockEvent())

  burnEvent.parameters = new Array()

  burnEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  burnEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  burnEvent.parameters.push(
    new ethereum.EventParam(
      "liquidityDelta",
      ethereum.Value.fromUnsignedBigInt(liquidityDelta)
    )
  )
  burnEvent.parameters.push(
    new ethereum.EventParam(
      "amount0",
      ethereum.Value.fromUnsignedBigInt(amount0)
    )
  )
  burnEvent.parameters.push(
    new ethereum.EventParam(
      "amount1",
      ethereum.Value.fromUnsignedBigInt(amount1)
    )
  )
  burnEvent.parameters.push(
    new ethereum.EventParam("fees0", ethereum.Value.fromUnsignedBigInt(fees0))
  )
  burnEvent.parameters.push(
    new ethereum.EventParam("fees1", ethereum.Value.fromUnsignedBigInt(fees1))
  )

  return burnEvent
}

export function createFinalizeEvent(
  liquidityDelta: BigInt,
  sqrtPriceX96: BigInt,
  tick: i32
): Finalize {
  let finalizeEvent = changetype<Finalize>(newMockEvent())

  finalizeEvent.parameters = new Array()

  finalizeEvent.parameters.push(
    new ethereum.EventParam(
      "liquidityDelta",
      ethereum.Value.fromUnsignedBigInt(liquidityDelta)
    )
  )
  finalizeEvent.parameters.push(
    new ethereum.EventParam(
      "sqrtPriceX96",
      ethereum.Value.fromUnsignedBigInt(sqrtPriceX96)
    )
  )
  finalizeEvent.parameters.push(
    new ethereum.EventParam("tick", ethereum.Value.fromI32(tick))
  )

  return finalizeEvent
}

export function createInitializeEvent(
  liquidity: BigInt,
  sqrtPriceX96: BigInt,
  tick: i32
): Initialize {
  let initializeEvent = changetype<Initialize>(newMockEvent())

  initializeEvent.parameters = new Array()

  initializeEvent.parameters.push(
    new ethereum.EventParam(
      "liquidity",
      ethereum.Value.fromUnsignedBigInt(liquidity)
    )
  )
  initializeEvent.parameters.push(
    new ethereum.EventParam(
      "sqrtPriceX96",
      ethereum.Value.fromUnsignedBigInt(sqrtPriceX96)
    )
  )
  initializeEvent.parameters.push(
    new ethereum.EventParam("tick", ethereum.Value.fromI32(tick))
  )

  return initializeEvent
}

export function createMintEvent(
  sender: Address,
  owner: Address,
  liquidityDelta: BigInt,
  amount0: BigInt,
  amount1: BigInt
): Mint {
  let mintEvent = changetype<Mint>(newMockEvent())

  mintEvent.parameters = new Array()

  mintEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam(
      "liquidityDelta",
      ethereum.Value.fromUnsignedBigInt(liquidityDelta)
    )
  )
  mintEvent.parameters.push(
    new ethereum.EventParam(
      "amount0",
      ethereum.Value.fromUnsignedBigInt(amount0)
    )
  )
  mintEvent.parameters.push(
    new ethereum.EventParam(
      "amount1",
      ethereum.Value.fromUnsignedBigInt(amount1)
    )
  )

  return mintEvent
}

export function createSwapEvent(
  sender: Address,
  recipient: Address,
  amount0: BigInt,
  amount1: BigInt,
  sqrtPriceX96: BigInt,
  liquidity: BigInt,
  tick: i32,
  finalized: boolean
): Swap {
  let swapEvent = changetype<Swap>(newMockEvent())

  swapEvent.parameters = new Array()

  swapEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("amount0", ethereum.Value.fromSignedBigInt(amount0))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("amount1", ethereum.Value.fromSignedBigInt(amount1))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam(
      "sqrtPriceX96",
      ethereum.Value.fromUnsignedBigInt(sqrtPriceX96)
    )
  )
  swapEvent.parameters.push(
    new ethereum.EventParam(
      "liquidity",
      ethereum.Value.fromUnsignedBigInt(liquidity)
    )
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("tick", ethereum.Value.fromI32(tick))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("finalized", ethereum.Value.fromBoolean(finalized))
  )

  return swapEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}
