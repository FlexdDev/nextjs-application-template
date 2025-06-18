"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog } from "@/components/ui/dialog"
import { UpgradeWheel } from "./UpgradeWheel"

interface Item {
  id: number
  name: string
  image: string
  rarity: string
  price: number
}

export function UpgradePanel() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [targetItem, setTargetItem] = useState<Item | null>(null)
  const [upgradeChance, setUpgradeChance] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [multiplier, setMultiplier] = useState(1.5)

  // Demo inventory items
  const inventoryItems: Item[] = [
    {
      id: 1,
      name: "Desert Eagle | Code Red",
      image: "https://via.placeholder.com/300x400/1a1b2e/FF4444?text=Deagle+Code+Red",
      rarity: "classified",
      price: 50.00
    },
    {
      id: 2,
      name: "AK-47 | Asiimov",
      image: "https://via.placeholder.com/300x400/1a1b2e/FFD700?text=AK47+Asiimov",
      rarity: "covert",
      price: 100.00
    }
  ]

  // Demo target items
  const targetItems: Item[] = [
    {
      id: 3,
      name: "M4A4 | Neo-Noir",
      image: "https://via.placeholder.com/300x400/1a1b2e/00BFFF?text=M4A4+Neo+Noir",
      rarity: "classified",
      price: 75.00
    },
    {
      id: 4,
      name: "AWP | Dragon Lore",
      image: "https://via.placeholder.com/300x400/1a1b2e/FFD700?text=AWP+Dragon+Lore",
      rarity: "covert",
      price: 200.00
    }
  ]

  useEffect(() => {
    if (selectedItem && targetItem) {
      // Calculate upgrade chance based on price ratio and multiplier
      const chance = Math.min(
        100,
        ((selectedItem.price / targetItem.price) * 100) * multiplier
      )
      setUpgradeChance(chance)
    } else {
      setUpgradeChance(0)
    }
  }, [selectedItem, targetItem, multiplier])

  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const handleUpgrade = () => {
    if (!selectedItem || !targetItem) return
    setIsSpinning(true)
    setShowUpgradeModal(true)
  }

  const handleUpgradeComplete = (success: boolean) => {
    setIsSpinning(false)
    setTimeout(() => {
      setShowUpgradeModal(false)
      if (success) {
        // Update inventory: remove selected item, add target item
        // For demo, just show alert
        alert("Yükseltme Başarılı! " + targetItem?.name + " kazandınız!")
      } else {
        // Remove selected item from inventory
        // For demo, just show alert
        alert("Yükseltme Başarısız! " + selectedItem?.name + " kaybettiniz!")
      }
    }, 1000)
  }

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-[#1a1b2e] to-[#2a2b3e] rounded-2xl">
      <h2 className="text-3xl font-bold text-white mb-6">Yükseltici</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Inventory Items */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-4">Eşyalarınız</h3>
          <div className="grid grid-cols-2 gap-4">
            {inventoryItems.map((item) => (
              <Card
                key={item.id}
                className={`cursor-pointer p-2 ${
                  selectedItem?.id === item.id ? "ring-2 ring-[#00BFFF]" : ""
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded"
                />
                <p className="text-white mt-2 text-center">{item.name}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Target Items */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-4">Yükseltme</h3>
          <div className="grid grid-cols-2 gap-4">
            {targetItems.map((item) => (
              <Card
                key={item.id}
                className={`cursor-pointer p-2 ${
                  targetItem?.id === item.id ? "ring-2 ring-[#FFD700]" : ""
                }`}
                onClick={() => setTargetItem(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded"
                />
                <p className="text-white mt-2 text-center">{item.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Upgrade Chance and Button */}
      <div className="mt-8 text-center">
        <p className="text-white text-lg mb-4">
          Başarı Şansı:{" "}
          <span className="text-[#FFD700] font-bold">
            {upgradeChance.toFixed(2)}%
          </span>
        </p>
        <Button
          disabled={isSpinning || !selectedItem || !targetItem}
          onClick={handleUpgrade}
          className="bg-[#00BFFF] hover:bg-[#00BFFF]/80 text-white px-8 py-4 rounded-lg text-lg
          transition-all duration-300 hover:scale-105"
        >
          {isSpinning ? "Yükseltiliyor..." : "Yükselt"}
        </Button>
      </div>

      {/* Upgrade Modal with Wheel */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gradient-to-b from-[#1a1b2e] to-[#2a2b3e] p-8 rounded-2xl max-w-2xl w-full mx-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Yükseltme İşlemi</h3>
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <img
                    src={selectedItem?.image}
                    alt={selectedItem?.name}
                    className="w-32 h-32 object-cover rounded mb-2"
                  />
                  <p className="text-white">{selectedItem?.name}</p>
                  <p className="text-[#FFD700]">${selectedItem?.price.toFixed(2)}</p>
                </div>
                <div className="text-2xl text-[#00BFFF]">→</div>
                <div className="text-center">
                  <img
                    src={targetItem?.image}
                    alt={targetItem?.name}
                    className="w-32 h-32 object-cover rounded mb-2"
                  />
                  <p className="text-white">{targetItem?.name}</p>
                  <p className="text-[#FFD700]">${targetItem?.price.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <UpgradeWheel
              isSpinning={isSpinning}
              chance={upgradeChance}
              onComplete={handleUpgradeComplete}
            />
          </div>
        </div>
      </Dialog>
    </div>
  )
}
