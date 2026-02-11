"use client"

interface LuckyEnvelopeProps {
  isShaking: boolean
  onClick?: () => void
}

export function LuckyEnvelope({ isShaking, onClick }: LuckyEnvelopeProps) {
  return (
    <button
      onClick={onClick}
      className={`relative w-52 h-64 mx-auto transition-transform ${isShaking ? "animate-shake" : "animate-float"}`}
      aria-label="Bao li xi - Lac dien thoai de mo"
      type="button"
    >
      {/* Main envelope body */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #DC143C 0%, #8B0000 60%, #600000 100%)",
          boxShadow: "0 20px 60px rgba(139, 0, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.2)",
        }}
      >
        {/* Gold border */}
        <div
          className="absolute inset-2 rounded-xl"
          style={{ border: "2px solid rgba(255, 215, 0, 0.5)" }}
        />

        {/* Center gold circle with symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center animate-pulse-gold"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)",
              boxShadow: "0 0 30px rgba(255, 215, 0, 0.5)",
            }}
          >
            <span className="text-5xl font-extrabold" style={{ color: "#8B0000" }}>
              {"$"}
            </span>
          </div>
        </div>

        {/* Top gold decoration */}
        <div
          className="absolute top-0 left-0 right-0 h-8"
          style={{
            background: "linear-gradient(180deg, rgba(255, 215, 0, 0.3) 0%, transparent 100%)",
          }}
        />

        {/* Bottom text */}
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <span className="text-sm font-bold tracking-widest" style={{ color: "#FFD700" }}>
            LI XI
          </span>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: "#FFD700" }} />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: "#FFD700" }} />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: "#FFD700" }} />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: "#FFD700" }} />
      </div>
    </button>
  )
}
