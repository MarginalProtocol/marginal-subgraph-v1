import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import { MarginalV1Factory } from '../../generated/MarginalV1Factory/MarginalV1Factory'
import { MarginalV1NonfungiblePositionManager } from './../../generated/MarginalV1NonfungiblePositionManager/MarginalV1NonfungiblePositionManager';

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

// Uniswap V3 Factory Contract
export const UNI_V3_FACTORY_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984'

// Core Contract
export const FACTORY_ADDRESS = '0x71E2760cF5E2beefE5255dAA1F016a84A8fA12a4'

// Periphery Write Functions
export const NFT_POSITION_MANAGER_ADDRESS = '0x8B54A64Ee906B5cf7596E54935c9E06b2143D714'

export let factoryContract = MarginalV1Factory.bind(Address.fromString(FACTORY_ADDRESS))
export let nftPositionManagerContract = MarginalV1NonfungiblePositionManager.bind(Address.fromString(NFT_POSITION_MANAGER_ADDRESS))
