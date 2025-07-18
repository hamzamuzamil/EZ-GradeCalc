"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator, Zap, Shield, Smartphone, Users, BookOpen, Target, Heart, Star, Award } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant calculations with real-time results as you type",
    color: "text-yellow-500",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "All calculations happen locally - no data sent to servers",
    color: "text-green-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Perfect experience on all devices with responsive design",
    color: "text-blue-500",
  },
  {
    icon: Users,
    title: "For Everyone",
    description: "Designed for students, teachers, and educational professionals",
    color: "text-purple-500",
  },
]

const benefits = [
  {
    icon: BookOpen,
    title: "For Students",
    description: "Quickly calculate test scores, track your progress, and understand your grades better.",
    points: ["Instant grade calculations", "Track multiple test scores", "Understand grade scales"],
  },
  {
    icon: Target,
    title: "For Teachers",
    description: "Streamline grading processes and create custom grading scales for your classes.",
    points: ["Custom grading scales", "Bulk grade calculations", "Export and share results"],
  },
  {
    icon: Award,
    title: "For Schools",
    description: "Standardize grading processes and provide consistent tools across departments.",
    points: ["Consistent grading standards", "Easy-to-use interface", "Accessible from any device"],
  },
]

const stats = [
  { number: "100%", label: "Free to Use", icon: Heart },
  { number: "0", label: "Data Collected", icon: Shield },
  { number: "∞", label: "Calculations", icon: Calculator },
  { number: "24/7", label: "Available", icon: Star },
]

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          About EZ GradeCalc
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          A modern, intuitive grade calculator designed to make academic life easier for students, teachers, and
          educational institutions worldwide.
        </p>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <Card className="shadow-xl bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              To provide the most user-friendly, accessible, and powerful grade calculation tools that help students
              understand their academic progress and assist educators in streamlining their grading processes.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose EZ GradeCalc?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <Icon className={`w-12 h-12 ${feature.color} mx-auto mb-4`} />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Benefits for Different Users */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Built for Everyone</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="shadow-xl h-full">
                  <CardHeader className="text-center">
                    <Icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{benefit.description}</p>
                    <ul className="space-y-2">
                      {benefit.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mb-12"
      >
        <Card className="shadow-xl bg-gradient-to-r from-blue-500 to-green-500 text-white border-0">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center mb-8">By the Numbers</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2 opacity-80" />
                    <div className="text-3xl font-bold mb-1">{stat.number}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Technical Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Technical Excellence</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Performance & Accessibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Lightning-fast calculations</span>
                <Badge variant="secondary">Real-time</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Responsive design</span>
                <Badge variant="secondary">Mobile-first</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Screen reader support</span>
                <Badge variant="secondary">ARIA compliant</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Keyboard navigation</span>
                <Badge variant="secondary">Fully accessible</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Dark mode support</span>
                <Badge variant="secondary">Eye-friendly</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Local storage only</span>
                <Badge variant="secondary">No servers</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>No data collection</span>
                <Badge variant="secondary">100% private</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Offline functionality</span>
                <Badge variant="secondary">Works anywhere</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Open source friendly</span>
                <Badge variant="secondary">Transparent</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>No tracking</span>
                <Badge variant="secondary">Anonymous</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <Card className="shadow-xl bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Join thousands of students and teachers who trust EZ GradeCalc for their grade calculations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a href="/" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
                  Start Calculating
                </div>
              </motion.a>
              <motion.a
                href="/average"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <div className="border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors">
                  Try Average Calculator
                </div>
              </motion.a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
