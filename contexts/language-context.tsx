"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Language = "fr" | "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.account": "Mon compte",
    "nav.history": "Historique",
    "nav.services": "Services",
    "nav.profile": "Profil",
    "nav.logout": "Déconnexion",
    
    // Landing page
    "landing.welcome": "Bienvenue",
    "landing.accessAccount": "Accéder à mon compte",
    "landing.help": "Aide",
    "landing.legal": "Mentions légales",
    
    // Account number page
    "account.title": "Entrez votre numéro de compte",
    "account.instruction": "Veuillez saisir votre numéro de compte à 12 chiffres",
    "account.placeholder": "Numéro de compte",
    "account.continue": "Continuer",
    "account.back": "Retour",
    "account.error.format": "Format invalide. Veuillez entrer 12 chiffres.",
    "account.error.notFound": "Compte non reconnu",
    "account.error.server": "Erreur serveur. Veuillez réessayer.",
    
    // Loading page
    "loading.verifying": "Vérification de votre compte…",
    "loading.pleaseWait": "Veuillez patienter",
    
    // Error page
    "error.title": "Erreur",
    "error.accountNotFound": "Compte inexistant",
    "error.serviceUnavailable": "Service indisponible",
    "error.tooManyAttempts": "Trop de tentatives",
    "error.retry": "Réessayer",
    "error.contactAgency": "Contacter l'agence",
    
    // Auth page
    "auth.title": "Authentification",
    "auth.enterPin": "Entrez votre code PIN",
    "auth.pinPlaceholder": "Code PIN",
    "auth.sendCode": "Renvoyer le code",
    "auth.otpTitle": "Code de vérification",
    "auth.otpInstruction": "Entrez le code reçu par SMS",
    
    // Confirmation page
    "confirmation.success": "Connexion réussie",
    "confirmation.welcome": "Bienvenue",
    "confirmation.accessDashboard": "Accéder à mon espace",
    
    // Dashboard
    "dashboard.title": "Tableau de bord",
    "dashboard.balance": "Solde",
    "dashboard.accountNumber": "Numéro de compte",
    "dashboard.recentTransactions": "Dernières opérations",
    "dashboard.transfer": "Virements",
    "dashboard.history": "Historique",
    "dashboard.services": "Services",
    
    // History page
    "history.title": "Historique des opérations",
    "history.filter": "Filtrer",
    "history.details": "Détails",
    
    // Services page
    "services.title": "Services",
    "services.transfer": "Virement",
    "services.rib": "Consultation RIB",
    "services.payment": "Paiements",
    "services.request": "Demande de service",
    
    // Profile page
    "profile.title": "Profil",
    "profile.personalInfo": "Informations personnelles",
    "profile.security": "Sécurité",
    "profile.logout": "Déconnexion",
    
    // Logout page
    "logout.confirm": "Confirmer la déconnexion",
    "logout.message": "Êtes-vous sûr de vouloir vous déconnecter ?",
    "logout.confirmButton": "Déconnexion",
    "logout.cancel": "Annuler",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.account": "My account",
    "nav.history": "History",
    "nav.services": "Services",
    "nav.profile": "Profile",
    "nav.logout": "Logout",
    
    // Landing page
    "landing.welcome": "Welcome",
    "landing.accessAccount": "Access my account",
    "landing.help": "Help",
    "landing.legal": "Legal notice",
    
    // Account number page
    "account.title": "Enter your account number",
    "account.instruction": "Please enter your 12-digit account number",
    "account.placeholder": "Account number",
    "account.continue": "Continue",
    "account.back": "Back",
    "account.error.format": "Invalid format. Please enter 12 digits.",
    "account.error.notFound": "Account not recognized",
    "account.error.server": "Server error. Please try again.",
    
    // Loading page
    "loading.verifying": "Verifying your account…",
    "loading.pleaseWait": "Please wait",
    
    // Error page
    "error.title": "Error",
    "error.accountNotFound": "Account not found",
    "error.serviceUnavailable": "Service unavailable",
    "error.tooManyAttempts": "Too many attempts",
    "error.retry": "Retry",
    "error.contactAgency": "Contact agency",
    
    // Auth page
    "auth.title": "Authentication",
    "auth.enterPin": "Enter your PIN code",
    "auth.pinPlaceholder": "PIN code",
    "auth.sendCode": "Resend code",
    "auth.otpTitle": "Verification code",
    "auth.otpInstruction": "Enter the code received by SMS",
    
    // Confirmation page
    "confirmation.success": "Login successful",
    "confirmation.welcome": "Welcome",
    "confirmation.accessDashboard": "Access my dashboard",
    
    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.balance": "Balance",
    "dashboard.accountNumber": "Account number",
    "dashboard.recentTransactions": "Recent transactions",
    "dashboard.transfer": "Transfers",
    "dashboard.history": "History",
    "dashboard.services": "Services",
    
    // History page
    "history.title": "Transaction history",
    "history.filter": "Filter",
    "history.details": "Details",
    
    // Services page
    "services.title": "Services",
    "services.transfer": "Transfer",
    "services.rib": "RIB consultation",
    "services.payment": "Payments",
    "services.request": "Service request",
    
    // Profile page
    "profile.title": "Profile",
    "profile.personalInfo": "Personal information",
    "profile.security": "Security",
    "profile.logout": "Logout",
    
    // Logout page
    "logout.confirm": "Confirm logout",
    "logout.message": "Are you sure you want to logout?",
    "logout.confirmButton": "Logout",
    "logout.cancel": "Cancel",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.account": "حسابي",
    "nav.history": "السجل",
    "nav.services": "الخدمات",
    "nav.profile": "الملف الشخصي",
    "nav.logout": "تسجيل الخروج",
    
    // Landing page
    "landing.welcome": "مرحبا",
    "landing.accessAccount": "الوصول إلى حسابي",
    "landing.help": "مساعدة",
    "landing.legal": "إشعار قانوني",
    
    // Account number page
    "account.title": "أدخل رقم حسابك",
    "account.instruction": "يرجى إدخال رقم حسابك المكون من 12 رقمًا",
    "account.placeholder": "رقم الحساب",
    "account.continue": "متابعة",
    "account.back": "رجوع",
    "account.error.format": "تنسيق غير صالح. يرجى إدخال 12 رقمًا.",
    "account.error.notFound": "الحساب غير معروف",
    "account.error.server": "خطأ في الخادم. يرجى المحاولة مرة أخرى.",
    
    // Loading page
    "loading.verifying": "التحقق من حسابك…",
    "loading.pleaseWait": "يرجى الانتظار",
    
    // Error page
    "error.title": "خطأ",
    "error.accountNotFound": "الحساب غير موجود",
    "error.serviceUnavailable": "الخدمة غير متاحة",
    "error.tooManyAttempts": "محاولات كثيرة جدًا",
    "error.retry": "إعادة المحاولة",
    "error.contactAgency": "اتصل بالوكالة",
    
    // Auth page
    "auth.title": "المصادقة",
    "auth.enterPin": "أدخل رمز PIN الخاص بك",
    "auth.pinPlaceholder": "رمز PIN",
    "auth.sendCode": "إعادة إرسال الرمز",
    "auth.otpTitle": "رمز التحقق",
    "auth.otpInstruction": "أدخل الرمز المستلم عبر الرسائل القصيرة",
    
    // Confirmation page
    "confirmation.success": "تم تسجيل الدخول بنجاح",
    "confirmation.welcome": "مرحبا",
    "confirmation.accessDashboard": "الوصول إلى لوحة التحكم",
    
    // Dashboard
    "dashboard.title": "لوحة التحكم",
    "dashboard.balance": "الرصيد",
    "dashboard.accountNumber": "رقم الحساب",
    "dashboard.recentTransactions": "المعاملات الأخيرة",
    "dashboard.transfer": "التحويلات",
    "dashboard.history": "السجل",
    "dashboard.services": "الخدمات",
    
    // History page
    "history.title": "سجل المعاملات",
    "history.filter": "تصفية",
    "history.details": "التفاصيل",
    
    // Services page
    "services.title": "الخدمات",
    "services.transfer": "تحويل",
    "services.rib": "استشارة RIB",
    "services.payment": "المدفوعات",
    "services.request": "طلب خدمة",
    
    // Profile page
    "profile.title": "الملف الشخصي",
    "profile.personalInfo": "المعلومات الشخصية",
    "profile.security": "الأمان",
    "profile.logout": "تسجيل الخروج",
    
    // Logout page
    "logout.confirm": "تأكيد تسجيل الخروج",
    "logout.message": "هل أنت متأكد أنك تريد تسجيل الخروج؟",
    "logout.confirmButton": "تسجيل الخروج",
    "logout.cancel": "إلغاء",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "fr" || saved === "en" || saved === "ar")) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
