import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AddReward,
  Deploy,
  NotifyRewardAmount,
  OwnershipTransferred
} from "../generated/MultiRewardsFactory/MultiRewardsFactory"

export function createAddRewardEvent(
  stakingToken: Address,
  rewardsToken: Address,
  rewardAmount: BigInt
): AddReward {
  let addRewardEvent = changetype<AddReward>(newMockEvent())

  addRewardEvent.parameters = new Array()

  addRewardEvent.parameters.push(
    new ethereum.EventParam(
      "stakingToken",
      ethereum.Value.fromAddress(stakingToken)
    )
  )
  addRewardEvent.parameters.push(
    new ethereum.EventParam(
      "rewardsToken",
      ethereum.Value.fromAddress(rewardsToken)
    )
  )
  addRewardEvent.parameters.push(
    new ethereum.EventParam(
      "rewardAmount",
      ethereum.Value.fromUnsignedBigInt(rewardAmount)
    )
  )

  return addRewardEvent
}

export function createDeployEvent(
  stakingToken: Address,
  multiRewards: Address
): Deploy {
  let deployEvent = changetype<Deploy>(newMockEvent())

  deployEvent.parameters = new Array()

  deployEvent.parameters.push(
    new ethereum.EventParam(
      "stakingToken",
      ethereum.Value.fromAddress(stakingToken)
    )
  )
  deployEvent.parameters.push(
    new ethereum.EventParam(
      "multiRewards",
      ethereum.Value.fromAddress(multiRewards)
    )
  )

  return deployEvent
}

export function createNotifyRewardAmountEvent(
  stakingToken: Address,
  rewardsToken: Address,
  rewardAmount: BigInt
): NotifyRewardAmount {
  let notifyRewardAmountEvent = changetype<NotifyRewardAmount>(newMockEvent())

  notifyRewardAmountEvent.parameters = new Array()

  notifyRewardAmountEvent.parameters.push(
    new ethereum.EventParam(
      "stakingToken",
      ethereum.Value.fromAddress(stakingToken)
    )
  )
  notifyRewardAmountEvent.parameters.push(
    new ethereum.EventParam(
      "rewardsToken",
      ethereum.Value.fromAddress(rewardsToken)
    )
  )
  notifyRewardAmountEvent.parameters.push(
    new ethereum.EventParam(
      "rewardAmount",
      ethereum.Value.fromUnsignedBigInt(rewardAmount)
    )
  )

  return notifyRewardAmountEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
