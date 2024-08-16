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
export const UNI_V3_FACTORY_ADDRESS = '0x217Cd80795EfCa5025d47023da5c03a24fA95356'

// Core Contract
export const FACTORY_ADDRESS = '0x8a3B8cd1cf9B3e4E552a1F8d6C4BC4d3A97C5a6a'

// Periphery Write Functions
export const NFT_POSITION_MANAGER_ADDRESS = '0xD237C7cDb402f120eDac152213540375c4a6c8C4'

export let factoryContract = MarginalV1Factory.bind(Address.fromString(FACTORY_ADDRESS))
export let nftPositionManagerContract = MarginalV1NonfungiblePositionManager.bind(Address.fromString(NFT_POSITION_MANAGER_ADDRESS))
