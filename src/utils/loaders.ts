import { MarginalV1Pool } from './../../generated/templates/MarginalV1Pool/MarginalV1Pool';
import { MultiRewards } from '../../generated/templates/MultiRewards/MultiRewards';
import { MarginalV1Pool as PoolTemplate, MultiRewards as StakePoolTemplate } from '../../generated/templates'
import { Factory, Pool, Transaction, Position, TokenPositionMapping, MultiRewardsFactory, StakePool, MarginalV1LBFactory, MarginalV1LBPosition, MarginalV1LBPool } from "../../generated/schema";
import {
    FACTORY_ADDRESS,
    ZERO_BI,
    ONE_BI,
    factoryContract,
    multiRewardsFactoryContract,
    MULTIREWARDS_FACTORY_ADDRESS,
    ADDRESS_ZERO
  } from "../utils/constants";
import { BigInt, ethereum, Address } from "@graphprotocol/graph-ts";
import { fetchTokenSymbol } from './token';

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

export function loadLBFactory(factoryAddress: string): MarginalV1LBFactory {
  // load factory
  let factory = MarginalV1LBFactory.load(factoryAddress);

  // create new factory if null
  if (factory === null) {
    factory = new MarginalV1LBFactory(factoryAddress);

    // Variables
    factory.marginalV1Deployer = ADDRESS_ZERO;
    factory.owner = ADDRESS_ZERO;
    factory.feeProtocol = 0;

    // State
    factory.poolCount = ZERO_BI;
    factory.txCount = ZERO_BI;
  }

  return factory
}

export function loadLBPosition(pool: MarginalV1LBPool, ownerAddress: string): MarginalV1LBPosition {
  // load position
  let id = pool.id.concat('-').concat(ownerAddress)
  let position = MarginalV1LBPosition.load(id)

  // create new position if null
  if (position === null) {
    position = new MarginalV1LBPosition(id)
    position.pool = pool.id
    position.owner = ownerAddress
    position.shares = ZERO_BI
  }

  return position
}

export function loadMultiRewardsFactory(multiRewardsFactoryAddress: string): MultiRewardsFactory {
  // load multirewards factory
  let multiRewardsFactory = MultiRewardsFactory.load(multiRewardsFactoryAddress)

  if (multiRewardsFactory === null) {
    multiRewardsFactory = new MultiRewardsFactory(multiRewardsFactoryAddress)
  }

  return multiRewardsFactory
}

export function loadStakePool(event: ethereum.Event, stakePoolAddress: Address): StakePool {
  // load stake pool
  let stakePool = StakePool.load(stakePoolAddress.toHexString())

  let multiRewardsFactory = loadMultiRewardsFactory(
    MULTIREWARDS_FACTORY_ADDRESS
  );

  // create new stake pool if null
  if (stakePool === null) {
    stakePool = new StakePool(stakePoolAddress.toHexString())
    let stakePoolContract = MultiRewards.bind(stakePoolAddress)

    stakePool.multiRewardsFactory = multiRewardsFactory.id
    stakePool.stakeToken = stakePoolContract.stakingToken()

    StakePoolTemplate.create(stakePoolAddress)
  }

  return stakePool
}

export function loadPool(event: ethereum.Event, poolAddress: Address): Pool {
  // load pool
  let pool = Pool.load(poolAddress.toHexString())

  // create new pool if null
  if (pool === null) {
    pool = new Pool(poolAddress.toHexString())
    let poolContract = MarginalV1Pool.bind(poolAddress)

    let token0Symbol = fetchTokenSymbol(poolContract.token0())
    let token1Symbol = fetchTokenSymbol(poolContract.token1())

    pool.tokenPair = token0Symbol.concat('-').concat(token1Symbol)
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
    pool.rewardPremium = BigInt.fromI32(poolContract.rewardPremium() as i32)
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

// export function loadLBTransaction(event: ethereum.Event): LBTransaction {
//   let transaction = LBTransaction.load(event.transaction.hash.toHexString())

//   if (transaction === null) {
//     transaction = new LBTransaction(event.transaction.hash.toHexString())
//   }

//   transaction.blockNumber = event.block.number
//   transaction.timestamp = event.block.timestamp
//   transaction.gasLimit = event.transaction.gasLimit
//   transaction.gasPrice = event.transaction.gasPrice

//   return transaction as LBTransaction
// }

export function loadPosition(event: ethereum.Event, tokenId: string, poolAddress: string): Position {
  // load Position if exists
  let id = tokenId.toString()
  let position = Position.load(id)

  // create new Position if null
  if (position === null) {
    position = new Position(id)
    position.pool = poolAddress
    position.margin = null // TODO: Update to pull margin from Contract
    position.blockNumber = null // Do we leave as null if not indexed at creation?
    position.timestamp = null // Do we leave as null if not indexed at creation?
    position.transaction = event.transaction.hash.toHexString()
    // TODO: Update below using checks from Pool Contract
    position.isLiquidated = false
    position.isSettled = false
    position.isClosed = false
  }

  return position
}

export function loadPoolPosition(event: ethereum.Event, positionId: string, poolAddress: string): Position {
  // load Position if exists
  let id = poolAddress.concat('-').concat(positionId)

  let position = Position.load(id)

  // create new Position if null
  if (position === null) {
    position = new Position(id)
    position.owner = event.transaction.from.toHexString()
    position.positionId = positionId
    position.pool = poolAddress
    position.margin = null // TODO: Update to pull margin from Contract
    position.blockNumber = null // Do we leave as null if not indexed at creation?
    position.timestamp = null // Do we leave as null if not indexed at creation?
    position.transaction = event.transaction.hash.toHexString()
    // TODO: Update below using checks from Pool Contract
    position.isLiquidated = false
    position.isSettled = false
    position.isClosed = false
  }

  return position
}

export function loadPositionByTokenId(tokenId: string): Position | null {
  let matched = TokenPositionMapping.load(tokenId)
  if (matched === null) {
    return null
  }

  let poolAddress = matched.poolAddress
  let positionId = matched.positionId

  let id = poolAddress.concat('-').concat(positionId)

  return Position.load(id)
}