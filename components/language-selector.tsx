"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage, type Language } from "@/contexts/language-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const languages: { code: Language; name: string; flagImage: string }[] = [
  { code: "fr", name: "Français", flagImage: "https://flagcdn.com/w40/fr.png" },
  { code: "en", name: "English", flagImage: "https://flagcdn.com/w40/gb.png" },
  { code: "ar", name: "العربية", flagImage: "https://flagcdn.com/w40/ma.png" },
]

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const currentLang = languages.find((l) => l.code === language) || languages[0]

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary hover:bg-muted"
                aria-label="Change language"
              >
                <div className="relative w-6 h-6 rounded-sm overflow-hidden border border-white/20">
                  <Image
                    src={currentLang.flagImage}
                    alt={currentLang.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex items-center gap-3 cursor-pointer ${
                    language === lang.code ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <div className="relative w-6 h-4 rounded-sm overflow-hidden border border-white/20 flex-shrink-0">
                    <Image
                      src={lang.flagImage}
                      alt={lang.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <span>{lang.name}</span>
                  {language === lang.code && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent className="bg-popover border text-popover-foreground">
          <p>Changer de langue / Change language</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
