import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Adjust,
  Approval,
  Burn,
  CollectProtocol,
  Initialize,
  Liquidate,
  Mint,
  Open,
  SetFeeProtocol,
  Settle,
  Swap,
  Transfer
} from "../generated/MarginalV1Pool/MarginalV1Pool"

export function createAdjustEvent(
  owner: Address,
  id: BigInt,
  recipient: Address,
  marginAfter: BigInt
): Adjust {
  let adjustEvent = changetype<Adjust>(newMockEvent())

  adjustEvent.parameters = new Array()

  adjustEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  adjustEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  adjustEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  adjustEvent.parameters.push(
    new ethereum.EventParam(
      "marginAfter",
      ethereum.Value.fromUnsignedBigInt(marginAfter)
    )
  )

  return adjustEvent
}

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
  amount1: BigInt
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

  return burnEvent
}

export function createCollectProtocolEvent(
  sender: Address,
  recipient: Address,
  amount0: BigInt,
  amount1: BigInt
): CollectProtocol {
  let collectProtocolEvent = changetype<CollectProtocol>(newMockEvent())

  collectProtocolEvent.parameters = new Array()

  collectProtocolEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  collectProtocolEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  collectProtocolEvent.parameters.push(
    new ethereum.EventParam(
      "amount0",
      ethereum.Value.fromUnsignedBigInt(amount0)
    )
  )
  collectProtocolEvent.parameters.push(
    new ethereum.EventParam(
      "amount1",
      ethereum.Value.fromUnsignedBigInt(amount1)
    )
  )

  return collectProtocolEvent
}

export function createInitializeEvent(
  sqrtPriceX96: BigInt,
  tick: i32
): Initialize {
  let initializeEvent = changetype<Initialize>(newMockEvent())

  initializeEvent.parameters = new Array()

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

export function createLiquidateEvent(
  owner: Address,
  id: BigInt,
  recipient: Address,
  liquidityAfter: BigInt,
  sqrtPriceX96After: BigInt,
  rewards0: BigInt,
  rewards1: BigInt
): Liquidate {
  let liquidateEvent = changetype<Liquidate>(newMockEvent())

  liquidateEvent.parameters = new Array()

  liquidateEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  liquidateEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  liquidateEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  liquidateEvent.parameters.push(
    new ethereum.EventParam(
      "liquidityAfter",
      ethereum.Value.fromUnsignedBigInt(liquidityAfter)
    )
  )
  liquidateEvent.parameters.push(
    new ethereum.EventParam(
      "sqrtPriceX96After",
      ethereum.Value.fromUnsignedBigInt(sqrtPriceX96After)
    )
  )
  liquidateEvent.parameters.push(
    new ethereum.EventParam(
      "rewards0",
      ethereum.Value.fromUnsignedBigInt(rewards0)
    )
  )
  liquidateEvent.parameters.push(
    new ethereum.EventParam(
      "rewards1",
      ethereum.Value.fromUnsignedBigInt(rewards1)
    )
  )

  return liquidateEvent
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

export function createOpenEvent(
  sender: Address,
  owner: Address,
  id: BigInt,
  liquidityAfter: BigInt,
  sqrtPriceX96After: BigInt,
  margin: BigInt
): Open {
  let openEvent = changetype<Open>(newMockEvent())

  openEvent.parameters = new Array()

  openEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  openEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  openEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  openEvent.parameters.push(
    new ethereum.EventParam(
      "liquidityAfter",
      ethereum.Value.fromUnsignedBigInt(liquidityAfter)
    )
  )
  openEvent.parameters.push(
    new ethereum.EventParam(
      "sqrtPriceX96After",
      ethereum.Value.fromUnsignedBigInt(sqrtPriceX96After)
    )
  )
  openEvent.parameters.push(
    new ethereum.EventParam("margin", ethereum.Value.fromUnsignedBigInt(margin))
  )

  return openEvent
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

export function createSettleEvent(
  owner: Address,
  id: BigInt,
  recipient: Address,
  liquidityAfter: BigInt,
  sqrtPriceX96After: BigInt,
  amount0: BigInt,
  amount1: BigInt
): Settle {
  let settleEvent = changetype<Settle>(newMockEvent())

  settleEvent.parameters = new Array()

  settleEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  settleEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  settleEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  settleEvent.parameters.push(
    new ethereum.EventParam(
      "liquidityAfter",
      ethereum.Value.fromUnsignedBigInt(liquidityAfter)
    )
  )
  settleEvent.parameters.push(
    new ethereum.EventParam(
      "sqrtPriceX96After",
      ethereum.Value.fromUnsignedBigInt(sqrtPriceX96After)
    )
  )
  settleEvent.parameters.push(
    new ethereum.EventParam("amount0", ethereum.Value.fromSignedBigInt(amount0))
  )
  settleEvent.parameters.push(
    new ethereum.EventParam("amount1", ethereum.Value.fromSignedBigInt(amount1))
  )

  return settleEvent
}

export function createSwapEvent(
  sender: Address,
  recipient: Address,
  amount0: BigInt,
  amount1: BigInt,
  sqrtPriceX96: BigInt,
  liquidity: BigInt,
  tick: i32
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
