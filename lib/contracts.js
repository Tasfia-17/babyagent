// Contract addresses by network
export const CONTRACTS = {
  97: { // BSC Testnet
    babyAgentFactory: process.env.NEXT_PUBLIC_BABY_AGENT_FACTORY || '',
    curriculum: process.env.NEXT_PUBLIC_CURRICULUM || '',
    examVerifier: process.env.NEXT_PUBLIC_EXAM_VERIFIER || '',
    diplomaNFT: process.env.NEXT_PUBLIC_DIPLOMA_NFT || '',
    jobBoard: process.env.NEXT_PUBLIC_JOB_BOARD || '',
  },
  56: { // BSC Mainnet
    babyAgentFactory: '',
    curriculum: '',
    examVerifier: '',
    diplomaNFT: '',
    jobBoard: '',
  }
}

export const getContractAddress = (chainId, contractName) => {
  const contracts = CONTRACTS[chainId]
  if (!contracts) {
    throw new Error(`Unsupported chain ID: ${chainId}`)
  }
  const address = contracts[contractName]
  if (!address) {
    console.warn(`Contract ${contractName} not deployed on chain ${chainId}`)
  }
  return address
}

export const isContractDeployed = (chainId, contractName) => {
  try {
    const address = getContractAddress(chainId, contractName)
    return address && address !== ''
  } catch {
    return false
  }
}

export const SUPPORTED_CHAINS = [97, 56]
export const DEFAULT_CHAIN = 97
