"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft, User, Shield, LogOut, Settings } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="text-white hover:text-white/80 hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            {t("account.back")}
          </Button>
          <h1 className="text-4xl font-bold text-white">{t("profile.title")}</h1>
        </div>

        {/* Profile Info */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div>
                <CardTitle className="text-white text-2xl">Client BNI</CardTitle>
                <CardDescription className="text-white/80">Compte: 1234****5678</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                <span className="text-white/80">Email</span>
                <span className="text-white">client@example.com</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                <span className="text-white/80">Téléphone</span>
                <span className="text-white">+212 6XX XXX XXX</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm cursor-pointer hover:bg-white/15 transition-all">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/20">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-white">{t("profile.personalInfo")}</CardTitle>
                  <CardDescription className="text-white/80">Modifier vos informations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="text-white hover:text-primary w-full">
                Modifier
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm cursor-pointer hover:bg-white/15 transition-all">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/20">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-white">{t("profile.security")}</CardTitle>
                  <CardDescription className="text-white/80">Gérer la sécurité</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="text-white hover:text-primary w-full">
                Paramètres
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Logout Button */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardContent className="pt-6">
            <Button
              onClick={() => router.push("/logout")}
              variant="destructive"
              className="w-full h-12 text-lg font-semibold"
            >
              <LogOut className="mr-2 h-5 w-5" />
              {t("profile.logout")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
