'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function ConfettiBurst({ trigger = false }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * -100 - 50,
        rotation: Math.random() * 360,
        color: ['#FFB6C1', '#87CEEB', '#FFF8DC', '#B4FFD4', '#E6B3FF'][Math.floor(Math.random() * 5)],
        size: Math.random() * 10 + 5,
      }))
      setParticles(newParticles)
      
      setTimeout(() => setParticles([]), 3000)
    }
  }, [trigger])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ 
            x: 0, 
            y: 0, 
            opacity: 1,
            rotate: 0,
            scale: 0
          }}
          animate={{ 
            x: particle.x * 5,
            y: particle.y * 5,
            opacity: 0,
            rotate: particle.rotation,
            scale: 1
          }}
          transition={{ 
            duration: 2,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}
