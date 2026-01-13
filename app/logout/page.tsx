"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { LogOut, X } from "lucide-react"

export default function LogoutPage() {
  const router = useRouter()
  const { t } = useLanguage()

  const handleConfirm = () => {
    // Clear any session data
    // Then redirect to home
    router.push("/")
  }

  const handleCancel = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center">
                <LogOut className="h-10 w-10 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-white text-3xl mb-2">{t("logout.confirm")}</CardTitle>
            <CardDescription className="text-white/80 text-lg">{t("logout.message")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleConfirm}
              variant="destructive"
              size="lg"
              className="w-full h-14 text-xl font-semibold"
            >
              <LogOut className="mr-2 h-5 w-5" />
              {t("logout.confirmButton")}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              size="lg"
              className="w-full h-14 text-xl font-semibold border-2 border-white/20 bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="mr-2 h-5 w-5" />
              {t("logout.cancel")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
