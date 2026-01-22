"use client"

interface StatusPanelProps {
  estimatedTime: string
  fees: string
  progress: number
}

export function StatusPanel({ estimatedTime, fees, progress }: StatusPanelProps) {
  return (
    <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-2xl border-2 border-black">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-black">Transaction Progress</span>
          <span className="text-black">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden border-2 border-black">
          <div
            className="h-full bg-yellow-300 rounded-full transition-all duration-500 border-r-2 border-black"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </div>
  )
}
