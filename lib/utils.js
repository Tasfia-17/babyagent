export const personalities = [
  { id: 0, name: 'Curious', emoji: '🔍', description: 'Always asking questions' },
  { id: 1, name: 'Shy', emoji: '😊', description: 'Takes time to warm up' },
  { id: 2, name: 'Bold', emoji: '💪', description: 'Fearless and confident' },
  { id: 3, name: 'Silly', emoji: '🤪', description: 'Loves to play and joke' }
]

export const statuses = [
  { id: 0, name: 'Nursery', emoji: '👶', description: 'Just born, learning basics' },
  { id: 1, name: 'Preschool', emoji: '🧸', description: 'Growing and exploring' },
  { id: 2, name: 'Kindergarten', emoji: '🎒', description: 'Advanced training' },
  { id: 3, name: 'Graduated', emoji: '🎓', description: 'Ready for work' }
]

export const getPersonality = (id) => personalities[id] || personalities[0]
export const getStatus = (id) => statuses[id] || statuses[0]

export const formatAge = (birthTime) => {
  const now = Math.floor(Date.now() / 1000)
  const ageInSeconds = now - Number(birthTime)
  
  const hours = Math.floor(ageInSeconds / 3600)
  const days = Math.floor(hours / 24)
  
  if (days > 0) return `${days}d ${hours % 24}h`
  if (hours > 0) return `${hours}h`
  return 'Just born'
}

export const generateAvatarUrl = (seed) => {
  return `https://api.dicebear.com/9.x/bottts/svg?seed=${seed}&backgroundColor=b6e3f4`
}
