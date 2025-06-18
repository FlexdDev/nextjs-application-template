"use client"

import { useEffect, useRef } from "react"

interface UpgradeWheelProps {
  isSpinning: boolean
  chance: number
  onComplete: (success: boolean) => void
}

export function UpgradeWheel({ isSpinning, chance, onComplete }: UpgradeWheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isSpinning || !wheelRef.current) return

    const success = Math.random() * 100 < chance
    const finalRotation = success ? 
      1080 + Math.random() * 90 : // Success: 3 full rotations + random angle in success zone
      1080 + 180 + Math.random() * 90 // Fail: 3 full rotations + 180° + random angle in fail zone

    // Reset wheel position
    wheelRef.current.style.transition = "none"
    wheelRef.current.style.transform = "rotate(0deg)"
    
    // Force reflow
    void wheelRef.current.offsetWidth
    
    // Start spinning animation
    wheelRef.current.style.transition = "transform 6s cubic-bezier(0.3, 0.1, 0.1, 1)"
    wheelRef.current.style.transform = `rotate(${finalRotation}deg)`

    // Notify completion after animation ends
    const timer = setTimeout(() => {
      onComplete(success)
    }, 6000)

    return () => clearTimeout(timer)
  }, [isSpinning, chance, onComplete])

  return (
    <div 
      ref={containerRef} 
      className="relative w-[300px] h-[300px] mx-auto"
    >
      {/* Static pointer at the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 z-10">
        <div className="w-4 h-8 bg-[#FFD700] clip-triangle mx-auto" />
      </div>

      {/* Spinning wheel */}
      <div 
        ref={wheelRef}
        className="w-full h-full rounded-full relative"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden"
        }}
      >
        {/* Success segment (180 degrees) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00BFFF] to-[#00BFFF]/60">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xl font-bold rotate-180">BAŞARILI</span>
          </div>
        </div>

        {/* Fail segment (180 degrees) */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#FF4444] to-[#FF4444]/60"
          style={{ transform: "rotate(180deg)" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xl font-bold rotate-180">BAŞARISIZ</span>
          </div>
        </div>

        {/* Outer ring with glowing effect */}
        <div className="absolute inset-0 rounded-full border-4 border-[#FFD700] animate-pulse" />
      </div>

      {/* Chance display */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-4xl font-bold text-[#FFD700]">
          {chance.toFixed(2)}%
        </div>
        <div className="text-white text-sm">Başarı Şansı</div>
      </div>

      {/* Decorative particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#FFD700] rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${i * 30}deg) translateY(-140px)`,
              animation: "pulse 1.5s infinite",
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}
