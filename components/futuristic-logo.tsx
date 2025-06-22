"use client"

import { useEffect, useState } from "react"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function FuturisticLogo({ className = "", size = "md" }: LogoProps) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now() * 0.001)
    }, 16)
    return () => clearInterval(interval)
  }, [])

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{
          filter: "drop-shadow(0 0 10px rgba(255, 107, 0, 0.6))",
        }}
      >
        {/* Outer Quantum Ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#quantumGradient)"
          strokeWidth="1"
          opacity="0.6"
          style={{
            transform: `rotate(${time * 20}deg)`,
            transformOrigin: "50px 50px",
          }}
        />

        {/* Inner Energy Ring */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="url(#energyGradient)"
          strokeWidth="0.5"
          opacity="0.8"
          style={{
            transform: `rotate(${-time * 30}deg)`,
            transformOrigin: "50px 50px",
          }}
        />

        {/* Central Hexagon (Blockchain Symbol) */}
        <polygon
          points="50,20 70,35 70,65 50,80 30,65 30,35"
          fill="url(#coreGradient)"
          stroke="url(#borderGradient)"
          strokeWidth="1"
          opacity="0.9"
          style={{
            transform: `rotate(${time * 10}deg)`,
            transformOrigin: "50px 50px",
          }}
        />

        {/* Inner Hexagon */}
        <polygon
          points="50,30 60,40 60,60 50,70 40,60 40,40"
          fill="url(#innerGradient)"
          opacity="0.7"
          style={{
            transform: `rotate(${-time * 15}deg)`,
            transformOrigin: "50px 50px",
          }}
        />

        {/* Central Core */}
        <circle
          cx="50"
          cy="50"
          r="8"
          fill="url(#coreGlow)"
          style={{
            transform: `scale(${1 + Math.sin(time * 2) * 0.1})`,
            transformOrigin: "50px 50px",
          }}
        />

        {/* Quantum Particles */}
        {[...Array(6)].map((_, i) => (
          <circle
            key={i}
            cx={50 + Math.cos(time * 2 + (i * Math.PI) / 3) * 25}
            cy={50 + Math.sin(time * 2 + (i * Math.PI) / 3) * 25}
            r="1.5"
            fill={`hsl(${25 + i * 10}, 100%, 70%)`}
            opacity="0.8"
            style={{
              filter: `drop-shadow(0 0 3px hsl(${25 + i * 10}, 100%, 70%))`,
            }}
          />
        ))}

        {/* Data Streams */}
        {[...Array(4)].map((_, i) => (
          <path
            key={i}
            d={`M ${50 + Math.cos((i * Math.PI) / 2) * 15} ${50 + Math.sin((i * Math.PI) / 2) * 15} 
                L ${50 + Math.cos((i * Math.PI) / 2 + time) * 40} ${50 + Math.sin((i * Math.PI) / 2 + time) * 40}`}
            stroke={`hsl(${35 + i * 15}, 100%, 60%)`}
            strokeWidth="0.5"
            opacity="0.6"
            style={{
              filter: `drop-shadow(0 0 2px hsl(${35 + i * 15}, 100%, 60%))`,
            }}
          />
        ))}

        {/* Gradients */}
        <defs>
          <radialGradient id="quantumGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 107, 0, 0.8)" />
            <stop offset="50%" stopColor="rgba(255, 165, 0, 0.6)" />
            <stop offset="100%" stopColor="rgba(255, 69, 0, 0.4)" />
          </radialGradient>

          <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 140, 0, 0.8)" />
            <stop offset="100%" stopColor="rgba(255, 69, 0, 0.6)" />
          </linearGradient>

          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 165, 0, 0.9)" />
            <stop offset="70%" stopColor="rgba(255, 107, 0, 0.7)" />
            <stop offset="100%" stopColor="rgba(255, 69, 0, 0.5)" />
          </radialGradient>

          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 165, 0, 0.8)" />
            <stop offset="100%" stopColor="rgba(255, 107, 0, 0.6)" />
          </linearGradient>

          <radialGradient id="innerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 215, 0, 0.6)" />
            <stop offset="100%" stopColor="rgba(255, 140, 0, 0.4)" />
          </radialGradient>

          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
            <stop offset="30%" stopColor="rgba(255, 215, 0, 0.8)" />
            <stop offset="70%" stopColor="rgba(255, 165, 0, 0.6)" />
            <stop offset="100%" stopColor="rgba(255, 107, 0, 0.4)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}
