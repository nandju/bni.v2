"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { ArrowRight, Wallet, History, Settings, LogOut, TrendingUp, TrendingDown } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { t } = useLanguage()

  // Mock data
  const balance = "125,450.00"
  const accountNumber = "1234****5678"
  const recentTransactions = [
    { id: 1, type: "credit", amount: "+2,500.00", description: "Virement reçu", date: "15 Déc 2024" },
    { id: 2, type: "debit", amount: "-500.00", description: "Paiement facture", date: "14 Déc 2024" },
    { id: 3, type: "credit", amount: "+1,200.00", description: "Salaire", date: "10 Déc 2024" },
  ]

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{t("dashboard.title")}</h1>
            <p className="text-white/60">{t("dashboard.accountNumber")}: {accountNumber}</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.push("/logout")}
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <LogOut className="mr-2 h-5 w-5" />
            {t("nav.logout")}
          </Button>
        </div>

        {/* Balance Card */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardDescription className="text-white/80">{t("dashboard.balance")}</CardDescription>
            <CardTitle className="text-5xl font-bold text-white">{balance} MAD</CardTitle>
          </CardHeader>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className="bg-white/10 border-white/20 backdrop-blur-sm cursor-pointer hover:bg-white/15 transition-all"
            onClick={() => router.push("/services?action=transfer")}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{t("dashboard.transfer")}</CardTitle>
                <Wallet className="h-8 w-8 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="text-white hover:text-primary">
                {t("dashboard.transfer")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card
            className="bg-white/10 border-white/20 backdrop-blur-sm cursor-pointer hover:bg-white/15 transition-all"
            onClick={() => router.push("/history")}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{t("dashboard.history")}</CardTitle>
                <History className="h-8 w-8 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="text-white hover:text-primary">
                {t("dashboard.history")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card
            className="bg-white/10 border-white/20 backdrop-blur-sm cursor-pointer hover:bg-white/15 transition-all"
            onClick={() => router.push("/services")}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{t("dashboard.services")}</CardTitle>
                <Settings className="h-8 w-8 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="text-white hover:text-primary">
                {t("dashboard.services")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">{t("dashboard.recentTransactions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    {transaction.type === "credit" ? (
                      <TrendingUp className="h-6 w-6 text-primary" />
                    ) : (
                      <TrendingDown className="h-6 w-6 text-secondary" />
                    )}
                    <div>
                      <p className="text-white font-medium">{transaction.description}</p>
                      <p className="text-white/60 text-sm">{transaction.date}</p>
                    </div>
                  </div>
                  <p
                    className={`text-lg font-semibold ${
                      transaction.type === "credit" ? "text-primary" : "text-secondary"
                    }`}
                  >
                    {transaction.amount} MAD
                  </p>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              onClick={() => router.push("/history")}
              className="w-full mt-4 text-white hover:text-primary"
            >
              {t("history.title")} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
