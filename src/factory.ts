import {
  LeverageEnabled,
  OwnerChanged,
  PoolCreated,
} from "../generated/MarginalV1Factory/MarginalV1Factory";
import { MarginalV1Pool } from "./../generated/templates/MarginalV1Pool/MarginalV1Pool";
import { MarginalV1Pool as PoolTemplate } from './../generated/templates'
import { Factory, Pool, Token } from "../generated/schema";
import {
  FACTORY_ADDRESS,
  ZERO_BI,
  ONE_BI,
  factoryContract,
} from "./utils/constants";
import {
  fetchTokenDecimals,
  fetchTokenName,
  fetchTokenSymbol,
} from "./utils/token";
import { BigInt, BigDecimal } from "@graphprotocol/graph-ts";
import { loadFactory } from "./utils/loaders";

export function handlePoolCreated(event: PoolCreated): void {
  // load factory
  let factory = loadFactory(FACTORY_ADDRESS)

  factory.poolCount = factory.poolCount.plus(ONE_BI);

  // bind Pool contract to query 
  let poolContract = MarginalV1Pool.bind(event.params.pool)

  let pool = new Pool(event.params.pool.toHexString()) as Pool;
  let token0 = Token.load(event.params.token0.toHexString());
  let token1 = Token.load(event.params.token1.toHexString());

  // fetch token info if null
  if (token0 === null) {
    token0 = new Token(event.params.token0.toHexString());
    token0.symbol = fetchTokenSymbol(event.params.token0);
    token0.name = fetchTokenName(event.params.token0);
    token0.decimals = fetchTokenDecimals(event.params.token0);
  }

  if (token1 === null) {
    token1 = new Token(event.params.token1.toHexString());
    token1.symbol = fetchTokenSymbol(event.params.token1);
    token1.name = fetchTokenName(event.params.token1);
    token1.decimals = fetchTokenDecimals(event.params.token1);
  }

  pool.token0 = token0.id;
  pool.token1 = token1.id;
  pool.maintenance = event.params.maintenance;
  pool.oracle = event.params.oracle.toHexString();
  pool.createdAtTimestamp = event.block.timestamp;
  pool.createdAtBlockNumber = event.block.number;
  pool.txCount = ZERO_BI;
  pool.fee = BigInt.fromI32(poolContract.fee)
  pool.reward = BigInt.fromI32(poolContract.reward)
  pool.liquidityLocked = poolContract.liquidityLocked()
  
  factory.save()
  pool.save()
  token0.save()
  token1.save()
  // create the tracked contract based on the template
  PoolTemplate.create(event.params.pool)
}

// export function handleLeverageEnabled(event: LeverageEnabledEvent): void {
//   let entity = new LeverageEnabled(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.maintenance = event.params.maintenance
//   entity.leverage = event.params.leverage

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

export function handleOwnerChanged(event: OwnerChanged): void {
  let factory = loadFactory(FACTORY_ADDRESS)

  // assign new owner
  factory.owner = event.params.newOwner.toHexString()

  factory.save()
}
