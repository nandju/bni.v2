"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft, X } from "lucide-react"

export default function AccountNumberPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [accountNumber, setAccountNumber] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleNumberClick = (num: string) => {
    if (accountNumber.length < 12) {
      setAccountNumber((prev) => prev + num)
      setError(null)
    }
  }

  const handleBackspace = () => {
    setAccountNumber((prev) => prev.slice(0, -1))
    setError(null)
  }

  const handleClear = () => {
    setAccountNumber("")
    setError(null)
  }

  const handleContinue = () => {
    if (accountNumber.length !== 12) {
      setError(t("account.error.format"))
      return
    }

    if (!/^\d{12}$/.test(accountNumber)) {
      setError(t("account.error.format"))
      return
    }

    // Navigate to loading page
    router.push(`/loading?account=${accountNumber}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 max-w-4xl mx-auto">
      <div className="w-full max-w-2xl space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="text-white hover:text-white/80 hover:bg-white/10 mb-4"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          {t("account.back")}
        </Button>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white mb-4">{t("account.title")}</h1>
          <p className="text-lg text-white/80 mb-6">{t("account.instruction")}</p>
        </div>

        {/* Account Number Input */}
        <div className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              value={accountNumber}
              readOnly
              placeholder={t("account.placeholder")}
              className="h-16 text-2xl text-center font-mono bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
            />
            {accountNumber.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
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
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          disabled={accountNumber.length !== 12}
          size="lg"
          className="w-full h-16 text-xl font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("account.continue")} →
        </Button>
      </div>
    </div>
  )
}
