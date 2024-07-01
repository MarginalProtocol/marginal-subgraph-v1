import {
  Staked as StakedEvent,
  Withdrawn as WithdrawnEvent,
} from "../generated/templates/MultiRewards/MultiRewards"
import {
  MultiRewardsWithdrawn, MultiRewardsStaked,
} from "../generated/schema"
import { loadMultiRewards } from './utils/loaders';

export function handleStaked(event: StakedEvent): void {
  let multiRewards = loadMultiRewards(event, event.address)
}

export function handleWithdrawn(event: WithdrawnEvent): void {
}
