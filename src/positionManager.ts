import {
  Mint as MintEvent,
  Ignite as IgniteEvent,
} from "../generated/MarginalV1NonfungiblePositionManager/MarginalV1NonfungiblePositionManager"
import { loadTransaction } from "./utils/loaders"
import { MarginalV1NonfungiblePositionManager } from "../generated/MarginalV1NonfungiblePositionManager/MarginalV1NonfungiblePositionManager"
import { Position, TokenPositionMapping } from "../generated/schema"
import { loadPositionByTokenId } from "./utils/loaders"

export function handleMint(event: MintEvent): void {
  let tokenId = event.params.tokenId 
  let positionId = event.params.positionId
  let transaction = loadTransaction(event)
  let positionManagerContract = MarginalV1NonfungiblePositionManager.bind(event.address)
  let positionInfo = positionManagerContract.positions(tokenId)
  let poolAddress = positionInfo.value0.toHexString()
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

  position.save()
  transaction.save()
  tokenPositionMap.save()
}

export function handleIgnite(event: IgniteEvent): void {
  let tokenId = event.params.tokenId.toString()
  let position = loadPositionByTokenId(tokenId)

  if (position !== null) {
    position.marginAmountOut = event.params.amountOut
    position.save()
  }
}