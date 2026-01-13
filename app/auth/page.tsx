"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft, Lock } from "lucide-react"

function AuthContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()
  const accountNumber = searchParams.get("account")
  const [pin, setPin] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleNumberClick = (num: string) => {
    if (pin.length < 6) {
      setPin((prev) => prev + num)
      setError(null)
    }
  }

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1))
    setError(null)
  }

  const handleClear = () => {
    setPin("")
    setError(null)
  }

  const handleSubmit = () => {
    if (pin.length !== 6) {
      setError("Le code PIN doit contenir 6 chiffres")
      return
    }

    // Simulate PIN verification
    if (pin === "123456") {
      router.push(`/confirmation?account=${accountNumber}`)
    } else {
      setError("Code PIN incorrect")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 max-w-4xl mx-auto">
      <div className="w-full max-w-2xl space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/account-number")}
          className="text-white hover:text-white/80 hover:bg-white/10 mb-4"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          {t("account.back")}
        </Button>

        {/* Title */}
        <div className="space-y-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{t("auth.title")}</h1>
          <p className="text-lg text-white/80 mb-6">{t("auth.enterPin")}</p>
        </div>

        {/* PIN Input */}
        <div className="space-y-4">
          <div className="relative">
            <Input
              type="password"
              value={pin}
              readOnly
              placeholder={t("auth.pinPlaceholder")}
              className="h-16 text-2xl text-center font-mono bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
              maxLength={6}
            />
            {pin.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white hover:bg-white/10"
              >
                ×
              </Button>
            )}
          </div>

          {/* PIN Dots */}
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full border-2 ${
                  index < pin.length
                    ? "bg-primary border-primary"
                    : "border-white/30 bg-transparent"
                }`}
              />
            ))}
          </div>

          {error && (
            <div className="text-destructive text-center text-lg font-medium">{error}</div>
          )}

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                className="h-16 text-2xl font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                {num}
              </Button>
            ))}
            <div className="col-span-2">
              <Button
                onClick={() => handleNumberClick("0")}
                className="w-full h-16 text-2xl font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                0
              </Button>
            </div>
            <Button
              onClick={handleBackspace}
              className="h-16 text-2xl font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              ←
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={pin.length !== 6}
          size="lg"
          className="w-full h-16 text-xl font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("account.continue")} →
        </Button>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="animate-spin h-20 w-20 text-primary"></div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  )
}
