'use client'

import { motion } from 'framer-motion'

export function SquishyButton({ children, onClick, variant = 'primary', disabled = false, className = '' }) {
  const variants = {
    primary: 'bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white',
    secondary: 'bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white',
    success: 'bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white',
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-full font-bold
        shadow-[0_6px_0_rgba(0,0,0,0.1)]
        active:shadow-[0_2px_0_rgba(0,0,0,0.1)]
        active:translate-y-1
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-150
        ${variants[variant]}
        ${className}
      `}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  )
}
