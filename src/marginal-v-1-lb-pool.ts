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
  MarginalV1LBPoolApproval,
  MarginalV1LBPoolBurn,
  MarginalV1LBPoolFinalize,
  MarginalV1LBPoolInitialize,
  MarginalV1LBPoolMint,
  MarginalV1LBPoolSwap,
  MarginalV1LBPoolTransfer,
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
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
  let entity = new Burn(
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
  let entity = new Finalize(
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
  let entity = new Initialize(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.liquidity = event.params.liquidity
  entity.sqrtPriceX96 = event.params.sqrtPriceX96
  entity.tick = event.params.tick

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMint(event: MintEvent): void {
  let entity = new Mint(
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
  let entity = new Swap(
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
  let entity = new Transfer(
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
