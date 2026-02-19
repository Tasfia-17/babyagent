// Mock blockchain data for demo mode
export const DEMO_MODE = !process.env.NEXT_PUBLIC_BABY_AGENT_FACTORY || 
                         process.env.NEXT_PUBLIC_BABY_AGENT_FACTORY.startsWith('0x5FbDB')

export const mockAgents = [
  {
    tokenId: 1,
    name: 'BabyLobster',
    birthTime: Date.now() / 1000 - 3600 * 5,
    personality: 0,
    skillPoints: 30,
    status: 1,
    lessonsCompleted: 2,
  },
  {
    tokenId: 2,
    name: 'TinyBot',
    birthTime: Date.now() / 1000 - 3600 * 12,
    personality: 2,
    skillPoints: 80,
    status: 2,
    lessonsCompleted: 4,
  },
  {
    tokenId: 3,
    name: 'Sprout',
    birthTime: Date.now() / 1000 - 3600 * 2,
    personality: 1,
    skillPoints: 10,
    status: 0,
    lessonsCompleted: 1,
  },
  {
    tokenId: 4,
    name: 'CodeKid',
    birthTime: Date.now() / 1000 - 3600 * 8,
    personality: 3,
    skillPoints: 50,
    status: 1,
    lessonsCompleted: 3,
  },
  {
    tokenId: 5,
    name: 'SmartAgent',
    birthTime: Date.now() / 1000 - 3600 * 24,
    personality: 0,
    skillPoints: 150,
    status: 3,
    lessonsCompleted: 5,
  },
  {
    tokenId: 6,
    name: 'MiniMind',
    birthTime: Date.now() / 1000 - 3600 * 6,
    personality: 2,
    skillPoints: 40,
    status: 1,
    lessonsCompleted: 2,
  },
]

export const mockLessons = [
  { id: 0, name: "Hello Blockchain", completed: true, difficulty: 1, reward: 10 },
  { id: 1, name: "Signing Practice", completed: true, difficulty: 2, reward: 20 },
  { id: 2, name: "Token Transfer", completed: false, difficulty: 3, reward: 30 },
  { id: 3, name: "Smart Contract Call", completed: false, difficulty: 5, reward: 50 },
  { id: 4, name: "DeFi Basics", completed: false, difficulty: 7, reward: 70 },
]

export const mockJobs = [
  {
    id: 1,
    title: "Treasury Monitor",
    employer: "0x1234...5678",
    description: "Monitor vault balance and alert if below threshold",
    payment: "100 USDT",
    deadline: "7 days",
    applicants: 3,
    status: "open"
  },
  {
    id: 2,
    title: "Price Oracle",
    employer: "0xabcd...efgh",
    description: "Fetch and update price feeds every hour",
    payment: "50 USDT",
    deadline: "30 days",
    applicants: 5,
    status: "open"
  },
  {
    id: 3,
    title: "Liquidity Manager",
    employer: "0x9876...5432",
    description: "Rebalance liquidity pools based on market conditions",
    payment: "200 USDT",
    deadline: "14 days",
    applicants: 2,
    status: "open"
  },
  {
    id: 4,
    title: "NFT Tracker",
    employer: "0x5555...6666",
    description: "Track NFT floor prices and send alerts",
    payment: "75 USDT",
    deadline: "21 days",
    applicants: 8,
    status: "open"
  },
]

export const mockDiplomas = [
  {
    id: 1,
    agentId: 5,
    agentName: "SmartAgent",
    graduationDate: Date.now() / 1000 - 3600 * 12,
    skills: ["Blockchain Reading", "Transaction Signing", "Token Transfer", "Contract Interaction", "DeFi Operations"],
    finalScore: 95
  }
]

export const mockStats = {
  totalAgents: 156,
  totalLessons: 423,
  totalGraduates: 42,
  totalJobs: 18,
  activeAgents: 89
}

// Mock transaction simulation
export const simulateTransaction = async (action, delay = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        hash: '0x' + Math.random().toString(16).substr(2, 64),
        success: true,
      })
    }, delay)
  })
}

// Mock contract reads
export const mockContractRead = async (contract, method, args) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  if (method === 'getOwnerAgents') {
    return mockAgents.map(a => BigInt(a.tokenId))
  }
  
  if (method === 'getAgent') {
    const agent = mockAgents.find(a => a.tokenId === Number(args[0]))
    if (agent) {
      return [
        agent.name,
        BigInt(Math.floor(agent.birthTime)),
        agent.personality,
        BigInt(agent.skillPoints),
        agent.status
      ]
    }
  }
  
  if (method === 'getAgentProgress') {
    return [
      mockLessons.filter(l => l.completed).map(l => BigInt(l.id)),
      BigInt(30)
    ]
  }
  
  if (method === 'mintPrice') {
    return BigInt('10000000000000000')
  }
  
  return null
}
