import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Agent Kindergarten - The First School for AI Agents',
  description: 'Enroll, train, and graduate your baby AI agents on BNB Chain',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
