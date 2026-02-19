'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Star, CheckCircle, Lock } from 'lucide-react'
import { use } from 'react'

const BABY_AGENT_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_BABY_AGENT_FACTORY || ''
const CURRICULUM_ADDRESS = process.env.NEXT_PUBLIC_CURRICULUM || ''

const BABY_AGENT_ABI = [
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
  }
]

const CURRICULUM_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "agentId", "type": "uint256"}, {"internalType": "uint256", "name": "lessonId", "type": "uint256"}],
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
  }
]

const lessons = [
  { id: 0, name: "Hello Blockchain", description: "Learn to read blockchain data", difficulty: 1, reward: 10, emoji: "👋" },
  { id: 1, name: "Signing Practice", description: "Sign your first transaction", difficulty: 2, reward: 20, emoji: "✍️" },
  { id: 2, name: "Token Transfer", description: "Send tokens safely", difficulty: 3, reward: 30, emoji: "💸" },
  { id: 3, name: "Smart Contract Call", description: "Interact with contracts", difficulty: 5, reward: 50, emoji: "📜" },
  { id: 4, name: "DeFi Basics", description: "Understand swaps and liquidity", difficulty: 7, reward: 70, emoji: "🏦" }
]

export default function ClassroomPage({ params }) {
  const unwrappedParams = use(params)
  const agentId = unwrappedParams.agentId
  const { address, isConnected } = useAccount()
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [isTraining, setIsTraining] = useState(false)

  const { data: agent } = useReadContract({
    address: BABY_AGENT_FACTORY_ADDRESS,
    abi: BABY_AGENT_ABI,
    functionName: 'getAgent',
    args: [BigInt(agentId)]
  })

  const { data: progress } = useReadContract({
    address: CURRICULUM_ADDRESS,
    abi: CURRICULUM_ABI,
    functionName: 'getAgentProgress',
    args: [BigInt(agentId)]
  })

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const completedLessons = progress ? progress[0].map(id => Number(id)) : []

  const handleStartLesson = async (lessonId) => {
    setSelectedLesson(lessonId)
    setIsTraining(true)

    // Simulate training animation
    setTimeout(async () => {
      try {
        await writeContract({
          address: CURRICULUM_ADDRESS,
          abi: CURRICULUM_ABI,
          functionName: 'completeLesson',
          args: [BigInt(agentId), BigInt(lessonId)]
        })
      } catch (error) {
        console.error('Lesson completion error:', error)
      }
      setIsTraining(false)
    }, 3000)
  }

  if (!agent) return null

  const [name, birthTime, personality, skillPoints, status] = agent

  return (
    <div className="min-h-screen">
      <nav className="p-6 flex justify-between items-center">
        <Link href="/nursery" className="text-white hover:text-pastel-yellow transition-colors flex items-center gap-2">
          <ArrowLeft /> Back to Nursery
        </Link>
        <ConnectButton />
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <img
                src={`https://api.dicebear.com/9.x/bottts/svg?seed=${agentId}`}
                alt={name}
                className="w-20 h-20 pixel-border"
              />
              <div>
                <h1 className="text-4xl font-bold text-white">{name}'s Classroom</h1>
                <p className="text-white/90">Skill Points: {skillPoints.toString()} ⭐</p>
              </div>
            </div>
          </div>

          <div className="card-cute mb-8">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600 mb-1">Learning Progress</div>
                <div className="text-2xl font-bold">{completedLessons.length}/5 Lessons</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Total Experience</div>
                <div className="text-2xl font-bold">{progress ? progress[1].toString() : 0} XP</div>
              </div>
            </div>
            <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pastel-pink to-pastel-blue"
                initial={{ width: 0 }}
                animate={{ width: `${(completedLessons.length / 5) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id)
            const isLocked = index > 0 && !completedLessons.includes(index - 1)

            return (
              <motion.div
                key={lesson.id}
                className={`card-cute ${isLocked ? 'opacity-50' : 'hover:scale-105'} transition-all cursor-pointer relative`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => !isLocked && !isCompleted && handleStartLesson(lesson.id)}
              >
                {isCompleted && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                )}
                {isLocked && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-8 h-8 text-gray-400" />
                  </div>
                )}

                <div className="text-5xl mb-4 text-center">{lesson.emoji}</div>
                <h3 className="text-xl font-bold mb-2 text-center">{lesson.name}</h3>
                <p className="text-gray-600 text-sm mb-4 text-center">{lesson.description}</p>

                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm">
                    <span className="text-gray-600">Difficulty:</span>
                    <div className="flex gap-1 mt-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < lesson.difficulty ? 'bg-pastel-pink' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Reward</div>
                    <div className="font-bold text-pastel-yellow">+{lesson.reward} XP</div>
                  </div>
                </div>

                {isCompleted ? (
                  <div className="btn-secondary w-full text-center opacity-50 cursor-not-allowed">
                    ✅ Completed
                  </div>
                ) : isLocked ? (
                  <div className="btn-secondary w-full text-center opacity-50 cursor-not-allowed">
                    🔒 Locked
                  </div>
                ) : (
                  <div className="btn-primary w-full text-center">
                    📚 Start Lesson
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Training Modal */}
        <AnimatePresence>
          {isTraining && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="card-cute max-w-md text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-6xl mb-4"
                >
                  {lessons[selectedLesson]?.emoji}
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">{name} is learning...</h3>
                <p className="text-gray-600 mb-4">{lessons[selectedLesson]?.name}</p>
                <div className="flex justify-center gap-2">
                  <motion.div
                    className="w-3 h-3 bg-pastel-pink rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-pastel-blue rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-pastel-yellow rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Modal */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => window.location.reload()}
            >
              <motion.div
                className="card-cute max-w-md text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold mb-2">Lesson Complete!</h3>
                <p className="text-xl text-gray-600 mb-4">
                  {name} earned +{lessons[selectedLesson]?.reward} XP!
                </p>
                <Star className="w-16 h-16 text-pastel-yellow mx-auto mb-4" />
                <button
                  onClick={() => window.location.reload()}
                  className="btn-primary"
                >
                  Continue Learning
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
