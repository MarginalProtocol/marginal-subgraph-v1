import {
  Mint as MintEvent,
  Ignite as IgniteEvent,
} from "../generated/MarginalV1NonfungiblePositionManager/MarginalV1NonfungiblePositionManager"
import { loadPool, loadTransaction, loadPosition } from "./utils/loaders"
import { MarginalV1NonfungiblePositionManager } from "../generated/MarginalV1NonfungiblePositionManager/MarginalV1NonfungiblePositionManager"
import { NFT_POSITION_MANAGER_ADDRESS } from "./utils/constants"
import { Position } from "../generated/schema"
import { Address } from "@graphprotocol/graph-ts"

export function handleMint(event: MintEvent): void {
  let transaction = loadTransaction(event)

  let positionManagerContract = MarginalV1NonfungiblePositionManager.bind(event.address)

  let tokenId = event.params.tokenId
  let position = new Position(tokenId.toHexString())

  let positionInfo = positionManagerContract.positions(tokenId)
  let poolAddress: Address = positionInfo.value0

  position.pool = poolAddress.toHexString()
  position.owner = event.params.recipient.toHexString()
  position.margin = event.params.margin
  position.blockNumber = event.block.number
  position.timestamp = event.block.timestamp
  position.transaction = transaction.id
  position.isLiquidated = false
  position.isSettled = false
  position.isClosed = false


  position.save()
  transaction.save()
}

export function handleIgnite(event: IgniteEvent): void {
  let transaction = loadTransaction(event)

  // let positionManagerContract = MarginalV1NonfungiblePositionManager.bind(event.address)
  
  let tokenId = event.params.tokenId

  // let positionInfo = positionManagerContract.positions(tokenId)
  // let poolAddress = positionInfo.value0.toString()

  let position = loadPosition(event, tokenId.toHexString(), null)

  position.isSettled = true
  position.isClosed = true
  position.owner = event.params.recipient.toHexString()

  position.save()
  transaction.save()
}