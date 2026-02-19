'use client'

import { motion } from 'framer-motion'

export function BlobBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Large blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 bg-kawaii-pink-200/30 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-1/4 -right-40 w-96 h-96 bg-kawaii-blue-200/30 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-0 left-1/3 w-96 h-96 bg-kawaii-purple-200/30 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-2/3 right-1/4 w-80 h-80 bg-kawaii-yellow-200/30 rounded-full blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, 60, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Small accent blobs */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-40 h-40 bg-kawaii-green-200/40 rounded-full blur-2xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}
