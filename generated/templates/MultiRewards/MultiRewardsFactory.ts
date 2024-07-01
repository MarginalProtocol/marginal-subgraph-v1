// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class AddReward extends ethereum.Event {
  get params(): AddReward__Params {
    return new AddReward__Params(this);
  }
}

export class AddReward__Params {
  _event: AddReward;

  constructor(event: AddReward) {
    this._event = event;
  }

  get stakingToken(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get rewardsToken(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get rewardAmount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Deploy extends ethereum.Event {
  get params(): Deploy__Params {
    return new Deploy__Params(this);
  }
}

export class Deploy__Params {
  _event: Deploy;

  constructor(event: Deploy) {
    this._event = event;
  }

  get stakingToken(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get multiRewards(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class NotifyRewardAmount extends ethereum.Event {
  get params(): NotifyRewardAmount__Params {
    return new NotifyRewardAmount__Params(this);
  }
}

export class NotifyRewardAmount__Params {
  _event: NotifyRewardAmount;

  constructor(event: NotifyRewardAmount) {
    this._event = event;
  }

  get stakingToken(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get rewardsToken(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get rewardAmount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class MultiRewardsFactory__rewardsInfoByStakingAndRewardsTokenResult {
  value0: BigInt;
  value1: boolean;

  constructor(value0: BigInt, value1: boolean) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromBoolean(this.value1));
    return map;
  }

  getRewardAmount(): BigInt {
    return this.value0;
  }

  getInitialized(): boolean {
    return this.value1;
  }
}

export class MultiRewardsFactory extends ethereum.SmartContract {
  static bind(address: Address): MultiRewardsFactory {
    return new MultiRewardsFactory("MultiRewardsFactory", address);
  }

  isOwner(): boolean {
    let result = super.call("isOwner", "isOwner():(bool)", []);

    return result[0].toBoolean();
  }

  try_isOwner(): ethereum.CallResult<boolean> {
    let result = super.tryCall("isOwner", "isOwner():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  multiRewardsByStakingToken(param0: Address): Address {
    let result = super.call(
      "multiRewardsByStakingToken",
      "multiRewardsByStakingToken(address):(address)",
      [ethereum.Value.fromAddress(param0)],
    );

    return result[0].toAddress();
  }

  try_multiRewardsByStakingToken(
    param0: Address,
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "multiRewardsByStakingToken",
      "multiRewardsByStakingToken(address):(address)",
      [ethereum.Value.fromAddress(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  rewardsDuration(): BigInt {
    let result = super.call(
      "rewardsDuration",
      "rewardsDuration():(uint256)",
      [],
    );

    return result[0].toBigInt();
  }

  try_rewardsDuration(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "rewardsDuration",
      "rewardsDuration():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewardsInfoByStakingAndRewardsToken(
    param0: Address,
    param1: Address,
  ): MultiRewardsFactory__rewardsInfoByStakingAndRewardsTokenResult {
    let result = super.call(
      "rewardsInfoByStakingAndRewardsToken",
      "rewardsInfoByStakingAndRewardsToken(address,address):(uint256,bool)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)],
    );

    return new MultiRewardsFactory__rewardsInfoByStakingAndRewardsTokenResult(
      result[0].toBigInt(),
      result[1].toBoolean(),
    );
  }

  try_rewardsInfoByStakingAndRewardsToken(
    param0: Address,
    param1: Address,
  ): ethereum.CallResult<MultiRewardsFactory__rewardsInfoByStakingAndRewardsTokenResult> {
    let result = super.tryCall(
      "rewardsInfoByStakingAndRewardsToken",
      "rewardsInfoByStakingAndRewardsToken(address,address):(uint256,bool)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new MultiRewardsFactory__rewardsInfoByStakingAndRewardsTokenResult(
        value[0].toBigInt(),
        value[1].toBoolean(),
      ),
    );
  }

  stakingRewardsGenesis(): BigInt {
    let result = super.call(
      "stakingRewardsGenesis",
      "stakingRewardsGenesis():(uint256)",
      [],
    );

    return result[0].toBigInt();
  }

  try_stakingRewardsGenesis(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "stakingRewardsGenesis",
      "stakingRewardsGenesis():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  stakingTokens(param0: BigInt): Address {
    let result = super.call(
      "stakingTokens",
      "stakingTokens(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );

    return result[0].toAddress();
  }

  try_stakingTokens(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "stakingTokens",
      "stakingTokens(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _stakingRewardsGenesis(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddRewardCall extends ethereum.Call {
  get inputs(): AddRewardCall__Inputs {
    return new AddRewardCall__Inputs(this);
  }

  get outputs(): AddRewardCall__Outputs {
    return new AddRewardCall__Outputs(this);
  }
}

export class AddRewardCall__Inputs {
  _call: AddRewardCall;

  constructor(call: AddRewardCall) {
    this._call = call;
  }

  get stakingToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get rewardsToken(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get rewardAmount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class AddRewardCall__Outputs {
  _call: AddRewardCall;

  constructor(call: AddRewardCall) {
    this._call = call;
  }
}

export class DeployCall extends ethereum.Call {
  get inputs(): DeployCall__Inputs {
    return new DeployCall__Inputs(this);
  }

  get outputs(): DeployCall__Outputs {
    return new DeployCall__Outputs(this);
  }
}

export class DeployCall__Inputs {
  _call: DeployCall;

  constructor(call: DeployCall) {
    this._call = call;
  }

  get stakingToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class DeployCall__Outputs {
  _call: DeployCall;

  constructor(call: DeployCall) {
    this._call = call;
  }
}

export class NotifyRewardAmountCall extends ethereum.Call {
  get inputs(): NotifyRewardAmountCall__Inputs {
    return new NotifyRewardAmountCall__Inputs(this);
  }

  get outputs(): NotifyRewardAmountCall__Outputs {
    return new NotifyRewardAmountCall__Outputs(this);
  }
}

export class NotifyRewardAmountCall__Inputs {
  _call: NotifyRewardAmountCall;

  constructor(call: NotifyRewardAmountCall) {
    this._call = call;
  }

  get stakingToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get rewardsToken(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class NotifyRewardAmountCall__Outputs {
  _call: NotifyRewardAmountCall;

  constructor(call: NotifyRewardAmountCall) {
    this._call = call;
  }
}

export class NotifyRewardAmountsCall extends ethereum.Call {
  get inputs(): NotifyRewardAmountsCall__Inputs {
    return new NotifyRewardAmountsCall__Inputs(this);
  }

  get outputs(): NotifyRewardAmountsCall__Outputs {
    return new NotifyRewardAmountsCall__Outputs(this);
  }
}

export class NotifyRewardAmountsCall__Inputs {
  _call: NotifyRewardAmountsCall;

  constructor(call: NotifyRewardAmountsCall) {
    this._call = call;
  }

  get rewardsToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class NotifyRewardAmountsCall__Outputs {
  _call: NotifyRewardAmountsCall;

  constructor(call: NotifyRewardAmountsCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
