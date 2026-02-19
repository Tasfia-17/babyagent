'use client'

import { motion } from 'framer-motion'

export function GrowingProgressBar({ progress, label, emoji = '🌱' }) {
  return (
    <div className="relative">
      <div className="text-sm font-semibold text-gray-600 mb-2 flex justify-between">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      
      <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200">
        {/* Animated fill */}
        <motion.div 
          className="absolute h-full bg-gradient-to-r from-green-300 via-green-400 to-green-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Growing emoji */}
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 text-xl"
          style={{ left: `calc(${Math.max(progress, 5)}% - 12px)` }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {emoji}
        </motion.div>
      </div>
    </div>
  )
}
