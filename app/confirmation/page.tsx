"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { CheckCircle } from "lucide-react"

function ConfirmationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()
  const accountNumber = searchParams.get("account")

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white mb-4">{t("confirmation.success")}</h1>
          <p className="text-2xl text-white/80 mb-2">{t("confirmation.welcome")}</p>
          {accountNumber && (
            <p className="text-lg text-white/60">
              Compte: {accountNumber.slice(0, 4)} **** {accountNumber.slice(-4)}
            </p>
          )}
        </div>

        {/* Access Dashboard Button */}
        <Button
          onClick={() => router.push("/dashboard")}
          size="lg"
          className="w-full h-16 text-xl font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all"
        >
          {t("confirmation.accessDashboard")} →
        </Button>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="animate-spin h-20 w-20 text-primary"></div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
