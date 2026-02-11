"use client"

import { useState, useCallback, useRef } from "react"
import { useShake } from "@/hooks/use-shake"
import { Confetti } from "@/components/confetti"
import { PrizeModal } from "@/components/prize-modal"
import { AdminPanel, type PrizeConfig } from "@/components/admin-panel"
import { LuckyEnvelope } from "@/components/lucky-envelope"

const DEFAULT_PRIZES: PrizeConfig[] = [
  { label: "10,000", value: 10000, percentage: 35 },
  { label: "20,000", value: 20000, percentage: 30 },
  { label: "50,000", value: 50000, percentage: 20 },
  { label: "100,000", value: 100000, percentage: 10 },
  { label: "200,000", value: 200000, percentage: 4 },
  { label: "500,000", value: 500000, percentage: 1 },
]

function drawPrize(prizes: PrizeConfig[]): PrizeConfig {
  const random = Math.random() * 100
  let cumulative = 0
  for (const prize of prizes) {
    cumulative += prize.percentage
    if (random <= cumulative) {
      return prize
    }
  }
  return prizes[0]
}

export default function Page() {
  const [step, setStep] = useState<"shake" | "result">("shake")
  const [prizes, setPrizes] = useState<PrizeConfig[]>(DEFAULT_PRIZES)
  const [showAdmin, setShowAdmin] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPrizeModal, setShowPrizeModal] = useState(false)
  const [wonPrize, setWonPrize] = useState<PrizeConfig | null>(null)
  const [isShaking, setIsShaking] = useState(false)
  const [shakeCount, setShakeCount] = useState(0)
  const shakeTimeout = useRef<NodeJS.Timeout | null>(null)

  // Hidden admin: tap counter
  const adminTapCount = useRef(0)
  const adminTapTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleAdminTap = useCallback(() => {
    adminTapCount.current += 1
    if (adminTapTimeout.current) clearTimeout(adminTapTimeout.current)
    adminTapTimeout.current = setTimeout(() => {
      adminTapCount.current = 0
    }, 2000)
    if (adminTapCount.current >= 5) {
      setShowAdmin(true)
      adminTapCount.current = 0
    }
  }, [])

  const handleShake = useCallback(() => {
    if (step !== "shake") return

    setIsShaking(true)
    setShakeCount((prev) => {
      const newCount = prev + 1
      if (newCount >= 3) {
        const prize = drawPrize(prizes)
        setWonPrize(prize)
        setTimeout(() => {
          setShowConfetti(true)
          setShowPrizeModal(true)
          setStep("result")
        }, 500)
      }
      return newCount
    })

    if (shakeTimeout.current) clearTimeout(shakeTimeout.current)
    shakeTimeout.current = setTimeout(() => setIsShaking(false), 500)
  }, [step, prizes])

  const { requestPermission, needsPermission, permissionGranted } = useShake({
    onShake: handleShake,
    enabled: step === "shake",
    threshold: 12,
    timeout: 400,
  })

  const handleTapShake = () => {
    if (needsPermission && !permissionGranted) {
      requestPermission()
    }
    handleShake()
  }

  const handleClosePrize = () => {
    setShowPrizeModal(false)
    setShowConfetti(false)
  }

  const handlePlayAgain = () => {
    setStep("shake")
    setShakeCount(0)
    setWonPrize(null)
    setShowConfetti(false)
    setShowPrizeModal(false)
  }

  return (
    <main className="relative min-h-dvh overflow-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/tet-background.jpg)" }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0"
        style={{ background: "rgba(80, 0, 0, 0.55)" }}
        aria-hidden="true"
      />

      {/* Floating decorations */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-float"
            style={{
              left: `${8 + ((i * 8) % 90)}%`,
              top: `${5 + ((i * 13) % 85)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 3)}s`,
              opacity: 0.4,
              fontSize: `${14 + (i % 4) * 6}px`,
              color: i % 2 === 0 ? "#FFD700" : "#FF69B4",
            }}
          >
            {["*", "+", "*", "+", "*", "+"][i % 6]}
          </div>
        ))}
      </div>

      {/* Hidden admin tap zone */}
      <button
        onClick={handleAdminTap}
        className="fixed top-0 right-0 w-12 h-12 z-30 opacity-0"
        aria-label="Admin"
        type="button"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-dvh px-4 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1
            className="text-3xl font-extrabold tracking-tight text-balance"
            style={{
              color: "#FFD700",
              textShadow: "0 2px 20px rgba(255, 215, 0, 0.5)",
            }}
          >
            {"Lac Li Xi Tet 2026"}
          </h1>
          <p
            className="text-sm mt-1 font-medium"
            style={{ color: "#FFE4B5" }}
          >
            {"Lac dien thoai de nhan li xi may man"}
          </p>
        </div>

        {/* Step: Shake */}
        {step === "shake" && (
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            {/* Envelope */}
            <LuckyEnvelope isShaking={isShaking} onClick={handleTapShake} />

            {/* Progress dots */}
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full transition-all duration-300"
                  style={{
                    background:
                      shakeCount >= i
                        ? "linear-gradient(135deg, #FFD700, #FFA500)"
                        : "rgba(255, 215, 0, 0.2)",
                    boxShadow:
                      shakeCount >= i
                        ? "0 0 10px rgba(255, 215, 0, 0.5)"
                        : "none",
                  }}
                />
              ))}
            </div>

            {/* Instruction */}
            <div className="text-center space-y-1">
              <p
                className="text-base font-semibold animate-pulse"
                style={{ color: "#FFD700" }}
              >
                {shakeCount === 0 && "Lac dien thoai de mo li xi!"}
                {shakeCount === 1 && "Tiep tuc lac!"}
                {shakeCount === 2 && "Sap ra roi, lac manh len!"}
              </p>
              <p
                className="text-xs"
                style={{ color: "#FFE4B5", opacity: 0.7 }}
              >
                {"Hoac nhan vao bao li xi"}
              </p>
            </div>
          </div>
        )}

        {/* Step: Result */}
        {step === "result" && wonPrize && (
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <div className="text-center">
              <p className="text-sm mb-2" style={{ color: "#FFE4B5" }}>
                {"Ban da nhan duoc li xi"}
              </p>
              <div
                className="text-5xl font-extrabold mb-2"
                style={{
                  color: "#FFD700",
                  textShadow: "0 0 30px rgba(255, 215, 0, 0.5)",
                }}
              >
                {wonPrize.label}
              </div>
              <p
                className="text-lg font-semibold"
                style={{ color: "#FFE4B5" }}
              >
                {"VND"}
              </p>
            </div>

            <button
              onClick={handlePlayAgain}
              className="px-8 py-3 rounded-xl font-bold text-base transition-all active:scale-95"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFA500)",
                color: "#8B0000",
                boxShadow: "0 4px 20px rgba(255, 215, 0, 0.4)",
              }}
            >
              {"Lac Lai Lan Nua"}
            </button>
          </div>
        )}
      </div>

      {/* Confetti */}
      <Confetti show={showConfetti} />

      {/* Prize Modal */}
      <PrizeModal
        show={showPrizeModal}
        amount={wonPrize?.label || ""}
        onClose={handleClosePrize}
      />

      {/* Admin Panel */}
      <AdminPanel
        show={showAdmin}
        onClose={() => setShowAdmin(false)}
        prizes={prizes}
        onUpdate={setPrizes}
      />
    </main>
  )
}
