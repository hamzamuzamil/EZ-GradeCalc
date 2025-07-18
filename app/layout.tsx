import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { AdBannerProps } from "@/components/ui/ad-banner";

const ThemeProvider = dynamic(() => import("@/components/theme-provider").then(mod => mod.ThemeProvider), { ssr: false })
const Toaster = dynamic(() => import("@/components/ui/toaster").then(mod => mod.Toaster), { ssr: false })

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EZ GradeCalc - Instant Grade Calculator",
  description:
    "Calculate test scores in seconds with our modern, easy-to-use grade calculator. Perfect for students and teachers.",
  keywords: "grade calculator, test score, percentage calculator, student tools, teacher resources",
  generator: 'v0.dev'
}

// AdBanner component for lazy loading, using default export and no explicit generic
// const AdBanner = dynamic<AdBannerProps>(
//   () => import("@/components/ui/ad-banner").then(mod => mod.AdBanner),
//   {
//     ssr: false,
//     loading: () => <div style={{ height: 80 }} />,
//   }
// );
const AdBanner = dynamic(() => import("@/components/ui/ad-banner"), {
  ssr: false,
  loading: () => <div style={{ height: 80 }} />,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <AdBanner position="top" />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <AdBanner position="bottom" />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
