"use client"

export function ChainLinkCharacter() {
  return (
    <div className="absolute -top-20 right-0 z-20 animate-float">
      {/* Head */}
      <div className="relative w-16 h-16 mx-auto mb-1">
        {/* Main character body - cute chain link */}
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-yellow to-pastel-orange rounded-full shadow-lg" />

        {/* Eyes */}
        <div className="absolute top-5 left-4 w-2 h-2 bg-foreground rounded-full" />
        <div className="absolute top-5 right-4 w-2 h-2 bg-foreground rounded-full" />

        {/* Smile */}
        <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-foreground rounded-full" />
      </div>

      {/* Arms/Links */}
      <div className="flex justify-center gap-2 mb-2">
        <div className="w-3 h-10 bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-full opacity-70" />
        <div className="w-3 h-10 bg-gradient-to-r from-pastel-blue to-pastel-cyan rounded-full opacity-70" />
      </div>

      {/* Welcome text */}
      <div className="text-center text-sm font-bold text-foreground mt-2 animate-pulse">✨ Ready to Bridge! ✨</div>
    </div>
  )
}
