"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

function LoadingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()
  const accountNumber = searchParams.get("account")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate account verification
    const timer = setTimeout(() => {
      setLoading(false)
      // Navigate to auth page after verification
      router.push(`/auth?account=${accountNumber}`)
    }, 3000)

    return () => clearTimeout(timer)
  }, [accountNumber, router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Loading Spinner */}
        <div className="flex justify-center mb-8">
          <svg
            className="animate-spin h-20 w-20 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>

        {/* Loading Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white mb-4">{t("loading.verifying")}</h2>
          <p className="text-xl text-white/80">{t("loading.pleaseWait")}</p>
        </div>
      </div>
    </div>
  )
}

export default function LoadingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="animate-spin h-20 w-20 text-primary"></div>
      </div>
    }>
      <LoadingContent />
    </Suspense>
  )
}
