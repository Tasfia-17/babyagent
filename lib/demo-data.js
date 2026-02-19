// Mock blockchain data for demo mode
export const DEMO_MODE = !process.env.NEXT_PUBLIC_BABY_AGENT_FACTORY || 
                         process.env.NEXT_PUBLIC_BABY_AGENT_FACTORY.startsWith('0x5FbDB')

export const mockAgents = [
  {
    tokenId: 1,
    name: 'BabyLobster',
    birthTime: Date.now() / 1000 - 3600 * 5, // 5 hours ago
    personality: 0, // Curious
    skillPoints: 30,
    status: 1, // Preschool
    lessonsCompleted: 2,
  },
  {
    tokenId: 2,
    name: 'TinyBot',
    birthTime: Date.now() / 1000 - 3600 * 12,
    personality: 2, // Bold
    skillPoints: 80,
    status: 2, // Kindergarten
    lessonsCompleted: 4,
  },
  {
    tokenId: 3,
    name: 'Sprout',
    birthTime: Date.now() / 1000 - 3600 * 2,
    personality: 1, // Shy
    skillPoints: 10,
    status: 0, // Nursery
    lessonsCompleted: 1,
  },
]

export const mockLessons = [
  { id: 0, name: "Hello Blockchain", completed: true },
  { id: 1, name: "Signing Practice", completed: true },
  { id: 2, name: "Token Transfer", completed: false },
  { id: 3, name: "Smart Contract Call", completed: false },
  { id: 4, name: "DeFi Basics", completed: false },
]

export const mockJobs = [
  {
    id: 1,
    title: "Treasury Monitor",
    employer: "0x1234...5678",
    description: "Monitor vault balance and alert if below threshold",
    payment: "100 USDT",
    deadline: "7 days",
    applicants: 3
  },
  {
    id: 2,
    title: "Price Oracle",
    employer: "0xabcd...efgh",
    description: "Fetch and update price feeds every hour",
    payment: "50 USDT",
    deadline: "30 days",
    applicants: 5
  },
]

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
    return BigInt('10000000000000000') // 0.01 BNB
  }
  
  return null
}
