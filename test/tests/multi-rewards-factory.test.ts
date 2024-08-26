import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AddReward } from "../generated/schema"
import { AddReward as AddRewardEvent } from "../generated/MultiRewardsFactory/MultiRewardsFactory"
import { handleAddReward } from "../src/multi-rewards-factory"
import { createAddRewardEvent } from "./multi-rewards-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let stakingToken = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let rewardsToken = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let rewardAmount = BigInt.fromI32(234)
    let newAddRewardEvent = createAddRewardEvent(
      stakingToken,
      rewardsToken,
      rewardAmount
    )
    handleAddReward(newAddRewardEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddReward created and stored", () => {
    assert.entityCount("AddReward", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddReward",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "stakingToken",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddReward",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "rewardsToken",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddReward",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "rewardAmount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
