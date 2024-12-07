import { Address } from '@graphprotocol/graph-ts';
import { MarginalV1Factory } from '../../generated/MarginalV1Factory/MarginalV1Factory';
import { MarginalV1NonfungiblePositionManager } from '../../generated/MarginalV1NonfungiblePositionManager/MarginalV1NonfungiblePositionManager';
import { MultiRewardsFactory } from '../../generated/MultiRewardsFactory/MultiRewardsFactory';
import { MARGINAL_V1_CORE_FACTORY_ADDRESS, MULTIREWARDS_FACTORY_ADDRESS, MARGINAL_V1_NFT_POSITION_MANAGER_ADDRESS } from './addresses';

export let factoryContract = MarginalV1Factory.bind(Address.fromString(MARGINAL_V1_CORE_FACTORY_ADDRESS));
export let multiRewardsFactoryContract = MultiRewardsFactory.bind(Address.fromString(MULTIREWARDS_FACTORY_ADDRESS));
export let nftPositionManagerContract = MarginalV1NonfungiblePositionManager.bind(Address.fromString(MARGINAL_V1_NFT_POSITION_MANAGER_ADDRESS));
