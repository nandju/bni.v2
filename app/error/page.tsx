"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { AlertCircle, RefreshCw, Phone } from "lucide-react"

function ErrorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()
  const errorType = searchParams.get("type") || "accountNotFound"

  const getErrorTitle = () => {
    switch (errorType) {
      case "accountNotFound":
        return t("error.accountNotFound")
      case "serviceUnavailable":
        return t("error.serviceUnavailable")
      case "tooManyAttempts":
        return t("error.tooManyAttempts")
      default:
        return t("error.title")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24 bg-destructive/20 rounded-full flex items-center justify-center">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white mb-4">{t("error.title")}</h1>
          <p className="text-xl text-white/80 mb-8">{getErrorTitle()}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => router.push("/account-number")}
            size="lg"
            className="w-full h-16 text-xl font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            {t("error.retry")}
          </Button>

          <Button
            onClick={() => {
              // Navigate to contact page or show contact info
              alert("Contacter l'agence - À implémenter")
            }}
            variant="outline"
            size="lg"
            className="w-full h-16 text-xl font-semibold border-2 border-white/20 bg-white/10 hover:bg-white/20 text-white"
          >
            <Phone className="mr-2 h-5 w-5" />
            {t("error.contactAgency")}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="animate-spin h-20 w-20 text-primary"></div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  )
}
