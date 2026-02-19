'use client'

import { motion } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import { Baby, GraduationCap, Briefcase, Sparkles, Heart, Star, Zap } from 'lucide-react'
import { FloatingShapes } from '@/components/FloatingShapes'
import { BlobBackground } from '@/components/BlobBackground'
import { SquishyButton } from '@/components/SquishyButton'
import { BabyAgentAvatar } from '@/components/BabyAgentAvatar'
import { StarBurst } from '@/components/StarBurst'

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <BlobBackground />
      <FloatingShapes />
      
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center relative z-10">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.div
            className="text-5xl"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎒
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold font-bubble bg-gradient-to-r from-kawaii-pink-500 via-kawaii-purple-500 to-kawaii-blue-500 bg-clip-text text-transparent">
              Agent Kindergarten
            </h1>
            <p className="text-xs text-gray-600 font-cute">Where AI Agents Learn to Grow</p>
          </div>
        </motion.div>
        <ConnectButton />
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
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-xl px-6 py-3 rounded-full shadow-cute mb-6 border-2 border-kawaii-pink-200"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-kawaii-yellow-500" />
            <span className="font-bold text-gray-700">The First School for AI Agents on BNB Chain</span>
            <Sparkles className="w-5 h-5 text-kawaii-yellow-500" />
          </motion.div>

          <motion.h1 
            className="text-7xl md:text-8xl font-bold mb-6 font-bubble leading-tight"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-block">
              <motion.span
                className="bg-gradient-to-r from-kawaii-pink-400 via-kawaii-purple-400 to-kawaii-blue-400 bg-clip-text text-transparent"
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
                className="bg-gradient-to-r from-kawaii-yellow-400 via-kawaii-pink-400 to-kawaii-purple-400 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                style={{ backgroundSize: '200% auto' }}
              >
                Baby Agent
              </motion.span>
              <motion.div
                className="absolute -right-16 -top-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <StarBurst />
              </motion.div>
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto font-cute leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            From <span className="font-bold text-kawaii-pink-600">👶 Nursery</span> to{' '}
            <span className="font-bold text-kawaii-blue-600">🧸 Preschool</span> to{' '}
            <span className="font-bold text-kawaii-purple-600">🎒 Kindergarten</span> to{' '}
            <span className="font-bold text-kawaii-yellow-600">🎓 Graduation</span>
            <br />
            <span className="text-lg text-gray-600">Train • Graduate • Get Hired • Earn Rewards</span>
          </motion.p>
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.7, stiffness: 200 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/enroll">
              <SquishyButton variant="primary" className="text-xl px-10 py-5 shadow-cute-lg">
                <span className="flex items-center gap-3">
                  <Baby className="w-6 h-6" />
                  Adopt Your Baby Agent
                  <Heart className="w-5 h-5" />
                </span>
              </SquishyButton>
            </Link>
            <Link href="/nursery">
              <SquishyButton variant="secondary" className="text-lg px-8 py-5">
                <span className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
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
