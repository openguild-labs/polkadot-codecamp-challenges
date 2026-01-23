"use client"

export function FloatingElements() {
  const tokens = [
    { emoji: "💎", delay: 0, duration: 8 },
    { emoji: "🪙", delay: 1, duration: 10 },
    { emoji: "⛓️", delay: 2, duration: 12 },
    { emoji: "🔗", delay: 0.5, duration: 9 },
    { emoji: "✨", delay: 1.5, duration: 11 },
    { emoji: "🌟", delay: 2.5, duration: 13 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {tokens.map((token, i) => (
        <div
          key={i}
          className="absolute text-4xl opacity-20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${token.duration}s ease-in-out infinite`,
            animationDelay: `${token.delay}s`,
          }}
        >
          {token.emoji}
        </div>
      ))}
    </div>
  )
}
