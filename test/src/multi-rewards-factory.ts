import {
  AddReward as AddRewardEvent,
  Deploy as DeployEvent,
  NotifyRewardAmount as NotifyRewardAmountEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/MultiRewardsFactory/MultiRewardsFactory"
import {
  AddReward,
  Deploy,
  NotifyRewardAmount,
  OwnershipTransferred
} from "../generated/schema"

export function handleAddReward(event: AddRewardEvent): void {
  let entity = new AddReward(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.stakingToken = event.params.stakingToken
  entity.rewardsToken = event.params.rewardsToken
  entity.rewardAmount = event.params.rewardAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeploy(event: DeployEvent): void {
  let entity = new Deploy(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.stakingToken = event.params.stakingToken
  entity.multiRewards = event.params.multiRewards

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNotifyRewardAmount(event: NotifyRewardAmountEvent): void {
  let entity = new NotifyRewardAmount(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.stakingToken = event.params.stakingToken
  entity.rewardsToken = event.params.rewardsToken
  entity.rewardAmount = event.params.rewardAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
