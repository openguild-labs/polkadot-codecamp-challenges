"use client"

import { SOURCE_CHAIN } from "@/constants/chains"

interface TransactionStatusProps {
  loading: boolean
  error: string | null
  receipt: any
  stage?: "idle" | "approving" | "bridging" | "confirming" | "success" | "error"
}

export function TransactionStatus({ loading, error, receipt, stage = "idle" }: TransactionStatusProps) {
  if (!loading && !error && !receipt) return null

  return (
    <div className="space-y-3">
      {loading && (
        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
          <div className="flex items-center gap-3">
            <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div className="flex-1">
              <p className="text-blue-900 font-semibold">Transaction in Progress</p>
              <p className="text-sm text-blue-700">
                {stage === "approving" && "Approving token spending..."}
                {stage === "bridging" && "Initiating bridge transaction..."}
                {stage === "confirming" && "Waiting for confirmation..."}
                {!stage || stage === "idle" && "Processing..."}
              </p>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="mt-4 flex items-center justify-between">
            <div className={`flex flex-col items-center ${stage === "approving" || stage === "bridging" || stage === "confirming" || stage === "success" ? "text-blue-600" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${stage === "approving" ? "border-blue-600 bg-blue-100" : stage === "bridging" || stage === "confirming" || stage === "success" ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-gray-100"}`}>
                {stage === "bridging" || stage === "confirming" || stage === "success" ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs font-bold">1</span>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">Approve</span>
            </div>
            
            <div className={`flex-1 h-1 mx-2 ${stage === "bridging" || stage === "confirming" || stage === "success" ? "bg-blue-600" : "bg-gray-300"}`}></div>
            
            <div className={`flex flex-col items-center ${stage === "bridging" || stage === "confirming" || stage === "success" ? "text-blue-600" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${stage === "bridging" ? "border-blue-600 bg-blue-100" : stage === "confirming" || stage === "success" ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-gray-100"}`}>
                {stage === "confirming" || stage === "success" ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs font-bold">2</span>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">Bridge</span>
            </div>
            
            <div className={`flex-1 h-1 mx-2 ${stage === "confirming" || stage === "success" ? "bg-blue-600" : "bg-gray-300"}`}></div>
            
            <div className={`flex flex-col items-center ${stage === "confirming" || stage === "success" ? "text-blue-600" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${stage === "confirming" ? "border-blue-600 bg-blue-100" : stage === "success" ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-gray-100"}`}>
                {stage === "success" ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs font-bold">3</span>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">Confirm</span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-red-900 font-semibold">Transaction Failed</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {receipt && !loading && (
        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-green-900 font-semibold">Bridge Transaction Successful!</p>
              <p className="text-sm text-green-700 mt-1">
                Your tokens are being transferred to Paseo Asset Hub.
              </p>
              <a 
                href={`${SOURCE_CHAIN.blockExplorerUrls[0]}/tx/${receipt.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-sm text-green-800 hover:text-green-900 font-medium underline"
              >
                View on {SOURCE_CHAIN.shortName} Explorer
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
