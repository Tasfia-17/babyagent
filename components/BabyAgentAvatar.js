'use client'

import { motion } from 'framer-motion'

export function BabyAgentAvatar({ seed, stage = 0, size = 96, animated = true, showAccessories = true }) {
  const stageConfig = {
    0: { emoji: '👶', color: 'from-pink-200 to-rose-200', accessory: '🍼', label: 'Nursery' },
    1: { emoji: '🧸', color: 'from-blue-200 to-sky-200', accessory: '🎈', label: 'Preschool' },
    2: { emoji: '🎒', color: 'from-purple-200 to-violet-200', accessory: '📚', label: 'Kindergarten' },
    3: { emoji: '🎓', color: 'from-yellow-200 to-amber-200', accessory: '🏆', label: 'Graduate' },
  }

  const config = stageConfig[stage]

  const floatAnimation = animated ? {
    animate: { 
      y: [0, -12, 0],
      rotate: [-3, 3, -3]
    },
    transition: { 
      duration: 2.5 + (seed % 3) * 0.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <motion.div 
      className="relative inline-block group"
      {...floatAnimation}
      whileHover={{ scale: 1.1 }}
    >
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${config.color} rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}
        style={{ width: size + 20, height: size + 20, margin: -10 }}
      />
      
      {/* Main avatar */}
      <div 
        className={`relative rounded-full border-4 border-white shadow-cute overflow-hidden bg-gradient-to-br ${config.color}`}
        style={{ width: size, height: size }}
      >
        <img
          src={`https://api.dicebear.com/9.x/bottts/svg?seed=${seed}&backgroundColor=ffffff&eyes=happy,eva,frame1,frame2&mouth=smile01,smile02`}
          alt="Baby Agent"
          className="w-full h-full pixel-border"
        />
        
        {/* Sparkle overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Stage badge */}
      <motion.div
        className="absolute -bottom-2 -right-2 bg-white rounded-full w-10 h-10 flex items-center justify-center border-3 border-white shadow-lg"
        whileHover={{ scale: 1.3, rotate: 360 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="text-xl">{config.emoji}</span>
      </motion.div>
      
      {/* Accessory */}
      {showAccessories && (
        <motion.div
          className="absolute -top-2 -left-2 text-3xl drop-shadow-lg"
          animate={{ 
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {config.accessory}
        </motion.div>
      )}
      
      {/* Hover tooltip */}
      <motion.div
        className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        {config.label}
      </motion.div>
    </motion.div>
  )
}
