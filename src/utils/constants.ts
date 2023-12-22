import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import { MarginalV1Factory } from '../../generated/MarginalV1Factory/MarginalV1Factory'
import { MarginalV1NonfungiblePositionManager } from './../../generated/MarginalV1NonfungiblePositionManager/MarginalV1NonfungiblePositionManager';

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

// Core Contract
export const FACTORY_ADDRESS = '0xb92eb4ffC52a0EC383efa6577b2c3c89B7b980f5'

// Periphery Write Functions
export const NFT_POSITION_MANAGER_ADDRESS = '0x95D95C41436C15b50217Bf1C0f810536AD181C13'

// Periphery View Functions
export const QUOTER_ADDRESS = '0x7385197B160CA2ec114960BCb32bc5D7CfA2720c'

export let factoryContract = MarginalV1Factory.bind(Address.fromString(FACTORY_ADDRESS))
export let nftPositionManagerContract = MarginalV1NonfungiblePositionManager.bind(Address.fromString(NFT_POSITION_MANAGER_ADDRESS))
