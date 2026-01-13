"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft, TrendingUp, TrendingDown, Filter } from "lucide-react"

export default function HistoryPage() {
  const router = useRouter()
  const { t } = useLanguage()

  // Mock transactions
  const transactions = [
    { id: 1, type: "credit", amount: "+2,500.00", description: "Virement reçu", date: "15 Déc 2024", time: "14:30" },
    { id: 2, type: "debit", amount: "-500.00", description: "Paiement facture", date: "14 Déc 2024", time: "10:15" },
    { id: 3, type: "credit", amount: "+1,200.00", description: "Salaire", date: "10 Déc 2024", time: "09:00" },
    { id: 4, type: "debit", amount: "-300.00", description: "Retrait DAB", date: "08 Déc 2024", time: "16:45" },
    { id: 5, type: "credit", amount: "+800.00", description: "Virement reçu", date: "05 Déc 2024", time: "11:20" },
  ]

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="text-white hover:text-white/80 hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              {t("account.back")}
            </Button>
            <h1 className="text-4xl font-bold text-white">{t("history.title")}</h1>
          </div>
          <Button
            variant="outline"
            className="border-white/20 bg-white/10 hover:bg-white/20 text-white"
          >
            <Filter className="mr-2 h-5 w-5" />
            {t("history.filter")}
          </Button>
        </div>

        {/* Transactions List */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">{t("history.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => {
                    // Show transaction details
                    alert(`${t("history.details")}: ${transaction.description}`)
                  }}
                >
                  <div className="flex items-center gap-4">
                    {transaction.type === "credit" ? (
                      <TrendingUp className="h-6 w-6 text-primary" />
                    ) : (
                      <TrendingDown className="h-6 w-6 text-secondary" />
                    )}
                    <div>
                      <p className="text-white font-medium">{transaction.description}</p>
                      <p className="text-white/60 text-sm">
                        {transaction.date} à {transaction.time}
                      </p>
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
