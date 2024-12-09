import { Deploy as DeployStakePool, AddReward } from "../generated/MultiRewardsFactory/MultiRewardsFactory";
import {
  MultiRewards,
} from "../generated/templates/MultiRewards/MultiRewards";
import { MultiRewards as StakePoolTemplate } from "../generated/templates";
import { StakePool, Token} from "../generated/schema";
import { MULTIREWARDS_FACTORY_ADDRESS } from './constants/addresses';
import { loadMultiRewardsFactory, loadPool, loadStakePool } from "./utils/loaders";
import {
  fetchTokenDecimals,
  fetchTokenName,
  fetchTokenSymbol,
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

export function handleAddReward(event: AddReward): void {
  let stakePool = loadStakePool(event, event.params.stakingToken)

  let rewardToken = Token.load(event.params.rewardsToken.toHexString())

  if (rewardToken === null) {
    rewardToken = new Token(event.params.rewardsToken.toHexString());
    rewardToken.address = event.params.rewardsToken.toHexString()
    rewardToken.symbol = fetchTokenSymbol(event.params.rewardsToken);
    rewardToken.name = fetchTokenName(event.params.rewardsToken);
    rewardToken.decimals = fetchTokenDecimals(event.params.rewardsToken);
  }

  stakePool.rewardTokens = [rewardToken.id]
  stakePool.save()
}