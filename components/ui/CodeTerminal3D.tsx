'use client'

import { motion } from 'framer-motion'
import {
  Server,
  ShieldCheck,
  Cpu,
  Zap,
  Activity,
  Layers,
  CheckCircle2,
  Lock,
  Globe,
  Database,
} from 'lucide-react'

export default function CodeTerminal3D() {
  return (
    <div className="w-full max-w-[520px]">
      {/* Main Glass HUD Panel */}
      <div className="relative rounded-3xl border border-white/15 bg-[#0D0D12]/85 p-6 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.85)] space-y-6 overflow-hidden transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_30px_70px_rgba(168,85,247,0.15)]">
        
        {/* Ambient Corner Glow */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/15 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <Server className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white">SYSTEM ARCHITECTURE</span>
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[10px] font-mono text-zinc-400">CLUSTER :: US-EAST-1 // ONLINE</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-mono font-medium text-emerald-400 shadow-inner">
            <CheckCircle2 className="h-3 w-3" />
            <span>99.98% UPTIME</span>
          </div>
        </div>

        {/* System Node Topology Graph Visualizer */}
        <div className="relative rounded-2xl border border-white/10 bg-zinc-950/70 p-4 space-y-3 overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-white/5 pb-2">
            <span className="flex items-center gap-1.5 text-purple-300">
              <Layers className="h-3.5 w-3.5" />
              ACTIVE PIPELINE
            </span>
            <span>LATENCY :: 12ms</span>
          </div>

          {/* Node Flow Map */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
            
            {/* Node 1: Auth */}
            <div className="relative rounded-xl border border-purple-500/20 bg-purple-500/10 p-2.5 space-y-1">
              <div className="flex items-center justify-center gap-1 text-purple-300 text-[11px] font-semibold">
                <Lock className="h-3 w-3" />
                OAuth / JWT
              </div>
              <p className="text-[9px] text-zinc-400">Rate Limited</p>
            </div>

            {/* Node 2: API Gateway */}
            <div className="relative rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-2.5 space-y-1">
              <div className="flex items-center justify-center gap-1 text-indigo-300 text-[11px] font-semibold">
                <Globe className="h-3 w-3" />
                REST Gateway
              </div>
              <p className="text-[9px] text-zinc-400">Throttled Layer</p>
            </div>

            {/* Node 3: Database */}
            <div className="relative rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2.5 space-y-1">
              <div className="flex items-center justify-center gap-1 text-cyan-300 text-[11px] font-semibold">
                <Database className="h-3 w-3" />
                MongoDB
              </div>
              <p className="text-[9px] text-zinc-400">Indexed Queries</p>
            </div>

          </div>

          {/* Animated Flow Pulse Line */}
          <div className="relative h-1 w-full rounded-full bg-zinc-900 overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
              className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_10px_#c084fc]"
            />
          </div>
        </div>

        {/* Live Performance Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          
          {/* Card 1: API Security */}
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-3.5 space-y-1.5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-zinc-400 text-[10px]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                RBAC Security
              </span>
              <span className="text-emerald-400 font-bold">PASS</span>
            </div>
            <p className="text-sm font-semibold text-white">5 Tiers Active</p>
          </div>

          {/* Card 2: Optimization */}
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-3.5 space-y-1.5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-zinc-400 text-[10px]">
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-purple-400" />
                Optimization
              </span>
              <span className="text-purple-300 font-bold">-30% Latency</span>
            </div>
            <p className="text-sm font-semibold text-white">Express / NestJS</p>
          </div>

        </div>

        {/* Telemetry Stream Footer */}
        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-zinc-950/80 px-3.5 py-2 text-[10px] font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
            <span>REALTIME_LOGS :: HTTP/2 POST /api/v1/auth 200 OK</span>
          </div>
          <span className="text-purple-300 font-bold">14ms</span>
        </div>

      </div>
    </div>
  )
}