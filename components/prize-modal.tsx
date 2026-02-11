"use client"

import { useEffect, useRef } from "react"

interface PrizeModalProps {
  show: boolean
  amount: string
  onClose: () => void
}

export function PrizeModal({ show, amount, onClose }: PrizeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (show) {
      modalRef.current?.focus()
    }
  }, [show])

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Thông báo trúng thưởng"
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
        onClick={onClose}
        aria-label="Đóng"
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative z-10 animate-envelope-open w-full max-w-sm mx-auto"
      >
        {/* Envelope shape */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #8B0000 100%)",
          }}
        >
          {/* Gold border decoration */}
          <div
            className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
            style={{ borderColor: "#FFD700" }}
          />

          {/* Top flap decoration */}
          <div
            className="absolute top-0 left-0 right-0 h-3 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, #FFD700, #FFA500, #FFD700)",
            }}
          />

          {/* Content */}
          <div className="px-6 py-8 text-center">
            {/* Lucky symbol */}
            <div
              className="mx-auto mb-4 w-20 h-20 rounded-full flex items-center justify-center animate-pulse-gold"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFA500)",
              }}
            >
              <span
                className="text-4xl font-bold"
                style={{ color: "#8B0000" }}
              >
                {"$"}
              </span>
            </div>

            <h2
              className="text-lg font-bold mb-1"
              style={{ color: "#FFD700" }}
            >
              {"Chúc mừng năm mới!"}
            </h2>
            <p className="text-sm mb-4" style={{ color: "#FFE4B5" }}>
              {"Bạn đã nhận được lì xì"}
            </p>

            {/* Prize amount */}
            <div
              className="relative py-4 px-6 rounded-xl mb-4 mx-4"
              style={{
                background: "rgba(255, 215, 0, 0.15)",
                border: "1px solid rgba(255, 215, 0, 0.3)",
              }}
            >
              <div
                className="text-5xl font-extrabold tracking-tight"
                style={{
                  color: "#FFD700",
                  textShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
                }}
              >
                {amount}
              </div>
              <div
                className="text-xs mt-1 font-medium"
                style={{ color: "#FFE4B5" }}
              >
                {"VND"}
              </div>
            </div>

            {/* Wishes */}
            <p className="text-sm italic mb-6" style={{ color: "#FFB6C1" }}>
              {"Chúc bạn năm mới an khang thịnh vượng , sức khoẻ dồi dào"}
            </p>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="relative z-20 w-full py-3.5 rounded-xl font-bold text-base transition-all active:scale-95 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFA500)",
                color: "#8B0000",
                boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
              }}
            >
              {"Nhan Li Xi"}
            </button>
          </div>

          {/* Bottom decoration */}
          <div
            className="h-3 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, #FFD700, #FFA500, #FFD700)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
