'use client'

import { motion } from 'framer-motion'

export function PixelHeart({ size = 32, animated = true }) {
  const pixels = [
    [0,1,1,0,1,1,0],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0],
    [0,0,0,1,0,0,0],
  ]

  const pixelSize = size / 7

  return (
    <motion.div 
      className="inline-block relative"
      animate={animated ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <svg width={size} height={size * 6/7} className="pixel-art">
        {pixels.map((row, y) =>
          row.map((pixel, x) =>
            pixel ? (
              <motion.rect
                key={`${x}-${y}`}
                x={x * pixelSize}
                y={y * pixelSize}
                width={pixelSize}
                height={pixelSize}
                fill="url(#heartGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (x + y) * 0.05 }}
              />
            ) : null
          )
        )}
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="100%" stopColor="#FF9AB5" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

export function PixelStar({ size = 32, animated = true }) {
  const pixels = [
    [0,0,1,0,0],
    [0,1,1,1,0],
    [1,1,1,1,1],
    [0,1,1,1,0],
    [1,0,1,0,1],
  ]

  const pixelSize = size / 5

  return (
    <motion.div 
      className="inline-block"
      animate={animated ? { rotate: 360 } : {}}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      <svg width={size} height={size} className="pixel-art">
        {pixels.map((row, y) =>
          row.map((pixel, x) =>
            pixel ? (
              <rect
                key={`${x}-${y}`}
                x={x * pixelSize}
                y={y * pixelSize}
                width={pixelSize}
                height={pixelSize}
                fill="url(#starGradient)"
              />
            ) : null
          )
        )}
        <defs>
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC107" />
            <stop offset="100%" stopColor="#FFDC7A" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

export function PixelSparkle({ size = 24 }) {
  return (
    <motion.svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      className="pixel-art inline-block"
      animate={{ 
        scale: [1, 1.3, 1],
        rotate: [0, 180, 360]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <rect x="11" y="0" width="2" height="24" fill="url(#sparkleGradient)" />
      <rect x="0" y="11" width="24" height="2" fill="url(#sparkleGradient)" />
      <rect x="6" y="6" width="12" height="12" fill="url(#sparkleGradient)" transform="rotate(45 12 12)" />
      <defs>
        <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE5EC" />
          <stop offset="50%" stopColor="#FFF8DC" />
          <stop offset="100%" stopColor="#E0F4FF" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}
