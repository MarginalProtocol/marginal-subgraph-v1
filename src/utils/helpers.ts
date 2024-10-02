import { MarginalV1LBPool } from "../../generated/schema";
import {
  MarginalV1LBPool as MarginalV1LBPoolABI,
} from "../../generated/MarginalV1LBPool/MarginalV1LBPool"
import { Address } from "@graphprotocol/graph-ts";

export function isNullEthValue(value: string): boolean {
    return value == '0x0000000000000000000000000000000000000000000000000000000000000001'
  }


export function syncStateLB(pool: MarginalV1LBPool): MarginalV1LBPool {

  const poolAbi = MarginalV1LBPoolABI.bind(Address.fromString(pool.id))

  //   struct State {
  //     uint160 sqrtPriceX96;
  //     uint96 totalPositions; // > ~ 2e20 years at max per block to fill on mainnet
  //     uint128 liquidity;
  //     int24 tick;
  //     uint32 blockTimestamp;
  //     int56 tickCumulative;
  //     uint8 feeProtocol;
  //     bool finalized;
  // }

  const _state = poolAbi.state()

  // pool.sqrtPriceX96 = event.params.sqrtPriceX96
  // pool.liquidity = ZERO_BI
  // pool.totalPositions = ZERO_BI
  // pool.tick = event.params.tick
  // pool.blockTimestamp = event.block.timestamp
  // pool.tickCumulative = ZERO_BI
  // pool.feeProtocol = MarginalV1LBFactoryABI.bind(MarginalV1LBPoolABI.bind(event.address).factory()).feeProtocol()
  // pool.finalized = false
  pool.sqrtPriceX96 = _state.value0
  pool.totalPositions = _state.value1
  pool.liquidity = _state.value2
  pool.tick = _state.value3
  pool.blockTimestamp = _state.value4
  pool.tickCumulative = _state.value5
  pool.feeProtocol = _state.value6
  pool.finalized = _state.value7

  return pool
}