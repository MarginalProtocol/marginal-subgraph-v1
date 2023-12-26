import { Factory } from "../../generated/schema";
import {
    FACTORY_ADDRESS,
    ZERO_BI,
    ONE_BI,
    factoryContract,
  } from "../utils/constants";
import { BigInt } from "@graphprotocol/graph-ts";

export function loadFactory(factoryAddress: string): Factory {
  // load factory
  let factory = Factory.load(factoryAddress);

  // create new factory if null
  if (factory === null) {
    factory = new Factory(factoryAddress);
    factory.poolCount = ZERO_BI;
    factory.deployer = factoryContract.marginalV1Deployer().toHexString();
    factory.uniV3Factory = factoryContract.uniswapV3Factory().toHexString();
    factory.minCardinality = BigInt.fromI32(factoryContract.observationCardinalityMinimum());
    factory.poolCount = ZERO_BI;
    factory.txCount = ZERO_BI;
    factory.owner = factoryContract.owner().toHexString();
  }

  return factory
}