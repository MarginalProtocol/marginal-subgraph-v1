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
  MarginalV1LBPoolInitialize,
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
  let entity = new MarginalV1LBPoolBurn(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.recipient = event.params.recipient
  entity.liquidityDelta = event.params.liquidityDelta
  entity.amount0 = event.params.amount0
  entity.amount1 = event.params.amount1
  entity.fees0 = event.params.fees0
  entity.fees1 = event.params.fees1

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
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

  const pool = MarginalV1LBPool.load(event.address.toHexString())!

  pool.sqrtPriceX96 = event.params.sqrtPriceX96
  pool.liquidity = ZERO_BI
  pool.totalPositions = ZERO_BI
  pool.tick = event.params.tick
  pool.blockTimestamp = event.block.timestamp
  pool.tickCumulative = ZERO_BI
  pool.feeProtocol = MarginalV1LBFactoryABI.bind(MarginalV1LBPoolABI.bind(event.address).factory()).feeProtocol()
  pool.finalized = false

  pool.sqrtPriceInitializeX96 = event.params.sqrtPriceX96

  let _sqrtPriceUpperX96 = MarginalV1LBPoolABI.bind(event.address).sqrtPriceUpperX96()
  let _sqrtPriceLowerX96 = MarginalV1LBPoolABI.bind(event.address).sqrtPriceLowerX96()

  pool.sqrtPriceFinalizeX96 = event.params.sqrtPriceX96 == _sqrtPriceLowerX96 ? _sqrtPriceUpperX96 : _sqrtPriceLowerX96

  // let entity = new MarginalV1LBPoolInitialize(
  //   event.transaction.hash.concatI32(event.logIndex.toI32()),
  // )
  // entity.liquidity = event.params.liquidity
  // entity.sqrtPriceX96 = event.params.sqrtPriceX96
  // entity.tick = event.params.tick

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  pool.save()
}

export function handleMint(event: MintEvent): void {
  let entity = new MarginalV1LBPoolMint(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.sender = event.params.sender
  entity.owner = event.params.owner
  entity.liquidityDelta = event.params.liquidityDelta
  entity.amount0 = event.params.amount0
  entity.amount1 = event.params.amount1

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSwap(event: SwapEvent): void {
  let entity = new MarginalV1LBPoolSwap(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.sender = event.params.sender
  entity.recipient = event.params.recipient
  entity.amount0 = event.params.amount0
  entity.amount1 = event.params.amount1
  entity.sqrtPriceX96 = event.params.sqrtPriceX96
  entity.liquidity = event.params.liquidity
  entity.tick = event.params.tick
  entity.finalized = event.params.finalized

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
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
