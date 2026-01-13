"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export default function LandingPage() {
  const router = useRouter()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 max-w-4xl mx-auto">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo BNI */}
        <div className="flex justify-center mb-8">
          <div className="relative h-32 w-32 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md overflow-hidden border border-white/20 shadow-lg">
            <Image 
              src="/logo_bni.jpg" 
              alt="Logo BNI" 
              fill
              className="object-contain p-2"
            />
          </div>
        </div>

        {/* Welcome Message */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white mb-4">{t("landing.welcome")}</h1>
          <p className="text-xl text-white/90 mb-8">
            {t("landing.welcome")} à la Banque Nationale d&apos;Investissement
          </p>
        </div>

        {/* Main CTA Button */}
        <Button
          onClick={() => router.push("/account-number")}
          size="lg"
          className="w-full h-16 text-xl font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all"
        >
          {t("landing.accessAccount")}
        </Button>

        {/* Help and Legal Links */}
        <div className="flex justify-center gap-6 mt-8 pt-8 border-t border-white/20">
          <Button
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => {
              // Navigate to help page or show help modal
              alert("Page d'aide - À implémenter")
            }}
          >
            {t("landing.help")}
          </Button>
          <Button
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => {
              // Navigate to legal page or show legal modal
              alert("Mentions légales - À implémenter")
            }}
          >
            {t("landing.legal")}
          </Button>
        </div>
      </div>
    </div>
  )
}
