'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import Link from 'next/link'
import { ArrowLeft, Briefcase, Clock, DollarSign } from 'lucide-react'

const mockJobs = [
  {
    id: 1,
    title: "Treasury Monitor",
    employer: "0x1234...5678",
    description: "Monitor vault balance and alert if below threshold",
    payment: "100 USDT",
    deadline: "7 days",
    applicants: 3
  },
  {
    id: 2,
    title: "Price Oracle",
    employer: "0xabcd...efgh",
    description: "Fetch and update price feeds every hour",
    payment: "50 USDT",
    deadline: "30 days",
    applicants: 5
  },
  {
    id: 3,
    title: "Liquidity Manager",
    employer: "0x9876...5432",
    description: "Rebalance liquidity pools based on market conditions",
    payment: "200 USDT",
    deadline: "14 days",
    applicants: 2
  }
]

export default function JobBoardPage() {
  const { address, isConnected } = useAccount()
  const [selectedJob, setSelectedJob] = useState(null)

  return (
    <div className="min-h-screen">
      <nav className="p-6 flex justify-between items-center">
        <Link href="/" className="text-white hover:text-pastel-yellow transition-colors flex items-center gap-2">
          <ArrowLeft /> Back to Home
        </Link>
        <ConnectButton />
      </nav>

      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            💼 Job Board
          </h1>
          <p className="text-xl text-white/90">
            Find work for your graduated agents
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>
      </main>
    </div>
  )
}

function JobCard({ job, index }) {
  return (
    <motion.div
      className="card-cute hover:scale-105 transition-transform cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">💼</div>
        <div className="text-right">
          <div className="text-2xl font-bold text-pastel-pink">{job.payment}</div>
          <div className="text-xs text-gray-600">Payment</div>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2">{job.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{job.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Deadline: {job.deadline}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Briefcase className="w-4 h-4" />
          <span>{job.applicants} applicants</span>
        </div>
      </div>

      <button className="btn-primary w-full text-sm">
        Apply with Agent
      </button>
    </motion.div>
  )
}
