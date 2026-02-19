'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BabyAgentAvatar } from './BabyAgentAvatar'
import { GrowingProgressBar } from './GrowingProgressBar'
import { StarBurst } from './StarBurst'

export function AgentCard({ agent, index = 0 }) {
  const { tokenId, name, stage, personality, skillPoints, lessonsCompleted = 0 } = agent
  
  const stageStyles = {
    0: 'card-nursery',
    1: 'card-preschool',
    2: 'card-kindergarten',
    3: 'card-graduated'
  }

  const personalityEmojis = {
    0: '🔍 Curious',
    1: '😊 Shy',
    2: '💪 Bold',
    3: '🤪 Silly'
  }

  return (
    <motion.div
      className={`${stageStyles[stage]} hover:scale-105 hover:shadow-cute-lg transition-all cursor-pointer relative group`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      whileHover={{ y: -10 }}
    >
      {/* Decorative corner stars */}
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <StarBurst size="sm" count={6} />
      </div>

      {/* Avatar section */}
      <div className="flex justify-center mb-6 relative">
        <BabyAgentAvatar 
          seed={tokenId} 
          stage={stage}
          size={120}
        />
      </div>

      {/* Name and ID */}
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-1 font-bubble">
          {name}
        </h3>
        <p className="text-sm text-gray-500">
          Agent #{tokenId} • {Math.floor(Math.random() * 24)}h old
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/60 rounded-2xl p-3 text-center backdrop-blur-sm">
          <div className="text-2xl font-bold text-kawaii-pink-600">{skillPoints}</div>
          <div className="text-xs text-gray-600">Skill Points</div>
        </div>
        <div className="bg-white/60 rounded-2xl p-3 text-center backdrop-blur-sm">
          <div className="text-2xl font-bold text-kawaii-blue-600">{lessonsCompleted}/5</div>
          <div className="text-xs text-gray-600">Lessons</div>
        </div>
      </div>

      {/* Personality badge */}
      <div className="flex justify-center mb-4">
        <motion.div
          className={`badge-${['nursery', 'preschool', 'kindergarten', 'graduated'][stage]}`}
          whileHover={{ scale: 1.1 }}
        >
          {personalityEmojis[personality]}
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <GrowingProgressBar 
          progress={(lessonsCompleted / 5) * 100}
          label="Learning Progress"
          emoji={['🍼', '🎈', '📚', '🎓'][stage]}
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Link href={`/classroom/${tokenId}`} className="flex-1">
          <motion.button
            className="w-full btn-primary text-sm py-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📚 Train
          </motion.button>
        </Link>
        <Link href={`/exam/${tokenId}`} className="flex-1">
          <motion.button
            className="w-full btn-secondary text-sm py-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎯 Exam
          </motion.button>
        </Link>
      </div>

      {/* Floating particles on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            ✨
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
