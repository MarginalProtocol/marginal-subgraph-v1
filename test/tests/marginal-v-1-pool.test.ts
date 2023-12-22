import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Adjust } from "../generated/schema"
import { Adjust as AdjustEvent } from "../generated/MarginalV1Pool/MarginalV1Pool"
import { handleAdjust } from "../src/marginal-v-1-pool"
import { createAdjustEvent } from "./marginal-v-1-pool-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let id = BigInt.fromI32(234)
    let recipient = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let marginAfter = BigInt.fromI32(234)
    let newAdjustEvent = createAdjustEvent(owner, id, recipient, marginAfter)
    handleAdjust(newAdjustEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Adjust created and stored", () => {
    assert.entityCount("Adjust", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Adjust",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Adjust",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "recipient",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Adjust",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "marginAfter",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
