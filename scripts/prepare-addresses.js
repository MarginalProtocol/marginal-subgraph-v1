const fs = require('fs');
const path = require('path');

// Get network from command line args
const network = process.argv[2];
if (!network) {
    console.error('Please specify a network (mainnet, sepolia, base, or berachain-bartio)');
    process.exit(1);
}

// Read networks.json
const networksPath = path.join(__dirname, '..', 'networks.json');
const networks = JSON.parse(fs.readFileSync(networksPath, 'utf8'));

// Validate network exists
if (!networks[network]) {
    console.error(`Network ${network} not found in networks.json`);
    process.exit(1);
}

// Get addresses for the specified network
const {
    MarginalV1Factory,
    MarginalV1NonfungiblePositionManager,
    MultiRewardsFactory
} = networks[network];

// Update constants.ts
const constantsPath = path.join(__dirname, '..', 'src', 'utils', 'constants.ts');
const constants = fs.readFileSync(constantsPath, 'utf8');

// Create the new content with updated addresses
const updatedConstants = constants.replace(
    /export const FACTORY_ADDRESS = '(0x[a-fA-F0-9]+)'/,
    `export const FACTORY_ADDRESS = '${MarginalV1Factory.address}'`
).replace(
    /export const NFT_POSITION_MANAGER_ADDRESS = '(0x[a-fA-F0-9]+)'/,
    `export const NFT_POSITION_MANAGER_ADDRESS = '${MarginalV1NonfungiblePositionManager.address}'`
).replace(
    /export const MULTIREWARDS_FACTORY_ADDRESS = '(0x[a-fA-F0-9]+)'/,
    `export const MULTIREWARDS_FACTORY_ADDRESS = '${MultiRewardsFactory.address}'`
);

// Write the updated content back to constants.ts
fs.writeFileSync(constantsPath, updatedConstants);

console.log(`Updated contract addresses for network: ${network}`);
console.log(`Factory: ${MarginalV1Factory.address}`);
console.log(`NFT Position Manager: ${MarginalV1NonfungiblePositionManager.address}`);
console.log(`MultiRewards Factory: ${MultiRewardsFactory.address}`);
