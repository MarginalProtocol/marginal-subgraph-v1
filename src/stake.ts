import { Deploy as DeployStakePool } from "../generated/MultiRewardsFactory/MultiRewardsFactory";
import {
  MultiRewards,
  RewardAdded,
} from "../generated/templates/MultiRewards/MultiRewards";
import { MultiRewards as StakePoolTemplate } from "../generated/templates";
import { StakePool, Token } from "../generated/schema";
import { MULTIREWARDS_FACTORY_ADDRESS } from "./utils/constants";
import { loadMultiRewardsFactory, loadPool } from "./utils/loaders";
import {
  fetchTokenSymbol,
  fetchTokenName,
  fetchTokenDecimals,
} from "./utils/token";

export function handleStakePoolCreated(event: DeployStakePool): void {
  let multiRewardsFactory = loadMultiRewardsFactory(
    MULTIREWARDS_FACTORY_ADDRESS
  );
  let stakePoolContract = MultiRewards.bind(event.params.multiRewards);
  let stakePool = new StakePool(event.params.multiRewards.toHexString());
  
  stakePool.multiRewardsFactory = multiRewardsFactory.id;
  stakePool.stakeToken = stakePoolContract.stakingToken()

  let pool = loadPool(event, stakePoolContract.stakingToken())

  pool.stakePool = stakePool.id
  multiRewardsFactory.save()
  stakePool.save();
  pool.save()

  StakePoolTemplate.create(event.params.multiRewards);
}

export function handleRewardAdded(event: RewardAdded): void {}
