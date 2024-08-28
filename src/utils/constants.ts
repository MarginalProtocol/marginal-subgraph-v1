import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import { MarginalV1Factory } from '../../generated/MarginalV1Factory/MarginalV1Factory'
import { MultiRewardsFactory } from '../../generated/MultiRewardsFactory/MultiRewardsFactory';
import { MarginalV1NonfungiblePositionManager } from './../../generated/MarginalV1NonfungiblePositionManager/MarginalV1NonfungiblePositionManager';

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

// Uniswap V3 Factory Contract
export const UNI_V3_FACTORY_ADDRESS = '0x33128a8fC17869897dcE68Ed026d694621f6FDfD'

// Core Contract
export const FACTORY_ADDRESS = '0x407fA8029852A8386a907287018CEAFd7242C621'

// Periphery Write Functions
export const NFT_POSITION_MANAGER_ADDRESS = '0x12B4F1984Ef15f93b5636E3332eF4fF727EAa79d'

// DAO Contract
export const MULTIREWARDS_FACTORY_ADDRESS = '0xd9eD059DAD43c2B1d50A6751ab3332118fd4842d'

export let factoryContract = MarginalV1Factory.bind(Address.fromString(FACTORY_ADDRESS))
export let multiRewardsFactoryContract = MultiRewardsFactory.bind(Address.fromString(MULTIREWARDS_FACTORY_ADDRESS))
export let nftPositionManagerContract = MarginalV1NonfungiblePositionManager.bind(Address.fromString(NFT_POSITION_MANAGER_ADDRESS))
