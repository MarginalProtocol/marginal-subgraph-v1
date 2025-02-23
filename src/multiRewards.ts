import { Address } from '@graphprotocol/graph-ts';
import { Deploy as DeployStakePool, AddReward } from "../generated/MultiRewardsFactory/MultiRewardsFactory";
import {
  MultiRewards,
} from "../generated/templates/MultiRewards/MultiRewards";
import { MultiRewards as StakePoolTemplate } from "../generated/templates";
import { StakePool, Pool, Token} from "../generated/schema";
import { MULTIREWARDS_FACTORY_ADDRESS } from './constants/addresses';
import { loadMultiRewardsFactory, loadPool, loadStakePool } from "./utils/loaders";
import { log } from '@graphprotocol/graph-ts'

export function handleStakePoolCreated(event: DeployStakePool): void {
  let multiRewardsFactory = loadMultiRewardsFactory(
    MULTIREWARDS_FACTORY_ADDRESS
  );
  let stakePoolContract = MultiRewards.bind(event.params.multiRewards);
  let stakePool = new StakePool(event.params.multiRewards.toHexString());
  
  // Try to load the pool, but don't require it to exist
  let stakingToken = stakePoolContract.stakingToken();
  let pool = Pool.load(stakingToken.toHexString());
  
  stakePool.multiRewardsFactory = multiRewardsFactory.id;

  if (pool !== null) {
    stakePool.pool = pool.id;
    pool.stakePool = stakePool.id;
    pool.save();
  }
  
  multiRewardsFactory.save();
  stakePool.save();

  StakePoolTemplate.create(event.params.multiRewards);
}

export function handleAddReward(event: AddReward): void {
  let pool = loadPool(event, event.params.stakingToken)
  
  if (!pool.rewardTokens.includes(event.params.rewardsToken.toHexString())) {
    let newRewardTokens = pool.rewardTokens
    newRewardTokens.push(event.params.rewardsToken.toHexString())
    pool.rewardTokens = newRewardTokens
  }
  
  pool.save()
}