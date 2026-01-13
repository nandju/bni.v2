"use client"

import { useLanguage } from "@/contexts/language-context"
import { Phone, Mail } from "lucide-react"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative z-10 border-t border-white/20 bg-background/30 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-white/80 text-sm">
              &copy; {new Date().getFullYear()} Banque Nationale d&apos;Investissement. Tous droits réservés.
            </p>
          </div>
          <div className="flex items-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+212 5XX XXX XXX</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>contact@bni.ma</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
