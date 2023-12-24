import {
  LeverageEnabled,
  OwnerChanged,
  PoolCreated
} from "../generated/MarginalV1Factory/MarginalV1Factory"
import { Factory, Pool, Token } from "../generated/schema"
import { FACTORY_ADDRESS, ZERO_BI, ONE_BI, factoryContract} from "./utils/constants"

export function handlePoolCreated(event: PoolCreated): void {
  // load factory
  let factory = Factory.load(FACTORY_ADDRESS)

  // create new factory if null
  if (factory === null) {
    factory = new Factory(FACTORY_ADDRESS)
    factory.poolCount = ZERO_BI
    factory.deployer = factoryContract.marginalV1Deployer().toHexString()
    factory.uniV3Factory = factoryContract.uniswapV3Factory().toHexString()
    factory.minCardinality = factoryContract.observationCardinalityMinimum()
    factory.poolCount = ZERO_BI
    factory.txCount = ZERO_BI
    factory.owner = factoryContract.owner().toHexString()
  }

  factory.poolCount = factory.poolCount.plus(ONE_BI)

  let pool = new Pool(event.params.pool.toHexString()) as Pool
  let token0 = Token.load(event.params.token0.toHexString())
  let token1 = Token.load(event.params.token1.toHexString())
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

// export function handleOwnerChanged(event: OwnerChangedEvent): void {
//   let entity = new OwnerChanged(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.oldOwner = event.params.oldOwner
//   entity.newOwner = event.params.newOwner

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

