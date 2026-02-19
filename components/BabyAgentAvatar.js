'use client'

import { motion } from 'framer-motion'

export function BabyAgentAvatar({ seed, stage = 0, size = 96, animated = true }) {
  const stageEmojis = ['👶', '🧸', '🎒', '🎓']
  const accessories = {
    0: '🍼', // Nursery - bottle
    1: '🧸', // Preschool - teddy
    2: '🎒', // Kindergarten - backpack
    3: '🎓', // Graduated - cap
  }

  const floatAnimation = animated ? {
    animate: { 
      y: [0, -8, 0],
      rotate: [-2, 2, -2]
    },
    transition: { 
      duration: 2.5 + (seed % 3) * 0.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <motion.div 
      className="relative inline-block"
      {...floatAnimation}
    >
      {/* Main avatar */}
      <div 
        className="rounded-full border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-pink-100 to-blue-100"
        style={{ width: size, height: size }}
      >
        <img
          src={`https://api.dicebear.com/9.x/bottts/svg?seed=${seed}&backgroundColor=b6e3f4`}
          alt="Baby Agent"
          className="w-full h-full pixel-border"
        />
      </div>
      
      {/* Stage badge */}
      <motion.div
        className="absolute -bottom-1 -right-1 bg-yellow-300 rounded-full w-8 h-8 flex items-center justify-center border-2 border-white shadow-md"
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="text-lg">{stageEmojis[stage]}</span>
      </motion.div>
      
      {/* Accessory */}
      <motion.div
        className="absolute -top-1 -left-1 text-2xl"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {accessories[stage]}
      </motion.div>
    </motion.div>
  )
}
