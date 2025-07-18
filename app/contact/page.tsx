"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageSquare, Globe, Github, Twitter, Linkedin, Heart, Coffee } from "lucide-react"

export default function Contact() {
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
          Get in Touch
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Have questions, suggestions, or feedback? We'd love to hear from you!
        </p>
      </motion.div>

      {/* Contact Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid md:grid-cols-2 gap-8 mb-12"
      >
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-blue-500" />
              <span>Email Support</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">For general inquiries, feature requests, or technical support.</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">General Support</span>
                <Badge variant="secondary">support@brainhubtech.com</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Privacy Questions</span>
                <Badge variant="secondary">privacy@brainhubtech.com</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Business Inquiries</span>
                <Badge variant="secondary">business@brainhubtech.com</Badge>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500">
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-green-500" />
              <span>Community</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Join our community for updates, tips, and discussions.</p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Github className="w-4 h-4 mr-2" />
                GitHub Repository
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Twitter className="w-4 h-4 mr-2" />
                Follow on Twitter
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Company Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-12"
      >
        <Card className="shadow-xl bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 border-0">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="w-6 h-6 text-red-500" />
              <span className="text-2xl font-bold">BrainHub Technologies</span>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              We're a passionate team dedicated to creating educational tools that make learning and teaching more
              efficient and enjoyable.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                Visit Website
              </Button>
              <Button variant="outline" size="sm">
                <Coffee className="w-4 h-4 mr-2" />
                Buy us a Coffee
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Is EZ GradeCalc really free?</h3>
              <p className="text-muted-foreground text-sm">
                Yes! EZ GradeCalc is completely free to use. We're supported by non-intrusive advertisements to keep the
                service free for everyone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I use this offline?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, once loaded, EZ GradeCalc works offline. All calculations happen in your browser without needing an
                internet connection.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer institutional licenses?</h3>
              <p className="text-muted-foreground text-sm">
                We're working on institutional features for schools and universities. Contact us at
                business@brainhubtech.com for more information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How can I contribute or suggest features?</h3>
              <p className="text-muted-foreground text-sm">
                We welcome contributions! Check out our GitHub repository or send us your ideas via email. We review all
                suggestions carefully.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
