"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, Copy, Download, Share2, ChevronDown, ChevronUp, Trophy, Target, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { calculateGrade, saveToLocalStorage, loadFromLocalStorage, sanitizeInput } from "@/lib/grade-utils"
import { useChartData } from "@/hooks/use-chart-data"
import { useAnimatedCounter } from "@/hooks/use-animated-counter"

interface GradeResult {
  totalQuestions: number
  wrongAnswers: number
  correctAnswers: number
  percentage: number
  letterGrade: string
  emoji: string
  color: string
}

export default function GradeCalculator() {
  const [totalQuestions, setTotalQuestions] = useState<string>("")
  const [wrongAnswers, setWrongAnswers] = useState<string>("")
  const [showDecimals, setShowDecimals] = useState(false)
  const [showChart, setShowChart] = useState(false)
  const [result, setResult] = useState<GradeResult | null>(null)
  const [error, setError] = useState<string>("")
  const prefersReducedMotion = useReducedMotion();
  const chartData = useChartData(totalQuestions, 200);
  const animatedPercentage = useAnimatedCounter(result?.percentage ?? 0, !!prefersReducedMotion);

  // Load saved result from localStorage
  useEffect(() => {
    const savedResult = loadFromLocalStorage<GradeResult | null>("lastGradeResult", null)
    if (savedResult) {
      setResult(savedResult)
      setTotalQuestions(savedResult.totalQuestions.toString())
      setWrongAnswers(savedResult.wrongAnswers.toString())
    }
  }, [])

  // Calculation logic
  const handleCalculate = useCallback((total: string, wrong: string) => {
    const totalNum = parseInt(total) || 0
    const wrongNum = parseInt(wrong) || 0

    if (totalNum <= 0) {
      setResult(null)
      setError("")
      return
    }

    const calculation = calculateGrade(totalNum, wrongNum)

    if (!calculation.success) {
      setError(calculation.error || "Calculation error")
      setResult(null)
      return
    }

    setError("")
    setResult(calculation.data!)
    saveToLocalStorage("lastGradeResult", calculation.data!)
  }, [])

  // Live calculation
  useEffect(() => {
    handleCalculate(totalQuestions, wrongAnswers)
  }, [totalQuestions, wrongAnswers, handleCalculate])

  // Chart data limit
  const CHART_LIMIT = 200;

  // Secure input handlers with sanitization
  const handleTotalQuestionsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizeInput(e.target.value)
    const numValue = parseInt(value)
    
    // Limit to reasonable range
    if (value === "" || (numValue >= 1 && numValue <= 1000)) {
      setTotalQuestions(value)
    }
  }, [])

  const handleWrongAnswersChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizeInput(e.target.value)
    const numValue = parseInt(value)
    
    // Limit to reasonable range
    if (value === "" || (numValue >= 0 && numValue <= 1000)) {
      setWrongAnswers(value)
    }
  }, [])

  const copyToClipboard = useCallback(async () => {
    if (!result) return

    try {
      const text = `${result.correctAnswers}/${result.totalQuestions} = ${
        showDecimals ? result.percentage.toFixed(2) : Math.round(result.percentage)
      }% (${result.letterGrade})`

      await navigator.clipboard.writeText(text)
      toast({
        title: "Success",
        description: "Result copied to clipboard!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }, [result, showDecimals])

  const shareResult = useCallback(async () => {
    if (!result) return

    try {
      const url = `${window.location.origin}?total=${result.totalQuestions}&wrong=${result.wrongAnswers}`
      await navigator.clipboard.writeText(url)
      toast({
        title: "Success",
        description: "Share link copied to clipboard!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy share link",
        variant: "destructive",
      })
    }
  }, [result])

  const downloadPDF = useCallback(() => {
    toast({
      title: "Info",
      description: "PDF download feature coming soon!",
    })
  }, [])

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
      {/* Hero Section */}
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 bg-clip-text text-transparent mb-4 leading-tight">
            Instant Grade Calculator
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
            Calculate test scores in seconds with our modern, intuitive tool
          </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Calculator Form */}
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 h-fit">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                  <Calculator className="w-5 h-5" />
                  <span>Grade Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="total" className="text-sm font-medium">
                    Total Questions
                  </Label>
                  <Input
                    id="total"
                    type="number"
                    placeholder="Enter total questions"
                    value={totalQuestions}
                    onChange={handleTotalQuestionsChange}
                    className="text-lg"
                    min="1"
                    max="1000"
                    aria-describedby="total-help"
                    aria-label="Total number of questions"
                    disabled={false} // isCalculating is removed
                  />
                  <p id="total-help" className="text-xs text-muted-foreground">
                    The total number of questions on the test (1-1000)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wrong" className="text-sm font-medium">
                    Wrong Answers
                  </Label>
                  <Input
                    id="wrong"
                    type="number"
                    placeholder="Enter wrong answers"
                    value={wrongAnswers}
                    onChange={handleWrongAnswersChange}
                    className="text-lg"
                    min="0"
                    max="1000"
                    aria-describedby="wrong-help"
                    aria-label="Number of wrong answers"
                    disabled={false} // isCalculating is removed
                  />
                  <p id="wrong-help" className="text-xs text-muted-foreground">
                    The number of questions answered incorrectly
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="decimals" 
                    checked={showDecimals} 
                    onCheckedChange={setShowDecimals}
                    aria-label="Toggle decimal display"
                  />
                  <Label htmlFor="decimals" className="text-sm">Show Decimals</Label>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", bounce: 0.3 }}
                    >
                      <Alert variant="destructive" role="alert">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* isCalculating is removed */}
              </CardContent>
            </Card>
          </motion.div>

          {/* Result Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", bounce: 0.3 }}
                >
                  <Card className={`shadow-xl border-0 ${result.color} text-white h-fit`}>
                    <CardHeader className="text-center">
                      <div className="text-4xl sm:text-5xl lg:text-6xl mb-2" role="img" aria-label={`Grade ${result.letterGrade}`}>
                        {result.emoji}
                      </div>
                      <CardTitle className="text-xl sm:text-2xl">Grade Result</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold animate-counter" aria-live="polite">
                        {showDecimals ? animatedPercentage.toFixed(2) : Math.round(animatedPercentage)}%
                      </div>

                      <div className="text-lg sm:text-xl">
                        {result.correctAnswers}/{result.totalQuestions} = {result.letterGrade}
                      </div>

                      <div className="flex justify-center space-x-2 pt-4">
                        <Badge variant="secondary" className="text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2">
                          <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          {result.letterGrade} Grade
                        </Badge>
                      </div>

                      <Separator className="bg-white/20" />

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={copyToClipboard}
                          className="bg-white/20 hover:bg-white/30 text-white border-white/20 w-full"
                          aria-label="Copy result to clipboard"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={shareResult}
                          className="bg-white/20 hover:bg-white/30 text-white border-white/20 w-full"
                          aria-label="Share result link"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={downloadPDF}
                          className="bg-white/20 hover:bg-white/30 text-white border-white/20 w-full"
                          aria-label="Download PDF report"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
        </motion.div>
      </div>

      {/* Grading Chart Section */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <Card className="shadow-xl">
            <CardHeader>
              <Button
                variant="ghost"
                onClick={() => setShowChart(!showChart)}
                className="flex items-center justify-between w-full p-0 h-auto"
              >
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Grading Chart</span>
                </CardTitle>
                {showChart ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </CardHeader>

            <AnimatePresence>
              {showChart && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-96 overflow-y-auto">
                      {chartData.map((item, index) => (
                        <motion.div
                          key={`${item.wrong}-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.02 }}
                          className={`p-2 sm:p-3 rounded-lg text-center text-xs sm:text-sm ${
                            item.percentage >= 90
                              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                              : item.percentage >= 80
                                ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                                : item.percentage >= 70
                                  ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                                  : item.percentage >= 60
                                    ? "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200"
                                    : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                          }`}
                          role="gridcell"
                          aria-label={`${item.wrong} wrong answers: ${Math.round(item.percentage)}% grade ${item.grade}`}
                        >
                          <div className="font-semibold">{item.wrong} wrong</div>
                          <div className="text-xs opacity-75">
                            {Math.round(item.percentage)}% ({item.grade})
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      )}
      {/* Chart Limit Warning */}
      {parseInt(totalQuestions) > CHART_LIMIT && (
        <div className="mt-4 text-center text-sm text-red-500">
          Chart preview is limited to {CHART_LIMIT} questions for best performance.
        </div>
      )}
    </div>
  )
}
