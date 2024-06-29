import {
  OwnerChanged,
  PoolCreated,
} from "../generated/MarginalV1Factory/MarginalV1Factory";
import { MarginalV1Pool } from "./../generated/templates/MarginalV1Pool/MarginalV1Pool";
import { MarginalV1Pool as PoolTemplate } from './../generated/templates'
import { Pool, Token } from "../generated/schema";
import {
  FACTORY_ADDRESS,
  ZERO_BI,
  ONE_BI,
} from "./utils/constants";
import {
  fetchTokenDecimals,
  fetchTokenName,
  fetchTokenSymbol,
} from "./utils/token";
import { BigInt } from "@graphprotocol/graph-ts";
import { loadFactory } from "./utils/loaders";

export function handlePoolCreated(event: PoolCreated): void {
  let factory = loadFactory(FACTORY_ADDRESS)
  factory.poolCount = factory.poolCount.plus(ONE_BI);

  let poolContract = MarginalV1Pool.bind(event.params.pool)
  let pool = new Pool(event.params.pool.toHexString()) as Pool;
  let token0 = Token.load(event.params.token0.toHexString());
  let token1 = Token.load(event.params.token1.toHexString());


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

  pool.tokenPair = token0.symbol.concat('-').concat(token1.symbol)
  pool.address = event.params.pool
  pool.decimals = BigInt.fromI32(poolContract.decimals() as i32)
  pool.factory = factory.id
  pool.token0 = token0.id;
  pool.token1 = token1.id;
  pool.maintenance = BigInt.fromI32(event.params.maintenance as i32);
  pool.oracle = event.params.oracle.toHexString();
  pool.createdAtTimestamp = event.block.timestamp;
  pool.createdAtBlockNumber = event.block.number;
  pool.txCount = ZERO_BI;
  pool.fee = BigInt.fromI32(poolContract.fee() as i32)
  pool.rewardPremium = BigInt.fromI32(poolContract.rewardPremium() as i32)
  pool.liquidityLocked = poolContract.liquidityLocked()
  
  factory.save()
  pool.save()
  token0.save()
  token1.save()

  PoolTemplate.create(event.params.pool)
}

export function handleOwnerChanged(event: OwnerChanged): void {
  let factory = loadFactory(FACTORY_ADDRESS)

  factory.owner = event.params.newOwner.toHexString()

  factory.save()
}
