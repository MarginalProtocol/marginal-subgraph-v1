import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes } from "@graphprotocol/graph-ts"
import { ReceiverDeployed } from "../generated/schema"
import { ReceiverDeployed as ReceiverDeployedEvent } from "../generated/MarginalV1LBLiquidityReceiverDeployer/MarginalV1LBLiquidityReceiverDeployer"
import { handleReceiverDeployed } from "../src/marginal-v-1-lb-liquidity-receiver-deployer"
import { createReceiverDeployedEvent } from "./marginal-v-1-lb-liquidity-receiver-deployer-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let pool = Address.fromString("0x0000000000000000000000000000000000000001")
    let data = Bytes.fromI32(1234567890)
    let receiver = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newReceiverDeployedEvent = createReceiverDeployedEvent(
      pool,
      data,
      receiver
    )
    handleReceiverDeployed(newReceiverDeployedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ReceiverDeployed created and stored", () => {
    assert.entityCount("ReceiverDeployed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ReceiverDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pool",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ReceiverDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "data",
      "1234567890"
    )
    assert.fieldEquals(
      "ReceiverDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "receiver",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
