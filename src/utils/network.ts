import { dataSource } from '@graphprotocol/graph-ts'

export function getChainId(): string {
  let network = dataSource.network()
  
  // Only include specific chain IDs we're interested in
  if (network == 'mainnet') return '1'           // Ethereum mainnet
  if (network == 'base') return '8453'           // Base mainnet
  if (network == 'sepolia') return '11155111'    // Sepolia testnet
  if (network == 'base-sepolia') return '80084'  // Base Sepolia testnet
  
  // Default to empty string if network is not recognized
  return ''
}