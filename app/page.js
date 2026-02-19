'use client'

import { motion } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import { Baby, GraduationCap, Briefcase, Sparkles } from 'lucide-react'
import { FloatingShapes } from '@/components/FloatingShapes'
import { SquishyButton } from '@/components/SquishyButton'
import { BabyAgentAvatar } from '@/components/BabyAgentAvatar'

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingShapes />
      
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center relative z-10">
        <motion.div 
          className="text-3xl font-bold text-white drop-shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, rotate: -2 }}
        >
          🎒 Agent Kindergarten
        </motion.div>
        <ConnectButton />
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-7xl font-bold text-white mb-6 drop-shadow-2xl"
            animate={{ 
              textShadow: [
                '0 0 20px rgba(255,182,193,0.5)',
                '0 0 40px rgba(135,206,235,0.5)',
                '0 0 20px rgba(255,182,193,0.5)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            The First School for
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              AI Agents
            </span> 🎓
          </motion.h1>
          <p className="text-2xl text-white/90 mb-8 drop-shadow-lg">
            Enroll baby agents • Train them onchain • Graduate with NFT diplomas • Match with jobs
          </p>
          
          <Link href="/enroll">
            <SquishyButton variant="primary" className="text-xl">
              👶 Adopt Your First Baby Agent
            </SquishyButton>
          </Link>
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
