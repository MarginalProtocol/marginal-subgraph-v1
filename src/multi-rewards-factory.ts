import {
  NotifyRewardAmount as NotifyRewardAmountEvent,
} from "../generated/MultiRewardsFactory/MultiRewardsFactory"
import {
  MultiRewards,
} from "../generated/schema"
import {
  multiRewardsFactoryContract,
} from "./utils/constants";
import { MultiRewards as MultiRewardsContract } from "./../generated/templates/MultiRewards/MultiRewards";
import { MultiRewards as MultiRewardsTemplate } from './../generated/templates'

export function handleNotifyRewardAmount(event: NotifyRewardAmountEvent): void {
  let multiRewardsContractAddress = multiRewardsFactoryContract.multiRewardsByStakingToken(event.params.stakingToken)
  let multiRewardsContract = MultiRewardsContract.bind(multiRewardsContractAddress)

  let multiRewards = new MultiRewards(multiRewardsContractAddress.toHexString()) as MultiRewards;

  multiRewards.stakingToken = event.params.stakingToken
  multiRewards.rewardsToken = event.params.rewardsToken
  multiRewards.rewardsDistributor = multiRewardsContract.rewardData(event.params.rewardsToken).getRewardsDistributor()
  multiRewards.rewardsDuration = multiRewardsContract.rewardData(event.params.rewardsToken).getRewardsDuration()
  multiRewards.periodFinish = multiRewardsContract.rewardData(event.params.rewardsToken).getPeriodFinish()
  multiRewards.rewardRate = multiRewardsContract.rewardData(event.params.rewardsToken).getRewardRate()
  multiRewards.lastUpdateTime = multiRewardsContract.rewardData(event.params.rewardsToken).getLastUpdateTime()
  multiRewards.rewardPerTokenStored = multiRewardsContract.rewardData(event.params.rewardsToken).getRewardPerTokenStored()
  multiRewards.createdAtTimestamp = event.block.timestamp
  multiRewards.createdAtBlockNumber = event.block.number

  multiRewards.save()
  // create the tracked contract based on the template
  MultiRewardsTemplate.create(multiRewardsContractAddress)
}
