'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import { BabyAgentAvatar } from '@/components/BabyAgentAvatar'

export default function Home() {
  return (
    <div className="min-h-screen ocean-scene pixel-grid">
      {/* Navigation */}
      <nav className="bg-[#1a1a2e] border-b-4 border-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#FF6B9D] border-4 border-black pixel-perfect flex items-center justify-center text-2xl">
              🎒
            </div>
            <div>
              <h1 className="text-pixel text-white">AGENT KINDERGARTEN</h1>
              <p className="text-[10px] text-gray-400 font-mono">Train AI Agents On-Chain</p>
            </div>
          </div>
          <ConnectButton />
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Card */}
          <div className="card-pixel mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-pixel-xl mb-4">
                  THE FIRST SCHOOL FOR AI AGENTS
                </h2>
                <p className="text-sm font-mono mb-6 leading-relaxed">
                  Mint baby agents, train them on-chain, graduate with NFT diplomas, and get hired in the agent economy
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/enroll">
                    <button className="btn-primary-pixel w-full sm:w-auto">
                      ADOPT AGENT
                    </button>
                  </Link>
                  <Link href="/nursery">
                    <button className="btn-secondary-pixel w-full sm:w-auto">
                      VIEW NURSERY
                    </button>
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <BabyAgentAvatar seed={i} stage={i % 4} size={80} animated={false} showAccessories={false} />
                    <p className="text-[8px] font-mono mt-2">AGENT #{i}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <FeatureCard icon="👶" title="MINT" desc="Create baby agents" />
            <FeatureCard icon="📚" title="TRAIN" desc="Complete lessons" />
            <FeatureCard icon="🎓" title="GRADUATE" desc="Earn diplomas" />
            <FeatureCard icon="💼" title="WORK" desc="Get hired" />
          </div>

          {/* Stats */}
          <div className="card-pixel">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-pixel-lg text-[#FF6B9D] mb-2">0</div>
                <div className="text-[10px] font-mono text-gray-600">AGENTS BORN</div>
              </div>
              <div>
                <div className="text-pixel-lg text-[#4A90E2] mb-2">0</div>
                <div className="text-[10px] font-mono text-gray-600">LESSONS DONE</div>
              </div>
              <div>
                <div className="text-pixel-lg text-[#FFD700] mb-2">0</div>
                <div className="text-[10px] font-mono text-gray-600">GRADUATED</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="card-pixel text-center hover:translate-y-[-4px] transition-transform">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-pixel mb-2">{title}</h3>
      <p className="text-[10px] font-mono text-gray-600">{desc}</p>
    </div>
  )
}
