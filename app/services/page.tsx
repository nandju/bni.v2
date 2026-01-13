"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft, Wallet, FileText, CreditCard, HelpCircle, ArrowRight } from "lucide-react"

function ServicesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()
  const action = searchParams.get("action")

  const services = [
    {
      id: "transfer",
      title: t("services.transfer"),
      description: "Effectuer un virement vers un autre compte",
      icon: Wallet,
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
    {
      id: "rib",
      title: t("services.rib"),
      description: "Consulter votre RIB",
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
    {
      id: "payment",
      title: t("services.payment"),
      description: "Effectuer des paiements",
      icon: CreditCard,
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
    {
      id: "request",
      title: t("services.request"),
      description: "Faire une demande de service",
      icon: HelpCircle,
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
  ]

  const handleServiceClick = (serviceId: string) => {
    // Navigate to specific service page or show modal
    alert(`Service: ${serviceId} - À implémenter`)
  }

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
          <h1 className="text-4xl font-bold text-white">{t("services.title")}</h1>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card
                key={service.id}
                className="bg-white/10 border-white/20 backdrop-blur-sm cursor-pointer hover:bg-white/15 transition-all"
                onClick={() => handleServiceClick(service.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-4 rounded-lg ${service.bgColor}`}>
                      <Icon className={`h-8 w-8 ${service.color}`} />
                    </div>
                  </div>
                  <CardTitle className="text-white text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-white/80">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="text-white hover:text-primary w-full">
                    Accéder <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="animate-spin h-20 w-20 text-primary"></div>
      </div>
    }>
      <ServicesContent />
    </Suspense>
  )
}
