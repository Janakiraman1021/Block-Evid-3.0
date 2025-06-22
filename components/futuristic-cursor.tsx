"use client"

import { useEffect, useState, useRef, useCallback } from "react"

interface DNAStrand {
  id: number
  angle: number
  height: number
  phase: number
  evolution: number
}

interface QuantumParticle {
  id: number
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  entangled: boolean
  consciousness: number
}

interface RealityRipple {
  id: number
  x: number
  y: number
  intensity: number
  timestamp: number
  dimension: number
}

interface ConsciousnessStream {
  id: number
  points: { x: number; y: number; consciousness: number }[]
  timestamp: number
}

export default function FuturisticCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [consciousnessMode, setConsciousnessMode] = useState<"evolve" | "quantum" | "reality" | "time" | "dimension">(
    "evolve",
  )
  const [dnaStrands, setDnaStrands] = useState<DNAStrand[]>([])
  const [quantumParticles, setQuantumParticles] = useState<QuantumParticle[]>([])
  const [realityRipples, setRealityRipples] = useState<RealityRipple[]>([])
  const [consciousnessStreams, setConsciousnessStreams] = useState<ConsciousnessStream[]>([])
  const [isManipulating, setIsManipulating] = useState(false)
  const [timeDistortion, setTimeDistortion] = useState(1)
  const animationRef = useRef<number>()
  const streamIdRef = useRef(0)
  const rippleIdRef = useRef(0)

  // Initialize DNA strands
  useEffect(() => {
    const strands: DNAStrand[] = []
    for (let i = 0; i < 4; i++) {
      strands.push({
        id: i,
        angle: (i * Math.PI) / 2,
        height: 0,
        phase: Math.random() * Math.PI * 2,
        evolution: Math.random(),
      })
    }
    setDnaStrands(strands)

    // Initialize quantum particles
    const particles: QuantumParticle[] = []
    for (let i = 0; i < 12; i++) {
      particles.push({
        id: i,
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        z: (Math.random() - 0.5) * 50,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: (Math.random() - 0.5) * 1,
        entangled: Math.random() > 0.5,
        consciousness: Math.random(),
      })
    }
    setQuantumParticles(particles)
  }, [])

  // Advanced animation system
  useEffect(() => {
    const animate = () => {
      const time = Date.now() * 0.001 * timeDistortion

      // Evolve DNA strands
      setDnaStrands((prev) =>
        prev.map((strand) => ({
          ...strand,
          angle: strand.angle + 0.02 * timeDistortion,
          height: Math.sin(time + strand.phase) * 30,
          evolution: (strand.evolution + 0.001) % 1,
        })),
      )

      // Quantum particle behavior
      setQuantumParticles((prev) =>
        prev.map((particle) => {
          let newX = particle.x + particle.vx * timeDistortion
          let newY = particle.y + particle.vy * timeDistortion
          const newZ = particle.z + particle.vz * timeDistortion

          // Quantum tunneling effect
          if (Math.random() < 0.01) {
            newX = (Math.random() - 0.5) * 100
            newY = (Math.random() - 0.5) * 100
          }

          // Consciousness evolution
          const newConsciousness = (particle.consciousness + 0.005) % 1

          return {
            ...particle,
            x: newX,
            y: newY,
            z: newZ,
            consciousness: newConsciousness,
            vx: particle.vx + (Math.random() - 0.5) * 0.1,
            vy: particle.vy + (Math.random() - 0.5) * 0.1,
            vz: particle.vz + (Math.random() - 0.5) * 0.05,
          }
        }),
      )

      // Clean up old effects
      setRealityRipples((prev) => prev.filter((ripple) => Date.now() - ripple.timestamp < 3000))
      setConsciousnessStreams((prev) => prev.filter((stream) => Date.now() - stream.timestamp < 2000))

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [timeDistortion])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })

    // Create consciousness streams
    if (Math.random() < 0.3) {
      const points = []
      for (let i = 0; i < 5; i++) {
        points.push({
          x: e.clientX + (Math.random() - 0.5) * 200,
          y: e.clientY + (Math.random() - 0.5) * 200,
          consciousness: Math.random(),
        })
      }

      setConsciousnessStreams((prev) => [
        ...prev.slice(-3),
        {
          id: streamIdRef.current++,
          points,
          timestamp: Date.now(),
        },
      ])
    }

    // Time distortion based on movement speed
    const speed = Math.sqrt(e.movementX ** 2 + e.movementY ** 2)
    setTimeDistortion(1 + speed * 0.1)

    // Auto-cycle consciousness modes based on position
    const modeIndex = Math.floor((e.clientX / window.innerWidth) * 5)
    const modes: (typeof consciousnessMode)[] = ["evolve", "quantum", "reality", "time", "dimension"]
    setConsciousnessMode(modes[modeIndex] || "evolve")
  }, [])

  const handleMouseDown = useCallback((e: MouseEvent) => {
    setIsManipulating(true)

    // Create reality ripple
    setRealityRipples((prev) => [
      ...prev.slice(-5),
      {
        id: rippleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        intensity: Math.random(),
        timestamp: Date.now(),
        dimension: Math.floor(Math.random() * 5),
      },
    ])
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsManipulating(false)
  }, [])

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseDown, handleMouseUp])

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        @keyframes consciousness-flow {
          0% { opacity: 0; transform: scale(0) rotate(0deg); filter: hue-rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); filter: hue-rotate(180deg); }
          100% { opacity: 0; transform: scale(0) rotate(360deg); filter: hue-rotate(360deg); }
        }
        
        @keyframes dna-evolution {
          0% { transform: rotateY(0deg) rotateX(0deg); }
          100% { transform: rotateY(360deg) rotateX(360deg); }
        }
        
        @keyframes quantum-entanglement {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes reality-distortion {
          0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 1; filter: blur(0px); }
          50% { transform: translate(-50%, -50%) scale(2) rotate(180deg); opacity: 0.5; filter: blur(2px); }
          100% { transform: translate(-50%, -50%) scale(4) rotate(360deg); opacity: 0; filter: blur(5px); }
        }
        
        @keyframes time-warp {
          0% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg); }
          100% { transform: perspective(1000px) rotateX(360deg) rotateY(360deg); }
        }
      `}</style>

      {/* Consciousness Interface Core */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Central Consciousness Core */}
        <div className="relative">
          {/* DNA Helix Structure */}
          <div className="absolute -inset-8">
            {dnaStrands.map((strand, index) => (
              <div
                key={strand.id}
                className="absolute w-full h-full"
                style={{
                  transform: `rotateZ(${strand.angle}rad)`,
                  animation: "dna-evolution 4s linear infinite",
                }}
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-1 h-1 rounded-full transition-all duration-300`}
                    style={{
                      left: `${50 + Math.cos((i * Math.PI) / 4 + strand.phase) * 20}%`,
                      top: `${50 + Math.sin((i * Math.PI) / 4 + strand.phase) * 20 + strand.height * 0.1}%`,
                      backgroundColor: `hsl(${(strand.evolution * 360 + i * 45) % 360}, 100%, 60%)`,
                      boxShadow: `0 0 10px hsl(${(strand.evolution * 360 + i * 45) % 360}, 100%, 60%)`,
                      transform: `scale(${0.5 + strand.evolution * 0.5})`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Quantum Consciousness Core */}
          <div
            className={`
              w-3 h-3 absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300
              ${consciousnessMode === "evolve" ? "bg-gradient-to-r from-orange-400/80 via-amber-400/80 to-yellow-400/80" : ""}
              ${consciousnessMode === "quantum" ? "bg-gradient-to-r from-orange-500/80 via-red-400/80 to-pink-400/80" : ""}
              ${consciousnessMode === "reality" ? "bg-gradient-to-r from-amber-400/80 via-orange-400/80 to-red-400/80" : ""}
              ${consciousnessMode === "time" ? "bg-gradient-to-r from-orange-600/80 via-amber-500/80 to-yellow-500/80" : ""}
              ${consciousnessMode === "dimension" ? "bg-gradient-to-r from-yellow-400/80 via-orange-400/80 to-red-400/80" : ""}
              ${isManipulating ? "scale-150" : "scale-100"}
              rounded-full
            `}
            style={{
              boxShadow: `0 0 30px currentColor, 0 0 60px currentColor`,
              animation: "consciousness-flow 2s infinite",
            }}
          />

          {/* Quantum Particles */}
          {quantumParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 rounded-full transition-all duration-100"
              style={{
                left: particle.x,
                top: particle.y,
                backgroundColor: `hsl(${25 + particle.consciousness * 60}, 100%, 70%)`,
                boxShadow: `0 0 ${5 + particle.z * 0.2}px hsl(${25 + particle.consciousness * 60}, 100%, 70%)`,
                transform: `translate(-50%, -50%) scale(${0.5 + particle.consciousness})`,
                opacity: particle.entangled ? 1 : 0.6,
                animation: particle.entangled ? "quantum-entanglement 1s infinite" : "",
              }}
            />
          ))}

          {/* Consciousness Mode Effects */}
          {consciousnessMode === "evolve" && (
            <div className="absolute -inset-12">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-8 bg-gradient-to-t from-transparent via-orange-400/80 to-transparent"
                  style={{
                    left: `${50 + Math.cos((i * Math.PI) / 3) * 40}%`,
                    top: `${50 + Math.sin((i * Math.PI) / 3) * 40}%`,
                    transform: `rotate(${i * 60}deg)`,
                    animation: `consciousness-flow ${1 + i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          )}

          {consciousnessMode === "quantum" && (
            <div className="absolute -inset-16">
              <svg className="w-full h-full">
                {quantumParticles.slice(0, 6).map((particle, i) => {
                  const nextParticle = quantumParticles[(i + 1) % 6]
                  return (
                    <line
                      key={i}
                      x1={particle.x + 64}
                      y1={particle.y + 64}
                      x2={nextParticle.x + 64}
                      y2={nextParticle.y + 64}
                      stroke={`hsl(${25 + (particle.consciousness + nextParticle.consciousness) * 30}, 100%, 60%)`}
                      strokeWidth="0.5"
                      opacity="0.7"
                      style={{
                        filter: `drop-shadow(0 0 2px hsl(${25 + (particle.consciousness + nextParticle.consciousness) * 30}, 100%, 60%))`,
                      }}
                    />
                  )
                })}
              </svg>
            </div>
          )}

          {consciousnessMode === "time" && (
            <div className="absolute -inset-10 border border-orange-400/30 rounded-full animate-[time-warp_3s_linear_infinite]">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-4 bg-orange-400/80"
                  style={{
                    left: `${50 + Math.cos((i * Math.PI) / 6) * 45}%`,
                    top: `${50 + Math.sin((i * Math.PI) / 6) * 45}%`,
                    transform: `rotate(${i * 30}deg)`,
                    opacity: 0.3 + (i % 3) * 0.3,
                  }}
                />
              ))}
            </div>
          )}

          {consciousnessMode === "dimension" && (
            <div className="absolute -inset-8">
              {[...Array(5)].map((_, dimension) => (
                <div
                  key={dimension}
                  className="absolute inset-0 border border-amber-400/20 rounded-full"
                  style={{
                    transform: `scale(${1 + dimension * 0.3}) rotateX(${dimension * 72}deg)`,
                    animation: `consciousness-flow ${2 + dimension * 0.5}s infinite`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Consciousness Streams */}
      {consciousnessStreams.map((stream) => (
        <svg key={stream.id} className="fixed pointer-events-none z-[9998] w-full h-full top-0 left-0">
          <path
            d={`M ${stream.points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")}`}
            stroke={`hsl(${25 + (stream.points[0]?.consciousness || 0) * 60}, 100%, 60%)`}
            strokeWidth="1"
            fill="none"
            opacity="0.6"
            style={{
              filter: `drop-shadow(0 0 3px hsl(${25 + (stream.points[0]?.consciousness || 0) * 60}, 100%, 60%))`,
              animation: "consciousness-flow 2s ease-out forwards",
            }}
          />
        </svg>
      ))}

      {/* Reality Distortion Ripples */}
      {realityRipples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9997] w-16 h-16 border-2 rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            borderColor: `hsl(${25 + ripple.dimension * 15}, 100%, 60%)`,
            background: `radial-gradient(circle, hsla(${25 + ripple.dimension * 15}, 100%, 60%, 0.1) 0%, transparent 70%)`,
            boxShadow: `0 0 40px hsl(${25 + ripple.dimension * 15}, 100%, 60%)`,
            animation: "reality-distortion 3s ease-out forwards",
          }}
        />
      ))}
    </>
  )
}
