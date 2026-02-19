'use client'

import { motion } from 'framer-motion'

export function BabyAgentAvatar({ seed, stage = 0, size = 96, animated = true, showAccessories = true }) {
  const stageConfig = {
    0: { emoji: '👶', color: 'from-pink-200 via-rose-200 to-pink-300', accessory: '🍼', label: 'Nursery', ring: 'ring-pink-300' },
    1: { emoji: '🧸', color: 'from-blue-200 via-sky-200 to-blue-300', accessory: '🎈', label: 'Preschool', ring: 'ring-blue-300' },
    2: { emoji: '🎒', color: 'from-purple-200 via-violet-200 to-purple-300', accessory: '📚', label: 'Kindergarten', ring: 'ring-purple-300' },
    3: { emoji: '🎓', color: 'from-yellow-200 via-amber-200 to-yellow-300', accessory: '🏆', label: 'Graduate', ring: 'ring-yellow-300' },
  }

  const config = stageConfig[stage]

  const floatAnimation = animated ? {
    animate: { 
      y: [0, -15, 0],
      rotate: [-4, 4, -4]
    },
    transition: { 
      duration: 3 + (seed % 3) * 0.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <motion.div 
      className="relative inline-block group"
      {...floatAnimation}
      whileHover={{ scale: 1.15, rotate: 0 }}
    >
      {/* Outer glow ring */}
      <motion.div 
        className={`absolute inset-0 rounded-full ${config.ring} ring-8 ring-opacity-30 blur-md`}
        style={{ width: size + 30, height: size + 30, margin: -15 }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Gradient glow */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${config.color} rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-300`}
        style={{ width: size + 20, height: size + 20, margin: -10 }}
      />
      
      {/* Main avatar container */}
      <div 
        className={`relative rounded-full border-[6px] border-white shadow-cute-lg overflow-hidden bg-gradient-to-br ${config.color} ring-4 ${config.ring} ring-opacity-50`}
        style={{ width: size, height: size }}
      >
        {/* Pixel art avatar */}
        <img
          src={`https://api.dicebear.com/9.x/bottts/svg?seed=${seed}&backgroundColor=ffffff&eyes=happy,eva,frame1,frame2,dizzy,hearts&mouth=smile01,smile02,grill01,grill02&texture=circuits`}
          alt="Baby Agent"
          className="w-full h-full pixel-art"
          style={{
            filter: 'contrast(1.15) saturate(1.3) brightness(1.05)',
          }}
        />
        
        {/* Animated sparkle overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
          animate={{ 
            x: ['-100%', '200%'],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Pixel border effect */}
        <div className="absolute inset-0 rounded-full" style={{
          boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.5), inset 0 0 20px rgba(255,255,255,0.3)'
        }} />
      </div>
      
      {/* Stage badge with pixel style */}
      <motion.div
        className="absolute -bottom-3 -right-3 bg-white rounded-full w-12 h-12 flex items-center justify-center border-4 border-white shadow-cute ring-4 ring-opacity-50"
        style={{ 
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        }}
        whileHover={{ scale: 1.4, rotate: 360 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="text-2xl filter drop-shadow-md">{config.emoji}</span>
      </motion.div>
      
      {/* Accessory with pixel glow */}
      {showAccessories && (
        <motion.div
          className="absolute -top-3 -left-3 text-4xl pixel-glow"
          animate={{ 
            rotate: [0, 20, -20, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2)) drop-shadow(0 0 12px currentColor)',
          }}
        >
          {config.accessory}
        </motion.div>
      )}
      
      {/* Hover tooltip with better visibility */}
      <motion.div
        className="absolute -top-16 left-1/2 -translate-x-1/2 bg-gradient-to-r from-white to-gray-50 px-5 py-2 rounded-full text-sm font-bold shadow-cute-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border-3 border-white ring-2 ring-gray-200"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        <span className="bg-gradient-to-r from-kawaii-pink-600 to-kawaii-purple-600 bg-clip-text text-transparent font-heading">
          {config.label}
        </span>
      </motion.div>

      {/* Floating particles around avatar */}
      {animated && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl"
              style={{
                left: `${30 + i * 20}%`,
                top: `${20 + i * 30}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 10, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.8,
              }}
            >
              ✨
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  )
}
