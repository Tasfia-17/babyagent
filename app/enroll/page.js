'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import Link from 'next/link'
import { ArrowLeft, Sparkles } from 'lucide-react'

const BABY_AGENT_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_BABY_AGENT_FACTORY || '0x...'

const BABY_AGENT_ABI = [
  {
    "inputs": [{"internalType": "string", "name": "name", "type": "string"}],
    "name": "mintBabyAgent",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  }
]

const cuteNames = [
  'Bubbles', 'Sprout', 'Pixel', 'Nugget', 'Mochi',
  'Biscuit', 'Peanut', 'Cookie', 'Waffle', 'Pudding',
  'Jellybean', 'Cupcake', 'Marshmallow', 'Toffee', 'Caramel'
]

const personalities = [
  { id: 0, name: 'Curious', emoji: '🔍', description: 'Always asking questions' },
  { id: 1, name: 'Shy', emoji: '😊', description: 'Takes time to warm up' },
  { id: 2, name: 'Bold', emoji: '💪', description: 'Fearless and confident' },
  { id: 3, name: 'Silly', emoji: '🤪', description: 'Loves to play and joke' }
]

export default function EnrollPage() {
  const { address, isConnected } = useAccount()
  const [agentName, setAgentName] = useState('')
  const [previewSeed, setPreviewSeed] = useState(Math.random().toString())
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const generateRandomName = () => {
    const randomName = cuteNames[Math.floor(Math.random() * cuteNames.length)]
    setAgentName(randomName)
    setPreviewSeed(Math.random().toString())
  }

  const handleMint = async () => {
    if (!agentName) {
      alert('Please give your baby agent a name! 👶')
      return
    }

    try {
      await writeContract({
        address: BABY_AGENT_FACTORY_ADDRESS,
        abi: BABY_AGENT_ABI,
        functionName: 'mintBabyAgent',
        args: [agentName],
        value: parseEther('0.01')
      })
    } catch (error) {
      console.error('Minting error:', error)
    }
  }

  return (
    <div className="min-h-screen">
      <nav className="p-6 flex justify-between items-center">
        <Link href="/" className="text-white hover:text-pastel-yellow transition-colors flex items-center gap-2">
          <ArrowLeft /> Back to Home
        </Link>
        <ConnectButton />
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            👶 Adopt a Baby Agent
          </h1>
          <p className="text-xl text-white/90">
            Every agent starts somewhere. Give yours a name and watch them grow!
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
            <p className="text-gray-600 mb-6">
              You'll need to connect your wallet to adopt a baby agent
            </p>
            <ConnectButton />
          </motion.div>
        ) : isSuccess ? (
          <motion.div
            className="card-cute text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
            <p className="text-xl text-gray-600 mb-6">
              {agentName} has been born! 👶
            </p>
            <div className="flex justify-center mb-6">
              <img
                src={`https://api.dicebear.com/9.x/bottts/svg?seed=${previewSeed}`}
                alt={agentName}
                className="w-32 h-32 pixel-border"
              />
            </div>
            <Link href="/nursery" className="btn-primary">
              Go to Nursery 🎒
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Preview */}
            <motion.div
              className="card-cute"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Preview</h2>
              
              <motion.div
                className="flex justify-center mb-6"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img
                  src={`https://api.dicebear.com/9.x/bottts/svg?seed=${previewSeed}`}
                  alt="Baby Agent Preview"
                  className="w-48 h-48 pixel-border"
                />
              </motion.div>

              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">
                  {agentName || 'Unnamed Agent'}
                </h3>
                <p className="text-gray-600 mb-4">Age: 0 hours old</p>
                
                <div className="bg-pastel-blue/20 rounded-2xl p-4">
                  <div className="text-sm text-gray-600 mb-2">Birth Traits</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Skills: 0</div>
                    <div>Experience: 0</div>
                    <div>Status: 👶 Nursery</div>
                    <div>Personality: 🎲 Random</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="card-cute"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6">Agent Details</h2>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Agent Name *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="Enter a cute name..."
                    className="flex-1 px-4 py-3 rounded-2xl border-2 border-pastel-pink focus:outline-none focus:border-pastel-blue transition-colors"
                    maxLength={20}
                  />
                  <button
                    onClick={generateRandomName}
                    className="btn-secondary"
                  >
                    🎲
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Choose wisely! This name is permanent.
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Personality (Random at Birth)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {personalities.map((p) => (
                    <div
                      key={p.id}
                      className="bg-pastel-yellow/20 rounded-xl p-3 text-center"
                    >
                      <div className="text-2xl mb-1">{p.emoji}</div>
                      <div className="font-semibold text-sm">{p.name}</div>
                      <div className="text-xs text-gray-600">{p.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-pastel-green/20 rounded-2xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Adoption Fee</span>
                  <span className="text-2xl font-bold">0.01 BNB</span>
                </div>
                <p className="text-xs text-gray-600">
                  Includes: ERC-8004 identity, BAP-578 NFA, lifetime access to kindergarten
                </p>
              </div>

              <button
                onClick={handleMint}
                disabled={isPending || isConfirming || !agentName}
                className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending || isConfirming ? (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="animate-spin" />
                    {isPending ? 'Confirm in wallet...' : 'Minting baby agent...'}
                  </span>
                ) : (
                  '👶 Adopt Baby Agent (0.01 BNB)'
                )}
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                By adopting, you agree to raise your agent with love and care 💕
              </p>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  )
}
