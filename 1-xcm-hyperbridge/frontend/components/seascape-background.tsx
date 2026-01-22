"use client"

export function SeascapeBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated clouds */}
      <svg className="absolute top-20 left-10 w-32 h-16 opacity-70" viewBox="0 0 200 100">
        <g fill="white">
          <ellipse cx="40" cy="50" rx="30" ry="20" />
          <ellipse cx="70" cy="45" rx="35" ry="25" />
          <ellipse cx="100" cy="50" rx="30" ry="20" />
        </g>
      </svg>

      <svg className="absolute top-40 right-20 w-40 h-20 opacity-60 animate-float" viewBox="0 0 300 150">
        <g fill="white">
          <ellipse cx="60" cy="75" rx="45" ry="30" />
          <ellipse cx="120" cy="65" rx="50" ry="35" />
          <ellipse cx="180" cy="75" rx="45" ry="30" />
        </g>
      </svg>

      {/* Ocean water */}
      <svg className="absolute bottom-0 left-0 w-full h-1/3" viewBox="0 0 1200 300" preserveAspectRatio="none">
        <defs>
          <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B3E5FC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#81D4FA" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="300" fill="url(#oceanGradient)" />
        {/* Wave patterns */}
        <path d="M0,80 Q300,60 600,80 T1200,80" stroke="#A1DDE9" strokeWidth="3" fill="none" opacity="0.6" />
        <path d="M0,140 Q300,120 600,140 T1200,140" stroke="#90CAF9" strokeWidth="2" fill="none" opacity="0.4" />
      </svg>

      {/* Floating token icons in water */}
      <div className="absolute bottom-12 left-1/4 text-3xl opacity-30 animate-float">💎</div>
      <div className="absolute bottom-20 right-1/4 text-3xl opacity-25 animate-float-delayed">🪙</div>
      <div className="absolute bottom-16 right-1/3 text-2xl opacity-20 animate-float">⛓️</div>
    </div>
  )
}
