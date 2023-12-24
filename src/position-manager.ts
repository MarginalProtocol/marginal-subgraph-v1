import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Burn as BurnEvent,
  Free as FreeEvent,
  Grab as GrabEvent,
  Lock as LockEvent,
  Mint as MintEvent,
  Transfer as TransferEvent
} from "../generated/MarginalV1NonfungiblePositionManager/MarginalV1NonfungiblePositionManager"
import {
  Approval,
  Burn,
  Free,
  Grab,
  Lock,
  Mint,
  Transfer
} from "../generated/schema"


export function handleFree(event: FreeEvent): void {
  let entity = new Free(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.marginAfter = event.params.marginAfter

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGrab(event: GrabEvent): void {
  let entity = new Grab(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.rewards = event.params.rewards

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLock(event: LockEvent): void {
  let entity = new Lock(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.marginAfter = event.params.marginAfter

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
