import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { LeverageEnabled } from "../generated/schema"
import { LeverageEnabled as LeverageEnabledEvent } from "../generated/MarginalV1Factory/MarginalV1Factory"
import { handleLeverageEnabled } from "../src/factory"
import { createLeverageEnabledEvent } from "./marginal-v-1-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let maintenance = 123
    let leverage = BigInt.fromI32(234)
    let newLeverageEnabledEvent = createLeverageEnabledEvent(
      maintenance,
      leverage
    )
    handleLeverageEnabled(newLeverageEnabledEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("LeverageEnabled created and stored", () => {
    assert.entityCount("LeverageEnabled", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "LeverageEnabled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "maintenance",
      "123"
    )
    assert.fieldEquals(
      "LeverageEnabled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "leverage",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
