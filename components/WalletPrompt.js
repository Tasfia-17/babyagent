'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Wallet, X } from 'lucide-react'
import { useState } from 'react'

export function WalletPrompt() {
  const { isConnected } = useAccount()
  const [dismissed, setDismissed] = useState(false)

  if (isConnected || dismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", delay: 2 }}
      >
        <div className="card-cute max-w-sm relative">
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl"
            >
              👛
            </motion.div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold font-heading mb-2">
                Connect Your Wallet
              </h3>
              <p className="text-sm text-gray-600 mb-4 font-body">
                Connect to adopt baby agents and start training!
              </p>
              
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <motion.button
                    onClick={openConnectModal}
                    className="btn-primary w-full text-sm py-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Wallet className="w-4 h-4" />
                      Connect Wallet
                    </span>
                  </motion.button>
                )}
              </ConnectButton.Custom>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
