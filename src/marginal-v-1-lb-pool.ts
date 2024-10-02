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
import { ZERO_BI } from "./utils/constants"

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
  const position = loadLBPosition(pool, event.params.owner.toHexString())

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
  position.liquidity = position.liquidity.minus(event.params.liquidityDelta)

  pool.save()
  position.save()
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
  const position = loadLBPosition(pool, event.params.owner.toHexString())

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

  // TODO: check valid
  // pool.txCount = pool.txCount.plus(new BigInt(1))

  // Check valid or use sync
  // if(position.liquidity == ZERO_BI ){
  //   pool.totalPositions = pool.totalPositions.plus(new BigInt(1))
  // }

  // Position update
  position.liquidity = position.liquidity.plus(event.params.liquidityDelta)

  position.save()
  pool.save()
  mint.save()
}

export function handleSwap(event: SwapEvent): void {
  let pool = MarginalV1LBPool.load(event.address.toHexString())!

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

  pool.save()
  swap.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new MarginalV1LBPoolTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
