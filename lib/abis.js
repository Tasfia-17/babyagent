export const BABY_AGENT_FACTORY_ABI = [
  {
    "inputs": [{"internalType": "string", "name": "name", "type": "string"}],
    "name": "mintBabyAgent",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mintPrice",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
    "name": "getOwnerAgents",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "getAgent",
    "outputs": [{
      "components": [
        {"internalType": "string", "name": "name", "type": "string"},
        {"internalType": "uint256", "name": "birthTime", "type": "uint256"},
        {"internalType": "uint8", "name": "personality", "type": "uint8"},
        {"internalType": "uint256", "name": "skillPoints", "type": "uint256"},
        {"internalType": "uint8", "name": "status", "type": "uint8"}
      ],
      "internalType": "struct BabyAgentFactory.BabyAgent",
      "name": "",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"},
      {"indexed": false, "internalType": "string", "name": "name", "type": "string"},
      {"indexed": false, "internalType": "address", "name": "owner", "type": "address"},
      {"indexed": false, "internalType": "uint8", "name": "personality", "type": "uint8"}
    ],
    "name": "BabyBorn",
    "type": "event"
  }
]

export const CURRICULUM_ABI = [
  {
    "inputs": [
      {"internalType": "uint256", "name": "agentId", "type": "uint256"},
      {"internalType": "uint256", "name": "lessonId", "type": "uint256"}
    ],
    "name": "completeLesson",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "agentId", "type": "uint256"}],
    "name": "getAgentProgress",
    "outputs": [
      {"internalType": "uint256[]", "name": "completedLessons", "type": "uint256[]"},
      {"internalType": "uint256", "name": "totalExperience", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "lessonId", "type": "uint256"}],
    "name": "getLesson",
    "outputs": [{
      "components": [
        {"internalType": "string", "name": "name", "type": "string"},
        {"internalType": "string", "name": "description", "type": "string"},
        {"internalType": "uint256", "name": "difficulty", "type": "uint256"},
        {"internalType": "uint256", "name": "skillReward", "type": "uint256"},
        {"internalType": "bool", "name": "active", "type": "bool"}
      ],
      "internalType": "struct KindergartenCurriculum.Lesson",
      "name": "",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lessonCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
]

export const EXAM_VERIFIER_ABI = [
  {
    "inputs": [
      {"internalType": "uint256", "name": "agentId", "type": "uint256"},
      {"internalType": "uint256", "name": "examId", "type": "uint256"},
      {"internalType": "uint256", "name": "score", "type": "uint256"},
      {"internalType": "bytes", "name": "proof", "type": "bytes"}
    ],
    "name": "submitExamResult",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "agentId", "type": "uint256"},
      {"internalType": "uint256", "name": "examId", "type": "uint256"}
    ],
    "name": "getExamResult",
    "outputs": [{
      "components": [
        {"internalType": "uint256", "name": "score", "type": "uint256"},
        {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
        {"internalType": "bool", "name": "passed", "type": "bool"}
      ],
      "internalType": "struct SkillExamVerifier.ExamResult",
      "name": "",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  }
]
