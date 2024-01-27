import {
  Mint as MintEvent,
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

  const positionInfo = positionManagerContract.positions(tokenId)
  let poolAddress: Address = positionInfo[0]

  position.pool = positionInfo[0]
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