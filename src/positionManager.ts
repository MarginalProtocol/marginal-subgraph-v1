import {
  Mint as MintEvent,
  Ignite as IgniteEvent,
  Lock as LockEvent,
  Free as FreeEvent,
} from "../generated/MarginalV1NonfungiblePositionManager/MarginalV1NonfungiblePositionManager"
import { loadTransaction } from "./utils/loaders"
import { MarginalV1NonfungiblePositionManager } from "../generated/MarginalV1NonfungiblePositionManager/MarginalV1NonfungiblePositionManager"
import { Position, TokenPositionMapping, Mint, Ignite, Lock, Free } from "../generated/schema"
import { loadPositionByTokenId } from "./utils/loaders"

export function handleMint(event: MintEvent): void {
  let tokenId = event.params.tokenId
  let positionId = event.params.positionId
  let transaction = loadTransaction(event)
  let positionManagerContract = MarginalV1NonfungiblePositionManager.bind(event.address)
  let positionInfo = positionManagerContract.positions(tokenId)
  let poolAddress = positionInfo.value0.toHexString()
  /**
   * Unique identifier for the position, consisting of the pool address and
   * positionId concatenated with a hyphen.
   */
  let id = poolAddress.concat('-').concat(positionId.toString())
  let position = new Position(id)
  let tokenPositionMap = new TokenPositionMapping(tokenId.toString())

  tokenPositionMap.tokenId = tokenId.toString()
  tokenPositionMap.positionId = positionId.toString()
  tokenPositionMap.poolAddress = positionInfo.value0.toHexString()

  position.tokenId = tokenId.toString()
  position.positionId = event.params.positionId.toString()
  position.pool = poolAddress
  position.owner = event.params.recipient.toHexString()
  position.initialMargin = event.params.margin
  position.margin = event.params.margin
  position.zeroForOne = positionInfo.value2
  position.blockNumber = event.block.number
  position.timestamp = event.block.timestamp
  position.transaction = transaction.id
  position.isLiquidated = false
  position.isSettled = false
  position.isClosed = false
  position.rewards = positionInfo.value9

  transaction.type = 'MINT'
  transaction.sender = event.transaction.from.toHexString()
  transaction.position = position.id

  // Create Mint event entity
  let mintEvent = new Mint(transaction.id)
  mintEvent.tokenId = event.params.tokenId
  mintEvent.sender = event.params.sender
  mintEvent.recipient = event.params.recipient
  mintEvent.positionId = event.params.positionId
  mintEvent.size = event.params.size
  mintEvent.debt = event.params.debt
  mintEvent.margin = event.params.margin
  mintEvent.fees = event.params.fees
  mintEvent.rewards = event.params.rewards
  mintEvent.transaction = transaction.id
  mintEvent.position = position.id
  
  position.save()
  transaction.save()
  tokenPositionMap.save()
  mintEvent.save()
}

export function handleIgnite(event: IgniteEvent): void {
  let tokenId = event.params.tokenId.toString()
  let position = loadPositionByTokenId(tokenId)
  let transaction = loadTransaction(event)

  if (position !== null) {
    position.marginAmountOut = event.params.amountOut
    position.save()

    transaction.type = 'IGNITE'
    transaction.sender = event.transaction.from.toHexString()
    transaction.position = position.id

    // Create Ignite event entity
    let igniteEvent = new Ignite(transaction.id)
    igniteEvent.tokenId = event.params.tokenId
    igniteEvent.sender = event.params.sender
    igniteEvent.recipient = event.params.recipient
    igniteEvent.amountOut = event.params.amountOut
    igniteEvent.rewards = event.params.rewards
    igniteEvent.transaction = transaction.id
    igniteEvent.position = position.id

    transaction.save()
    igniteEvent.save()
  }
}

export function handleLock(event: LockEvent): void {
  let tokenId = event.params.tokenId.toString()
  let position = loadPositionByTokenId(tokenId)
  let transaction = loadTransaction(event)

  if (position !== null) {
    position.margin = event.params.marginAfter
    position.save()

    transaction.type = 'LOCK'
    transaction.sender = event.transaction.from.toHexString()
    transaction.position = position.id

    // Create Lock event entity
    let lockEvent = new Lock(transaction.id)
    lockEvent.tokenId = event.params.tokenId
    lockEvent.sender = event.params.sender
    lockEvent.marginAfter = event.params.marginAfter
    lockEvent.transaction = transaction.id
    lockEvent.position = position.id

    transaction.save()
    lockEvent.save()
  }
}

export function handleFree(event: FreeEvent): void {
  let tokenId = event.params.tokenId.toString()
  let position = loadPositionByTokenId(tokenId)
  let transaction = loadTransaction(event)

  if (position !== null) {
    position.margin = event.params.marginAfter
    position.save()

    transaction.type = 'FREE'
    transaction.sender = event.transaction.from.toHexString()
    transaction.position = position.id

    // Create Free event entity
    let freeEvent = new Free(transaction.id)
    freeEvent.tokenId = event.params.tokenId
    freeEvent.sender = event.params.sender
    freeEvent.marginAfter = event.params.marginAfter
    freeEvent.transaction = transaction.id
    freeEvent.position = position.id

    transaction.save()
    freeEvent.save()
  }
}