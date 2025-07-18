"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, Database, Eye, Lock, Server, Cookie, ExternalLink } from "lucide-react"

const privacyPoints = [
  {
    icon: Database,
    title: "Local Storage Only",
    description:
      "All your data is stored locally in your browser. We never send your calculations to external servers.",
    badge: "Client-side",
  },
  {
    icon: Eye,
    title: "No Tracking",
    description: "We do not track your usage, collect analytics, or monitor your behavior on our website.",
    badge: "Anonymous",
  },
  {
    icon: Server,
    title: "No Account Required",
    description: "Use all features without creating an account or providing personal information.",
    badge: "No Registration",
  },
  {
    icon: Cookie,
    title: "Essential Cookies Only",
    description: "We only use essential cookies for basic functionality like dark mode preferences.",
    badge: "Minimal",
  },
]

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Privacy Policy
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your privacy is our priority. Learn how we protect your data and respect your privacy.
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <span>Last updated: December 2024</span>
        </div>
      </motion.div>

      {/* Privacy Commitment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <Card className="shadow-xl bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-0">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Privacy-First Design</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              EZ GradeCalc is built with privacy as a core principle. We believe your academic data should remain
              private and under your control at all times.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Privacy Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-center mb-8">How We Protect Your Privacy</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {privacyPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="shadow-lg h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-8 h-8 text-blue-500" />
                        <CardTitle className="text-lg">{point.title}</CardTitle>
                      </div>
                      <Badge variant="secondary">{point.badge}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{point.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Detailed Privacy Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-12"
      >
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Detailed Privacy Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Data Collection */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2 text-blue-500" />
                Data Collection
              </h3>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <strong>What we collect:</strong> We do not collect any personal information, usage data, or
                  analytics. The only data stored is:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Your grade calculations (stored locally in your browser)</li>
                  <li>Your custom grading scale preferences (stored locally)</li>
                  <li>Your theme preference (dark/light mode)</li>
                </ul>
                <p>
                  <strong>What we don't collect:</strong> Names, email addresses, IP addresses, usage patterns, or any
                  personally identifiable information.
                </p>
              </div>
            </div>

            <Separator />

            {/* Data Storage */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-green-500" />
                Data Storage
              </h3>
              <div className="space-y-3 text-muted-foreground">
                <p>All your data is stored locally in your browser using localStorage. This means:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Your data never leaves your device</li>
                  <li>We cannot access your calculations or preferences</li>
                  <li>Your data is automatically deleted if you clear your browser data</li>
                  <li>No backups are created on external servers</li>
                </ul>
              </div>
            </div>

            <Separator />

            {/* Third-Party Services */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <ExternalLink className="w-5 h-5 mr-2 text-yellow-500" />
                Third-Party Services
              </h3>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <strong>Google AdSense:</strong> We use Google AdSense to display advertisements. AdSense may:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Use cookies to serve relevant ads</li>
                  <li>Collect anonymous usage data for ad targeting</li>
                  <li>Store preferences for ad personalization</li>
                </ul>
                <p className="text-sm">
                  You can opt out of personalized advertising by visiting{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Ad Settings
                  </a>
                  .
                </p>
              </div>
            </div>

            <Separator />

            {/* Your Rights */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-purple-500" />
                Your Rights
              </h3>
              <div className="space-y-3 text-muted-foreground">
                <p>Since we don't collect personal data, you have complete control:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Clear your browser data to remove all stored information</li>
                  <li>Use the app without any registration or identification</li>
                  <li>Export your data anytime using our built-in export features</li>
                  <li>Use the app offline without any data transmission</li>
                </ul>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>If you have any questions about this Privacy Policy or our privacy practices, please contact us:</p>
                <div className="bg-muted p-4 rounded-lg">
                  <p>
                    <strong>BrainHub Technologies</strong>
                  </p>
                  <p>Email: privacy@brainhubtech.com</p>
                  <p>Website: www.brainhubtech.com</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Updates Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card className="shadow-xl border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Policy Updates</h3>
                <p className="text-sm text-muted-foreground">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
                  updated revision date. Since we don't collect contact information, we recommend checking this page
                  periodically for updates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
