// Kawaii Design System Constants

export const colors = {
  // Pastel palette
  pastelPink: '#FFB6C1',
  pastelBlue: '#87CEEB',
  pastelYellow: '#FFF8DC',
  pastelGreen: '#B4FFD4',
  pastelPurple: '#E6B3FF',
  pastelCream: '#FFF8DC',
  
  // Gradients
  gradients: {
    nursery: 'from-pink-50 to-pink-100',
    preschool: 'from-blue-50 to-blue-100',
    kindergarten: 'from-purple-50 to-purple-100',
    graduated: 'from-yellow-50 to-yellow-100',
  }
}

export const animations = {
  // Spring physics
  squish: {
    whileTap: { scale: 0.95 },
    whileHover: { scale: 1.05 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  
  // Floating
  float: {
    animate: { y: [0, -10, 0] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  },
  
  // Bounce entrance
  bounceIn: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 260, damping: 20 }
  },
  
  // Wiggle
  wiggle: {
    animate: { rotate: [-3, 3, -3] },
    transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
  }
}

export const shadows = {
  cute: '0_8px_0_rgb(251,207,232)',
  cutePressed: '0_4px_0_rgb(251,207,232)',
  soft: '0 10px 40px rgba(255, 182, 193, 0.3)',
}
