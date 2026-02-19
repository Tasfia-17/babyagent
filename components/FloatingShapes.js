'use client'

import { motion } from 'framer-motion'

export function FloatingShapes() {
  const shapes = [
    { emoji: '☁️', x: '10%', y: '20%', duration: 20 },
    { emoji: '⭐', x: '80%', y: '15%', duration: 15 },
    { emoji: '🎈', x: '70%', y: '60%', duration: 25 },
    { emoji: '✨', x: '20%', y: '70%', duration: 18 },
    { emoji: '🌟', x: '90%', y: '80%', duration: 22 },
    { emoji: '💫', x: '15%', y: '40%', duration: 17 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        >
          {shape.emoji}
        </motion.div>
      ))}
    </div>
  )
}
