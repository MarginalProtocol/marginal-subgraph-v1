import {
  Approval as ApprovalEvent,
  Burn as BurnEvent,
  Finalize as FinalizeEvent,
  Initialize as InitializeEvent,
  Mint as MintEvent,
  Swap as SwapEvent,
  Transfer as TransferEvent,
} from "../generated/MarginalV1LBPool/MarginalV1LBPool"
import {
  MarginalV1LBPool,
  MarginalV1LBPoolApproval,
  MarginalV1LBPoolBurn,
  MarginalV1LBPoolFinalize,
  MarginalV1LBPoolMint,
  MarginalV1LBPoolSwap,
  MarginalV1LBPoolTransfer,
} from "../generated/schema"
import { ADDRESS_ZERO, ZERO_BI } from "./utils/constants"

import {
  MarginalV1LBPool as MarginalV1LBPoolABI,
} from "../generated/MarginalV1LBPool/MarginalV1LBPool"

import {
  MarginalV1LBFactory as MarginalV1LBFactoryABI,
} from "../generated/MarginalV1LBFactory/MarginalV1LBFactory"
import { loadLBPosition } from "./utils/loaders"
import { BigInt } from "@graphprotocol/graph-ts"
import { syncStateLB } from "./utils/helpers"
// import { loadLBTransaction } from "./utils/loaders"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new MarginalV1LBPoolApproval(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBurn(event: BurnEvent): void {

  let pool = MarginalV1LBPool.load(event.address.toHexString())!
  // const position = loadLBPosition(pool, event.params.owner.toHexString())

  let burn = new MarginalV1LBPoolBurn(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  burn.owner = event.params.owner
  // Link
  burn.pool = pool.id
  burn.recipient = event.params.recipient
  burn.liquidityDelta = event.params.liquidityDelta
  burn.amount0 = event.params.amount0
  burn.amount1 = event.params.amount1
  burn.fees0 = event.params.fees0
  burn.fees1 = event.params.fees1

  burn.blockNumber = event.block.number
  burn.blockTimestamp = event.block.timestamp
  burn.transactionHash = event.transaction.hash

  // Pool update
  pool = syncStateLB(pool)

  // TODO: check valid
  // pool.txCount = pool.txCount.plus(new BigInt(1))

  // Position update

  // position.save()
  pool.save()
  burn.save()
}

export function handleFinalize(event: FinalizeEvent): void {
  let entity = new MarginalV1LBPoolFinalize(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.liquidityDelta = event.params.liquidityDelta
  entity.sqrtPriceX96 = event.params.sqrtPriceX96
  entity.tick = event.params.tick

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialize(event: InitializeEvent): void {

  let pool = MarginalV1LBPool.load(event.address.toHexString())!

  pool = syncStateLB(pool)

  pool.sqrtPriceInitializeX96 = event.params.sqrtPriceX96

  let _sqrtPriceUpperX96 = MarginalV1LBPoolABI.bind(event.address).sqrtPriceUpperX96()
  let _sqrtPriceLowerX96 = MarginalV1LBPoolABI.bind(event.address).sqrtPriceLowerX96()

  pool.sqrtPriceFinalizeX96 = event.params.sqrtPriceX96 == _sqrtPriceLowerX96 ? _sqrtPriceUpperX96 : _sqrtPriceLowerX96

  pool.save()
}

export function handleMint(event: MintEvent): void {

  let pool = MarginalV1LBPool.load(event.address.toHexString())!
  // const position = loadLBPosition(pool, event.params.owner.toHexString())

  let mint = new MarginalV1LBPoolMint(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  mint.sender = event.params.sender
  // Link
  mint.pool = pool.id
  mint.owner = event.params.owner
  mint.liquidityDelta = event.params.liquidityDelta
  mint.amount0 = event.params.amount0
  mint.amount1 = event.params.amount1

  mint.blockNumber = event.block.number
  mint.blockTimestamp = event.block.timestamp
  mint.transactionHash = event.transaction.hash

  // Pool update
  pool = syncStateLB(pool)

  // The launch token index is the index of the token that has a non-zero balance
  pool.launchTokenIndex = event.params.amount0.gt(ZERO_BI) ? 0 : 1

  // TODO: check valid
  // pool.txCount = pool.txCount.plus(new BigInt(1))

  // Check valid or use sync
  // if(position.liquidity == ZERO_BI ){
  //   pool.totalPositions = pool.totalPositions.plus(new BigInt(1))
  // }

  // Position update

  // position.save()
  pool.save()
  mint.save()
}

export function handleSwap(event: SwapEvent): void {
  let pool = MarginalV1LBPool.load(event.address.toHexString())!
  const position = loadLBPosition(pool, event.params.recipient.toHexString())

  pool = syncStateLB(pool)

  let swap = new MarginalV1LBPoolSwap(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  swap.sender = event.params.sender
  // Link
  swap.pool = pool.id
  swap.recipient = event.params.recipient
  swap.amount0 = event.params.amount0
  swap.amount1 = event.params.amount1
  swap.sqrtPriceX96 = event.params.sqrtPriceX96
  swap.liquidity = event.params.liquidity
  swap.tick = event.params.tick
  swap.finalized = event.params.finalized

  swap.blockNumber = event.block.number
  swap.blockTimestamp = event.block.timestamp
  swap.transactionHash = event.transaction.hash

  // Position update
  // Depending on the launchTokenIndex, we need to update the position using the amount0 or amount1
  // The amount can be negative, so we need to use plus but make sure we don't go below zero

  const _sharesAmount = pool.launchTokenIndex == 0 ? event.params.amount0 : event.params.amount1

  // If sharesAmount is negative this means the user is buying from the pool
  if(_sharesAmount.lt(ZERO_BI)){
    position.shares = position.shares.plus(_sharesAmount.abs())
  } else {
    // If sharesAmount is positive this means the user is selling to the pool
    // We need to make sure we don't underflow
    if(position.shares.lt(_sharesAmount)){
      position.shares = ZERO_BI
    } else {
      position.shares = position.shares.minus(_sharesAmount)
    }
  }

  position.save()
  pool.save()
  swap.save()
}

export function handleTransfer(event: TransferEvent): void {
  let pool = MarginalV1LBPool.load(event.address.toHexString())!

  // Check if from is not zero address
  // if(event.params.from.toHexString() != ADDRESS_ZERO){
  //   const positionFrom = loadLBPosition(pool, event.params.from.toHexString())
  //   // Check we have enough shares. If not, set to zero
  //   if (positionFrom.shares.ge(event.params.value)) {
  //     positionFrom.shares = positionFrom.shares.minus(event.params.value)
  //   } else {
  //     positionFrom.shares = ZERO_BI
  //   }
  //   positionFrom.save()
  // }

  // // Check if to is not zero address
  // if(event.params.to.toHexString() != ADDRESS_ZERO){
  //   const positionTo = loadLBPosition(pool, event.params.to.toHexString())
  //   positionTo.shares = positionTo.shares.plus(event.params.value)
  //   positionTo.save()
  // }
}
