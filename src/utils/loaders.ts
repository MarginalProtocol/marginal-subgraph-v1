import { MarginalV1Pool } from './../../generated/templates/MarginalV1Pool/MarginalV1Pool';
import { MarginalV1Pool as PoolTemplate } from '../../generated/templates'
import { Factory, Pool, Transaction, Position } from "../../generated/schema";
import {
    FACTORY_ADDRESS,
    ZERO_BI,
    ONE_BI,
    factoryContract,
  } from "../utils/constants";
import { BigInt, ethereum, Address } from "@graphprotocol/graph-ts";


export function loadFactory(factoryAddress: string): Factory {
  // load factory
  let factory = Factory.load(factoryAddress);

  // create new factory if null
  if (factory === null) {
    factory = new Factory(factoryAddress);
    factory.poolCount = ZERO_BI;
    factory.deployer = factoryContract.marginalV1Deployer().toHexString();
    factory.uniV3Factory = factoryContract.uniswapV3Factory().toHexString();
    factory.minCardinality = BigInt.fromI32(factoryContract.observationCardinalityMinimum());
    factory.poolCount = ZERO_BI;
    factory.txCount = ZERO_BI;
    factory.owner = factoryContract.owner().toHexString();
  }

  return factory
}

export function loadPool(event: ethereum.Event, poolAddress: Address): Pool {
  // load pool
  let pool = Pool.load(poolAddress.toHexString())

  // create new pool if null
  if (pool === null) {
    pool = new Pool(poolAddress.toHexString())
    let poolContract = MarginalV1Pool.bind(poolAddress)

    pool.address = poolAddress
    pool.factory = poolContract.factory().toHexString()
    pool.oracle = poolContract.oracle().toHexString()
    pool.createdAtTimestamp = event.block.timestamp
    pool.createdAtBlockNumber = event.block.number
    pool.token0 = poolContract.token0().toHexString()
    pool.token1 = poolContract.token1().toHexString()
    pool.maintenance = BigInt.fromI32(poolContract.maintenance() as i32);
    pool.txCount = ZERO_BI // TODO: check how to retrieve tx count if loading
    pool.fee = BigInt.fromI32(poolContract.fee() as i32)
    pool.reward = BigInt.fromI32(poolContract.reward() as i32)
    pool.liquidityLocked = poolContract.liquidityLocked()

    PoolTemplate.create(poolAddress)
  }

  return pool
}

export function loadTransaction(event: ethereum.Event): Transaction {
  let transaction = Transaction.load(event.transaction.hash.toHexString())

  if (transaction === null) {
    transaction = new Transaction(event.transaction.hash.toHexString())
    transaction.blockNumber = event.block.number
    transaction.timestamp = event.block.timestamp
    transaction.gasLimit = event.transaction.gasLimit
    transaction.gasPrice = event.transaction.gasPrice
  }

  return transaction as Transaction
}

export function loadPosition(event: ethereum.Event, pool: Pool, positionId: BigInt): Position {
  let _positionId = pool.id.concat('-').concat(positionId.toHexString())
  let poolContract = MarginalV1Pool.bind(pool.id as)

  // load Position if exists
  let position = Position.load(_positionId)

  // create new Position if null
  if (position === null) {
    position = new Position(_positionId)

    position.owner =
  }
}