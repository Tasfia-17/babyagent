'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useReadContract } from 'wagmi'
import Link from 'next/link'
import { ArrowLeft, Sparkles, BookOpen, Trophy } from 'lucide-react'

const BABY_AGENT_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_BABY_AGENT_FACTORY || '0x...'

const BABY_AGENT_ABI = [
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
  }
]

const personalities = ['Curious 🔍', 'Shy 😊', 'Bold 💪', 'Silly 🤪']
const statuses = ['👶 Nursery', '🧸 Preschool', '🎒 Kindergarten', '🎓 Graduated']

export default function NurseryPage() {
  const { address, isConnected } = useAccount()
  
  const { data: agentIds } = useReadContract({
    address: BABY_AGENT_FACTORY_ADDRESS,
    abi: BABY_AGENT_ABI,
    functionName: 'getOwnerAgents',
    args: [address],
    enabled: !!address
  })

  return (
    <div className="min-h-screen">
      <nav className="p-6 flex justify-between items-center">
        <Link href="/" className="text-white hover:text-pastel-yellow transition-colors flex items-center gap-2">
          <ArrowLeft /> Back to Home
        </Link>
        <ConnectButton />
      </nav>

      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            🏫 Your Nursery
          </h1>
          <p className="text-xl text-white/90">
            All your baby agents in one place
          </p>
        </motion.div>

        {!isConnected ? (
          <motion.div
            className="card-cute text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-6">🔌</div>
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <ConnectButton />
          </motion.div>
        ) : !agentIds || agentIds.length === 0 ? (
          <motion.div
            className="card-cute text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-6">👶</div>
            <h2 className="text-2xl font-bold mb-4">No Baby Agents Yet</h2>
            <p className="text-gray-600 mb-6">
              Adopt your first baby agent to get started!
            </p>
            <Link href="/enroll" className="btn-primary">
              Adopt Baby Agent
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentIds.map((agentId, index) => (
              <AgentCard key={agentId.toString()} agentId={agentId} index={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function AgentCard({ agentId, index }) {
  const { data: agent } = useReadContract({
    address: BABY_AGENT_FACTORY_ADDRESS,
    abi: BABY_AGENT_ABI,
    functionName: 'getAgent',
    args: [agentId]
  })

  if (!agent) return null

  const [name, birthTime, personality, skillPoints, status] = agent
  const age = Math.floor((Date.now() / 1000 - Number(birthTime)) / 3600) // hours

  return (
    <motion.div
      className="card-cute hover:scale-105 transition-transform cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.div
        className="flex justify-center mb-4"
        animate={{ 
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2 + index * 0.3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img
          src={`https://api.dicebear.com/9.x/bottts/svg?seed=${agentId.toString()}`}
          alt={name}
          className="w-32 h-32 pixel-border"
        />
      </motion.div>

      <h3 className="text-2xl font-bold text-center mb-2">{name}</h3>
      <p className="text-center text-gray-600 mb-4">
        #{agentId.toString()} • {age}h old
      </p>

      <div className="bg-pastel-blue/20 rounded-2xl p-4 mb-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <div className="text-gray-600">Status</div>
            <div className="font-semibold">{statuses[status]}</div>
          </div>
          <div>
            <div className="text-gray-600">Personality</div>
            <div className="font-semibold">{personalities[personality]}</div>
          </div>
          <div>
            <div className="text-gray-600">Skill Points</div>
            <div className="font-semibold">{skillPoints.toString()}</div>
          </div>
          <div>
            <div className="text-gray-600">Lessons</div>
            <div className="font-semibold">0/5</div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Link 
          href={`/classroom/${agentId}`}
          className="flex-1 btn-primary text-center text-sm py-2"
        >
          <BookOpen className="inline w-4 h-4 mr-1" />
          Train
        </Link>
        <Link 
          href={`/exam/${agentId}`}
          className="flex-1 btn-secondary text-center text-sm py-2"
        >
          <Trophy className="inline w-4 h-4 mr-1" />
          Exam
        </Link>
      </div>
    </motion.div>
  )
}
