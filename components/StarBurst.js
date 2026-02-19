'use client'

import { motion } from 'framer-motion'

export function StarBurst({ count = 8, size = 'md' }) {
  const sizes = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  return (
    <div className="relative w-12 h-12">
      {Array.from({ length: count }).map((_, i) => {
        const angle = (360 / count) * i
        const distance = 20
        
        return (
          <motion.div
            key={i}
            className={`absolute top-1/2 left-1/2 ${sizes[size]} bg-yellow-400 rounded-full`}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{
              scale: [0, 1, 0],
              x: Math.cos((angle * Math.PI) / 180) * distance,
              y: Math.sin((angle * Math.PI) / 180) * distance,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        )
      })}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl"
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ⭐
      </motion.div>
    </div>
  )
}
