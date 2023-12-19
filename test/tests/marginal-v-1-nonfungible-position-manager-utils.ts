import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  Burn,
  Free,
  Grab,
  Lock,
  Mint,
  Transfer
} from "../generated/MarginalV1NonfungiblePositionManager/MarginalV1NonfungiblePositionManager"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createBurnEvent(
  tokenId: BigInt,
  amountIn: BigInt,
  amountOut: BigInt
): Burn {
  let burnEvent = changetype<Burn>(newMockEvent())

  burnEvent.parameters = new Array()

  burnEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  burnEvent.parameters.push(
    new ethereum.EventParam(
      "amountIn",
      ethereum.Value.fromUnsignedBigInt(amountIn)
    )
  )
  burnEvent.parameters.push(
    new ethereum.EventParam(
      "amountOut",
      ethereum.Value.fromUnsignedBigInt(amountOut)
    )
  )

  return burnEvent
}

export function createFreeEvent(tokenId: BigInt, marginAfter: BigInt): Free {
  let freeEvent = changetype<Free>(newMockEvent())

  freeEvent.parameters = new Array()

  freeEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  freeEvent.parameters.push(
    new ethereum.EventParam(
      "marginAfter",
      ethereum.Value.fromUnsignedBigInt(marginAfter)
    )
  )

  return freeEvent
}

export function createGrabEvent(tokenId: BigInt, rewards: BigInt): Grab {
  let grabEvent = changetype<Grab>(newMockEvent())

  grabEvent.parameters = new Array()

  grabEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  grabEvent.parameters.push(
    new ethereum.EventParam(
      "rewards",
      ethereum.Value.fromUnsignedBigInt(rewards)
    )
  )

  return grabEvent
}

export function createLockEvent(tokenId: BigInt, marginAfter: BigInt): Lock {
  let lockEvent = changetype<Lock>(newMockEvent())

  lockEvent.parameters = new Array()

  lockEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  lockEvent.parameters.push(
    new ethereum.EventParam(
      "marginAfter",
      ethereum.Value.fromUnsignedBigInt(marginAfter)
    )
  )

  return lockEvent
}

export function createMintEvent(
  tokenId: BigInt,
  size: BigInt,
  debt: BigInt
): Mint {
  let mintEvent = changetype<Mint>(newMockEvent())

  mintEvent.parameters = new Array()

  mintEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("size", ethereum.Value.fromUnsignedBigInt(size))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("debt", ethereum.Value.fromUnsignedBigInt(debt))
  )

  return mintEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
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
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
