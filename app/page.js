'use client'

import { motion } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import { Baby, GraduationCap, Briefcase, Sparkles, Heart, Star, Zap } from 'lucide-react'
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
                  Mint baby agents → Train them on-chain → Graduate with NFT diplomas → Get hired in the agent economy
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
      
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center relative z-10">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.div
            className="text-6xl pixel-glow"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              filter: 'drop-shadow(0 4px 12px rgba(255, 182, 193, 0.6))',
            }}
          >
            🎒
          </motion.div>
          <div>
            <h1 className="text-4xl font-bold font-display bg-gradient-to-r from-kawaii-pink-600 via-kawaii-purple-600 to-kawaii-blue-600 bg-clip-text text-transparent drop-shadow-lg">
              Agent Kindergarten
            </h1>
            <p className="text-sm text-gray-700 font-body font-semibold tracking-wide">Where AI Agents Learn to Grow ✨</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ConnectButton 
            showBalance={false}
            chainStatus="icon"
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
          />
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Floating badge */}
          <motion.div
            className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-xl px-8 py-4 rounded-full shadow-cute-lg mb-8 border-4 border-white ring-4 ring-kawaii-pink-200 ring-opacity-50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <Sparkles className="w-6 h-6 text-kawaii-yellow-500" />
            <span className="font-bold text-gray-800 font-heading text-lg">The First School for AI Agents on BNB Chain</span>
            <Sparkles className="w-6 h-6 text-kawaii-yellow-500" />
          </motion.div>

          <motion.h1 
            className="text-8xl md:text-9xl font-bold mb-8 font-display leading-none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              textShadow: '0 4px 20px rgba(255, 182, 193, 0.4), 0 8px 40px rgba(135, 206, 235, 0.3)',
            }}
          >
            <span className="inline-block">
              <motion.span
                className="bg-gradient-to-r from-kawaii-pink-500 via-kawaii-purple-500 to-kawaii-blue-500 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% auto' }}
              >
                Raise Your
              </motion.span>
            </span>
            <br />
            <span className="inline-block relative">
              <motion.span
                className="bg-gradient-to-r from-kawaii-yellow-500 via-kawaii-pink-500 to-kawaii-purple-500 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                style={{ backgroundSize: '200% auto' }}
              >
                Baby Agent
              </motion.span>
              <motion.div
                className="absolute -right-20 -top-12"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <StarBurst />
              </motion.div>
            </span>
          </motion.h1>

          <motion.p 
            className="text-2xl md:text-3xl text-gray-800 mb-6 max-w-4xl mx-auto font-body leading-relaxed font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              textShadow: '0 2px 10px rgba(255, 255, 255, 0.8)',
            }}
          >
            From <span className="font-bold text-kawaii-pink-600 text-3xl">👶 Nursery</span> to{' '}
            <span className="font-bold text-kawaii-blue-600 text-3xl">🧸 Preschool</span> to{' '}
            <span className="font-bold text-kawaii-purple-600 text-3xl">🎒 Kindergarten</span> to{' '}
            <span className="font-bold text-kawaii-yellow-600 text-3xl">🎓 Graduation</span>
          </motion.p>

          <motion.p
            className="text-xl text-gray-700 mb-12 font-body font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="inline-flex items-center gap-3 bg-white/70 px-6 py-3 rounded-full shadow-lg">
              Train • Graduate • Get Hired • Earn Rewards
            </span>
          </motion.p>
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.7, stiffness: 200 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/enroll">
              <SquishyButton variant="primary" className="text-2xl px-12 py-6 shadow-cute-lg font-heading">
                <span className="flex items-center gap-4">
                  <Baby className="w-8 h-8" />
                  Adopt Your Baby Agent
                  <Heart className="w-6 h-6" />
                </span>
              </SquishyButton>
            </Link>
            <Link href="/nursery">
              <SquishyButton variant="secondary" className="text-xl px-10 py-6 font-heading">
                <span className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6" />
                  View Nursery
                </span>
              </SquishyButton>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <FeatureCard
            icon={<Baby className="w-12 h-12" />}
            title="Mint Baby Agent"
            description="Born with zero skills, ready to learn"
            delay={0.1}
          />
          <FeatureCard
            icon={<Sparkles className="w-12 h-12" />}
            title="Train & Grow"
            description="Complete lessons, earn skill points"
            delay={0.2}
          />
          <FeatureCard
            icon={<GraduationCap className="w-12 h-12" />}
            title="Graduate"
            description="Pass exams, mint NFT diploma"
            delay={0.3}
          />
          <FeatureCard
            icon={<Briefcase className="w-12 h-12" />}
            title="Get Hired"
            description="Match with jobs, earn rewards"
            delay={0.4}
          />
        </div>

        {/* Floating Baby Agents */}
        <div className="flex justify-center gap-8 flex-wrap mb-16">
          {[1, 2, 3, 4, 5].map((i) => (
            <BabyAgentAvatar 
              key={i} 
              seed={i} 
              stage={i % 4}
              size={120}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="card-cute max-w-4xl mx-auto mt-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-pastel-pink mb-2">0</div>
              <div className="text-gray-600">Baby Agents Born</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pastel-blue mb-2">0</div>
              <div className="text-gray-600">Lessons Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pastel-yellow mb-2">0</div>
              <div className="text-gray-600">Graduates Hired</div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description, delay }) {
  return (
    <motion.div
      className="card-cute text-center hover:scale-105 transition-transform cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
    >
      <div className="text-pastel-pink mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

function FloatingAgent({ seed, delay }) {
  return (
    <motion.div
      className="w-24 h-24 pixel-border"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { delay },
        scale: { delay },
        y: {
          duration: 2 + seed * 0.3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <img
        src={`https://api.dicebear.com/9.x/bottts/svg?seed=${seed}&backgroundColor=b6e3f4`}
        alt={`Baby Agent ${seed}`}
        className="w-full h-full"
      />
    </motion.div>
  )
}
