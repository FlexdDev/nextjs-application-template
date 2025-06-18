"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Item {
  id: number
  name: string
  image: string
  rarity: string
  price: number
}

interface CaseOpeningModalProps {
  isOpen: boolean
  onClose: () => void
  items: Item[]
  onComplete: (item: Item) => void
}

export function CaseOpeningModal({
  isOpen,
  onClose,
  items,
  onComplete
}: CaseOpeningModalProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [showResult, setShowResult] = useState(false)
  const spinnerRef = useRef<HTMLDivElement>(null)

  // Generate items for the spinner (repeat items array multiple times)
  const spinnerItems = [...Array(20)].flatMap(() => items)

  const startSpin = () => {
    setIsSpinning(true)
    setShowResult(false)

    // Calculate random winning item
    const winningItem = items[Math.floor(Math.random() * items.length)]
    setSelectedItem(winningItem)

    // Start the spinning animation
    if (spinnerRef.current) {
      spinnerRef.current.style.transition = "none"
      spinnerRef.current.style.transform = "translateX(0)"
      
      // Force reflow
      void spinnerRef.current.offsetWidth
      
      // Calculate final position to show winning item in center
      const itemWidth = 200 // Width of each item in pixels
      const centerOffset = (window.innerWidth / 2) - itemWidth
      const randomOffset = Math.random() * itemWidth - (itemWidth / 2)
      const finalPosition = -(spinnerItems.length * itemWidth) + centerOffset + randomOffset

      // Start spinning animation
      spinnerRef.current.style.transition = "transform 9s cubic-bezier(0.15, 0.45, 0.15, 1)"
      spinnerRef.current.style.transform = `translateX(${finalPosition}px)`

      // Show result after animation
      setTimeout(() => {
        setIsSpinning(false)
        setShowResult(true)
        if (winningItem) {
          onComplete(winningItem)
        }
      }, 9000)
    }
  }

  useEffect(() => {
    if (isOpen) {
      startSpin()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Spinner Container */}
          <div className="w-full overflow-hidden h-64 mb-8">
            <div
              ref={spinnerRef}
              className="flex items-center h-full"
              style={{
                willChange: "transform"
              }}
            >
              {spinnerItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex-shrink-0 w-[200px] h-full p-2"
                >
                  <div className={`
                    relative w-full h-full rounded-lg overflow-hidden
                    ${showResult && selectedItem?.id === item.id ? 'scale-110 shadow-[0_0_30px_rgba(0,191,255,0.5)]' : ''}
                    transition-all duration-300
                  `}>
                    <img
                      src={item.image || "/placeholder-item.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                      <p className="text-white font-semibold">{item.name}</p>
                      <p className="text-[#FFD700]">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Result Overlay */}
          {showResult && selectedItem && (
            <div className="text-center animate-fade-in">
              <h2 className="text-4xl font-bold text-white mb-4 animate-glow">
                TEBRİKLER!
              </h2>
              <p className="text-2xl text-[#FFD700] mb-8">
                {selectedItem.name} Kazandınız!
              </p>
              <div className="flex space-x-4">
                <Button
                  onClick={onClose}
                  className="bg-[#00BFFF] hover:bg-[#00BFFF]/80 text-white px-8 py-4 rounded-lg
                  transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,191,255,0.5)]"
                >
                  Envantere Git
                </Button>
                <Button
                  onClick={() => {
                    setShowResult(false)
                    startSpin()
                  }}
                  className="bg-[#FFD700] hover:bg-[#FFD700]/80 text-black px-8 py-4 rounded-lg
                  transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,215,0,0.5)]"
                >
                  Yeniden Aç
                </Button>
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </Dialog>
  )
}
