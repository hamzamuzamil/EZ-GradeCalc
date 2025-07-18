import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EZ GradeCalc - Instant Grade Calculator",
  description:
    "Calculate test scores in seconds with our modern, easy-to-use grade calculator. Perfect for students and teachers.",
  keywords: "grade calculator, test score, percentage calculator, student tools, teacher resources",
    generator: 'v0.dev'
}

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
            {/* AdSense Top Banner Space */}
            <div className="w-full h-20 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 flex items-center justify-center border-b">
              <div className="text-sm text-muted-foreground">Advertisement Space (728x90)</div>
            </div>

            <Header />
            <main className="flex-1">{children}</main>
            <Footer />

            {/* AdSense Bottom Banner Space */}
            <div className="w-full h-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 flex items-center justify-center border-t">
              <div className="text-sm text-muted-foreground">Advertisement Space (Responsive)</div>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
