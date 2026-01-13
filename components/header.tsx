"use client"

import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  Newspaper,
  Sparkles,
  GalleryVerticalEnd,
  Menu,
  X,
  LogIn,
  UserPlus,
  Layers,
} from "lucide-react" // Replaced Orbit/Waves with Layers
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"
import FocusTrap from "focus-trap-react"
import { useDrag } from "@use-gesture/react"
import { Button } from "@/components/ui/button"
import type { BlobMode } from "@/components/enhanced-lava-lamp-3d"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip" // Import Tooltip components
import LanguageSelector from "@/components/language-selector"

interface HeaderProps {
  cycleLavaMode: () => void
  currentLavaMode: BlobMode
  nextLavaMode: BlobMode // Add next mode to show in tooltip/mobile menu
}

export default function Header({ cycleLavaMode, currentLavaMode, nextLavaMode }: HeaderProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const navItems: { href: string; label: string; icon: any }[] = []

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }, [pathname])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

  const bindDrawerDrag = useDrag(
    ({ down, movement: [mx], direction: [dx], velocity: [vx] }) => {
      if (!down && mx > 100 && dx > 0 && vx > 0.5) {
        setIsMobileMenuOpen(false)
      }
    },
    { axis: "x", filterTaps: true, eventOptions: { passive: false } },
  )

  return (
    <>
      <header className="sticky top-0 z-60 h-16 bg-background/80 backdrop-blur-md shadow-lg flex items-center border-b border-white/20">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-bold text-primary hover:text-primary/80 transition-colors"
            onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
          >
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0">
              <Image
                src="/logo_bni.jpg"
                alt="Logo BNI"
                width={48}
                height={48}
                className="object-contain w-full h-full"
              />
            </div>
            <span className="text-lg sm:text-xl text-white hidden md:inline">Banque Nationale d&apos;Investissement</span>
            <span className="text-lg sm:text-xl text-white md:hidden">BNI</span>
          </Link>

          {/* Navigation removed for ATM interface */}

          <div className="flex items-center">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={cycleLavaMode}
                    variant="ghost"
                    size="icon"
                    className="hidden lg:inline-flex text-muted-foreground hover:text-primary hover:bg-muted mr-3"
                    aria-label="Cycle Background Mode"
                  >
                    <Layers className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-popover border text-popover-foreground">
                  <p className="capitalize">Mode: {currentLavaMode}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="hidden lg:inline-flex mr-3">
              <LanguageSelector />
            </div>

            {/* Auth buttons removed for ATM interface */}

            <div className="lg:hidden ml-3">
              <button
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={isMobileMenuOpen}
                className="relative p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
                <div className="relative w-6 h-6">
                  <Menu
                    className={cn(
                      "absolute w-6 h-6 transition-all duration-300 ease-in-out",
                      isMobileMenuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100",
                    )}
                  />
                  <X
                    className={cn(
                      "absolute w-6 h-6 transition-all duration-300 ease-in-out",
                      isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50",
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <FocusTrap
          active={isMobileMenuOpen}
          focusTrapOptions={{
            initialFocus: false,
            allowOutsideClick: true,
          }}
        >
          <div>
            <div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md lg:hidden"
              onClick={toggleMobileMenu}
              aria-hidden="true"
            />
            <div
              ref={drawerRef}
              {...bindDrawerDrag()}
              className={cn(
                "fixed top-0 right-0 h-full w-72 bg-background shadow-2xl transform transition-all duration-300 ease-out lg:hidden z-70 border-l border-border",
                isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
            >
              <div className="flex justify-between items-center p-5 border-b border-border">
                <h2 id="mobile-menu-title" className="text-lg font-semibold text-primary">
                  Navigation
                </h2>
                <button
                  onClick={toggleMobileMenu}
                  aria-label="Close mobile menu"
                  className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col p-5 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors hover:bg-muted hover:text-secondary",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:text-muted-foreground",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-border">
                  <button
                    onClick={() => {
                      cycleLavaMode()
                    }}
                    className="flex items-center w-full px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-primary"
                    aria-label="Cycle Background Mode"
                  >
                    <Layers className="w-5 h-5 mr-3" />
                    <span className="capitalize">Mode: {currentLavaMode}</span>
                  </button>
                </div>
                <div className="pt-4 mt-2 border-t border-border space-y-2">
                  <Link
                    href="/auth/login"
                    className="flex items-center px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn className="w-5 h-5 mr-3" /> Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="flex items-center px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserPlus className="w-5 h-5 mr-3" /> Sign Up
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </FocusTrap>
      )}
    </>
  )
}
