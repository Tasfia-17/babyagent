export const contracts = {
  bscTestnet: {
    babyAgentFactory: process.env.NEXT_PUBLIC_BABY_AGENT_FACTORY || '',
    curriculum: process.env.NEXT_PUBLIC_CURRICULUM || '',
    examVerifier: process.env.NEXT_PUBLIC_EXAM_VERIFIER || '',
    diplomaNFT: process.env.NEXT_PUBLIC_DIPLOMA_NFT || '',
    jobBoard: process.env.NEXT_PUBLIC_JOB_BOARD || ''
  },
  bscMainnet: {
    babyAgentFactory: '',
    curriculum: '',
    examVerifier: '',
    diplomaNFT: '',
    jobBoard: ''
  }
}

export const getContractAddress = (chainId, contractName) => {
  const network = chainId === 97 ? 'bscTestnet' : 'bscMainnet'
  return contracts[network][contractName]
}
