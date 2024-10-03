import {
  CollectProtocol as CollectProtocolEvent,
  OwnerChanged as OwnerChangedEvent,
  PoolCreated as PoolCreatedEvent,
  SetFeeProtocol as SetFeeProtocolEvent,
} from "../generated/MarginalV1LBFactory/MarginalV1LBFactory"
import {
  MarginalV1LBFactoryCollectProtocol,
  MarginalV1LBFactoryOwnerChanged,
  MarginalV1LBFactoryPoolCreated,
  MarginalV1LBFactorySetFeeProtocol,
  MarginalV1LBPool,
  Token,
} from "../generated/schema"

import {
  MarginalV1LBPool as MarginalV1LBPoolABI,
} from "../generated/MarginalV1LBPool/MarginalV1LBPool"
import { BI_18, ONE_BI, ZERO_BI } from "./utils/constants"
import { loadLBFactory } from "./utils/loaders"
import { fetchTokenDecimals, fetchTokenName, fetchTokenSymbol } from "./utils/token"
import { log } from "@graphprotocol/graph-ts"
import { MarginalV1LBPool as MarginalV1LBPoolTemplate } from "../generated/templates"

export function handleCollectProtocol(event: CollectProtocolEvent): void {
  // let entity = new MarginalV1LBFactoryCollectProtocol(
  //   event.transaction.hash.concatI32(event.logIndex.toI32()),
  // )
  // entity.sender = event.params.sender
  // entity.token = event.params.token
  // entity.recipient = event.params.recipient
  // entity.amount = event.params.amount

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()
}

export function handleOwnerChanged(event: OwnerChangedEvent): void {

  let factory = loadLBFactory(event.address.toHexString())

  factory.owner = event.params.newOwner.toHexString()

  factory.save()
}

export function handlePoolCreated(event: PoolCreatedEvent): void {

  log.info('On Pool Created', []);

  let factory = loadLBFactory(event.address.toHexString())
  factory.poolCount = factory.poolCount.plus(ONE_BI)

  let pool = new MarginalV1LBPool(event.params.pool.toHexString())
  let token0 = Token.load(event.params.token0.toHexString())
  let token1 = Token.load(event.params.token1.toHexString())

  if (token0 === null) {
    token0 = new Token(event.params.token0.toHexString());
    token0.address = event.params.token0.toHexString()
    token0.symbol = fetchTokenSymbol(event.params.token0);
    token0.name = fetchTokenName(event.params.token0);
    token0.decimals = fetchTokenDecimals(event.params.token0);
  }

  if (token1 === null) {
    token1 = new Token(event.params.token1.toHexString())
    token1.address = event.params.token1.toHexString()
    token1.symbol = fetchTokenSymbol(event.params.token1);
    token1.name = fetchTokenName(event.params.token1);
    token1.decimals = fetchTokenDecimals(event.params.token1);
  }

  // Constructor
  pool.factory = factory.id

  pool.token0 = token0.id
  pool.token1 = token1.id

  pool.tickLower = event.params.tickLower
  pool.tickUpper = event.params.tickUpper

  // TODO: Verify
  pool.sqrtPriceLowerX96 = MarginalV1LBPoolABI.bind(event.params.pool).sqrtPriceLowerX96()
  pool.sqrtPriceUpperX96 = MarginalV1LBPoolABI.bind(event.params.pool).sqrtPriceUpperX96()

  pool.supplier = event.params.supplier.toHexString();
  pool.blockTimestampInitialize = event.params.blockTimestampInitialize

  // State Variables
  pool.sqrtPriceX96 = ZERO_BI
  pool.totalPositions = ZERO_BI
  pool.liquidity = ZERO_BI
  pool.tick = 0
  pool.blockTimestamp = ZERO_BI
  pool.tickCumulative = ZERO_BI
  pool.feeProtocol = 0
  pool.finalized = false

  // Global Variables

  // TODO: Review
  pool.tokenPair = token0.symbol.concat('-').concat(token1.symbol)
  pool.decimals = BI_18
  pool.createdAtTimestamp = event.block.timestamp
  pool.createdAtBlockNumber = event.block.number
  pool.txCount = ZERO_BI
  pool.totalVolume = ZERO_BI;

  factory.save()
  // Start indexing pool
  MarginalV1LBPoolTemplate.create(event.params.pool)
  token0.save()
  token1.save()
  pool.save()
}

export function handleSetFeeProtocol(event: SetFeeProtocolEvent): void {

  let factory = loadLBFactory(event.address.toHexString())

  factory.feeProtocol = event.params.newFeeProtocol

  factory.save()

}
