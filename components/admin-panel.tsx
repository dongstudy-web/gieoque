"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export interface PrizeConfig {
  label: string
  value: number
  percentage: number
}

interface AdminPanelProps {
  show: boolean
  onClose: () => void
  prizes: PrizeConfig[]
  onUpdate: (prizes: PrizeConfig[]) => void
}

export function AdminPanel({ show, onClose, prizes, onUpdate }: AdminPanelProps) {
  const [localPrizes, setLocalPrizes] = useState<PrizeConfig[]>(prizes)
  const [error, setError] = useState("")

  useEffect(() => {
    setLocalPrizes(prizes)
  }, [prizes])

  const totalPercentage = localPrizes.reduce((sum, p) => sum + p.percentage, 0)

  const handleChange = (index: number, value: number) => {
    const updated = [...localPrizes]
    updated[index] = { ...updated[index], percentage: value }
    setLocalPrizes(updated)

    const total = updated.reduce((sum, p) => sum + p.percentage, 0)
    if (Math.abs(total - 100) > 0.01) {
      setError(`Tổng tỉ lệ : ${total.toFixed(1)}% (cần bằng 100%)`)
    } else {
      setError("")
    }
  }

  const handleSave = () => {
    if (Math.abs(totalPercentage - 100) > 0.01) {
      setError("Tổng tỉ lệ phải bằng 100%!")
      return
    }
    onUpdate(localPrizes)
    onClose()
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" role="dialog" aria-modal="true" aria-label="Cài đặt tỉ lệ">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-t-2xl overflow-hidden animate-slide-up" style={{ background: "linear-gradient(180deg, #1a0a0a 0%, #2d0a0a 100%)" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(255, 215, 0, 0.2)" }}>
          <h3 className="font-bold text-base" style={{ color: "#FFD700" }}>
            Cài đặt tỉ lệ trúng thưởng
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full transition-colors"
            style={{ color: "#FFD700" }}
            aria-label="Dong"
          >
            <X size={20} />
          </button>
        </div>

        {/* Prize list */}
        <div className="px-5 py-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {localPrizes.map((prize, index) => (
            <div key={prize.value} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-20 text-sm font-semibold" style={{ color: "#FFE4B5" }}>
                {prize.label}
              </div>
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.5"
                  value={prize.percentage}
                  onChange={(e) => handleChange(index, parseFloat(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FFD700 0%, #FFD700 ${prize.percentage}%, #3a1a1a ${prize.percentage}%, #3a1a1a 100%)`,
                  }}
                  aria-label={`Tỉ lệ ${prize.label}`}
                />
              </div>
              <div className="flex-shrink-0 w-16 text-right">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={prize.percentage}
                  onChange={(e) => handleChange(index, parseFloat(e.target.value) || 0)}
                  className="w-full text-sm font-mono text-right rounded-lg px-2 py-1 border-0 focus:outline-none focus:ring-1"
                  style={{
                    background: "rgba(255, 215, 0, 0.1)",
                    color: "#FFD700",
                    caretColor: "#FFD700",
                  }}
                />
              </div>
              <span className="text-xs flex-shrink-0" style={{ color: "#FFE4B5" }}>%</span>
            </div>
          ))}
        </div>

        {/* Total & Error */}
        <div className="px-5 py-3" style={{ borderTop: "1px solid rgba(255, 215, 0, 0.2)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold" style={{ color: "#FFE4B5" }}>Tong:</span>
            <span
              className="text-lg font-bold font-mono"
              style={{ color: Math.abs(totalPercentage - 100) > 0.01 ? "#FF4444" : "#00FF88" }}
            >
              {totalPercentage.toFixed(1)}%
            </span>
          </div>
          {error && (
            <p className="text-xs mb-2" style={{ color: "#FF4444" }}>{error}</p>
          )}
          <button
            onClick={handleSave}
            disabled={Math.abs(totalPercentage - 100) > 0.01}
            className="w-full py-3 rounded-xl font-bold text-base transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: Math.abs(totalPercentage - 100) > 0.01 ? "#555" : "linear-gradient(135deg, #FFD700, #FFA500)",
              color: Math.abs(totalPercentage - 100) > 0.01 ? "#999" : "#8B0000",
            }}
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  )
}
