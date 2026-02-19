'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import Link from 'next/link'
import { ArrowLeft, Trophy, AlertCircle } from 'lucide-react'
import { use } from 'react'

const BABY_AGENT_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_BABY_AGENT_FACTORY || ''
const EXAM_VERIFIER_ADDRESS = process.env.NEXT_PUBLIC_EXAM_VERIFIER || ''

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

const EXAM_ABI = [
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
  }
]

const exams = [
  { id: 0, name: "Nursery Graduation", requiredXP: 50, passingScore: 70, emoji: "👶" },
  { id: 1, name: "Preschool Graduation", requiredXP: 150, passingScore: 75, emoji: "🧸" },
  { id: 2, name: "Kindergarten Graduation", requiredXP: 300, passingScore: 80, emoji: "🎓" }
]

export default function ExamPage({ params }) {
  const unwrappedParams = use(params)
  const agentId = unwrappedParams.agentId
  const { address, isConnected } = useAccount()
  const [examInProgress, setExamInProgress] = useState(false)
  const [examScore, setExamScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const { data: agent } = useReadContract({
    address: BABY_AGENT_FACTORY_ADDRESS,
    abi: BABY_AGENT_ABI,
    functionName: 'getAgent',
    args: [BigInt(agentId)]
  })

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  if (!agent) return null

  const [name, birthTime, personality, skillPoints, status] = agent
  const currentExam = exams[status] || exams[0]

  const handleStartExam = () => {
    setExamInProgress(true)
    
    // Simulate exam (in production, this would be actual agent tasks)
    setTimeout(() => {
      const score = Math.floor(Math.random() * 30) + 70 // 70-100
      setExamScore(score)
      setExamInProgress(false)
      setShowResults(true)
    }, 5000)
  }

  const handleSubmitResults = async () => {
    try {
      // Create dummy proof (in production, this would be ZK proof)
      const proof = '0x' + '00'.repeat(32)
      
      await writeContract({
        address: EXAM_VERIFIER_ADDRESS,
        abi: EXAM_ABI,
        functionName: 'submitExamResult',
        args: [BigInt(agentId), BigInt(currentExam.id), BigInt(examScore), proof]
      })
    } catch (error) {
      console.error('Exam submission error:', error)
    }
  }

  const passed = examScore >= currentExam.passingScore
  const hasEnoughXP = Number(skillPoints) >= currentExam.requiredXP

  return (
    <div className="min-h-screen">
      <nav className="p-6 flex justify-between items-center">
        <Link href="/nursery" className="text-white hover:text-pastel-yellow transition-colors flex items-center gap-2">
          <ArrowLeft /> Back to Nursery
        </Link>
        <ConnectButton />
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">{currentExam.emoji}</div>
          <h1 className="text-5xl font-bold text-white mb-4">
            {currentExam.name}
          </h1>
          <p className="text-xl text-white/90">
            {name} is ready to prove their skills!
          </p>
        </motion.div>

        <div className="card-cute mb-8">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={`https://api.dicebear.com/9.x/bottts/svg?seed=${agentId}`}
              alt={name}
              className="w-20 h-20 pixel-border"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-gray-600">Agent #{agentId}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-pastel-pink">{skillPoints.toString()}</div>
              <div className="text-sm text-gray-600">Skill Points</div>
            </div>
          </div>

          <div className="bg-pastel-blue/20 rounded-2xl p-6 mb-6">
            <h3 className="font-bold mb-4">Exam Requirements</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Required Experience</span>
                <span className={`font-bold ${hasEnoughXP ? 'text-green-500' : 'text-red-500'}`}>
                  {skillPoints.toString()} / {currentExam.requiredXP} XP
                  {hasEnoughXP ? ' ✅' : ' ❌'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Passing Score</span>
                <span className="font-bold">{currentExam.passingScore}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Time Limit</span>
                <span className="font-bold">5 minutes</span>
              </div>
            </div>
          </div>

          {!hasEnoughXP && (
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold text-yellow-800 mb-1">Not Ready Yet!</div>
                <div className="text-sm text-yellow-700">
                  {name} needs {currentExam.requiredXP - Number(skillPoints)} more XP to take this exam.
                  Complete more lessons in the classroom!
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleStartExam}
            disabled={!hasEnoughXP || examInProgress}
            className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {examInProgress ? '⏳ Exam in Progress...' : '🎯 Start Exam'}
          </button>
        </div>

        {/* Exam in Progress Modal */}
        <AnimatePresence>
          {examInProgress && (
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
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  📝
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">{name} is taking the exam...</h3>
                <p className="text-gray-600 mb-6">
                  Executing autonomous tasks without human help
                </p>
                <div className="space-y-2 text-left">
                  <ExamTask task="Sign 3 transactions" delay={0} />
                  <ExamTask task="Read contract state" delay={1} />
                  <ExamTask task="Execute token transfer" delay={2} />
                  <ExamTask task="Verify transaction success" delay={3} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Modal */}
        <AnimatePresence>
          {showResults && !isSuccess && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="card-cute max-w-md text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="text-6xl mb-4">{passed ? '🎉' : '😢'}</div>
                <h3 className="text-3xl font-bold mb-2">
                  {passed ? 'Exam Passed!' : 'Not Quite There'}
                </h3>
                <div className="text-6xl font-bold text-pastel-pink mb-4">
                  {examScore}%
                </div>
                <p className="text-gray-600 mb-6">
                  {passed 
                    ? `${name} is ready to graduate! 🎓`
                    : `${name} needs more practice. Try again after more training.`
                  }
                </p>
                {passed ? (
                  <button
                    onClick={handleSubmitResults}
                    disabled={isPending || isConfirming}
                    className="btn-primary w-full"
                  >
                    {isPending || isConfirming ? 'Submitting...' : '🎓 Submit & Graduate'}
                  </button>
                ) : (
                  <Link href={`/classroom/${agentId}`} className="btn-secondary w-full block">
                    📚 Back to Classroom
                  </Link>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Graduation Success */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="card-cute max-w-md text-center"
                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
              >
                <motion.div
                  animate={{ y: [-20, 0], rotate: [0, 360] }}
                  transition={{ duration: 1 }}
                  className="text-6xl mb-4"
                >
                  🎓
                </motion.div>
                <h3 className="text-3xl font-bold mb-2">Congratulations!</h3>
                <p className="text-xl text-gray-600 mb-4">
                  {name} has graduated!
                </p>
                <div className="bg-pastel-yellow/20 rounded-2xl p-4 mb-6">
                  <div className="text-sm text-gray-600 mb-2">Status Updated</div>
                  <div className="text-2xl font-bold">
                    {status === 0 && '🧸 Preschool'}
                    {status === 1 && '🎒 Kindergarten'}
                    {status === 2 && '🎓 Graduate'}
                  </div>
                </div>
                <Link href="/nursery" className="btn-primary w-full block">
                  Back to Nursery
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

function ExamTask({ task, delay }) {
  return (
    <motion.div
      className="flex items-center gap-2 bg-white rounded-lg p-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 1 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay * 1 + 0.5 }}
      >
        ✅
      </motion.div>
      <span className="text-sm">{task}</span>
    </motion.div>
  )
}
