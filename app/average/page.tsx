"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, BarChart3, Copy, Download, Save, Trophy, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { getLetterGrade, saveToLocalStorage, loadFromLocalStorage, sanitizeInput, validatePercentage } from "@/lib/grade-utils"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TestScore {
  id: string
  name: string
  score: number
  maxScore: number
}

export default function AverageCalculator() {
  const [tests, setTests] = useState<TestScore[]>([{ id: "1", name: "Test 1", score: 0, maxScore: 100 }])
  const [animatedAverage, setAnimatedAverage] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Load saved tests from localStorage
  useEffect(() => {
    const savedTests = loadFromLocalStorage<TestScore[]>("averageCalculatorTests", [])
    if (savedTests && Array.isArray(savedTests) && savedTests.length > 0) {
      setTests(savedTests)
    }
  }, [])

  // Save tests to localStorage whenever tests change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToLocalStorage("averageCalculatorTests", tests)
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [tests])

  // Calculate average and grade
  const { average, grade, gradeEmoji, gradeColor } = useMemo(() => {
    const validTests = tests.filter(test => test.maxScore > 0)
    if (validTests.length === 0) return { average: 0, grade: "F", gradeEmoji: "❌", gradeColor: "grade-f" }

    const totalScore = validTests.reduce((sum, test) => sum + test.score, 0)
    const totalMaxScore = validTests.reduce((sum, test) => sum + test.maxScore, 0)
    const avg = totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 0
    
    const gradeInfo = getLetterGrade(avg)
    return {
      average: avg,
      grade: gradeInfo.grade,
      gradeEmoji: gradeInfo.emoji,
      gradeColor: gradeInfo.color
    }
  }, [tests])

  // Validation function
  const validateTest = useCallback((test: TestScore): string[] => {
    const testErrors: string[] = []
    
    if (!test.name.trim()) {
      testErrors.push("Test name is required")
    }
    
    if (!validatePercentage(test.score) || test.score < 0) {
      testErrors.push("Score must be a valid positive number")
    }
    
    if (!validatePercentage(test.maxScore) || test.maxScore <= 0) {
      testErrors.push("Max score must be greater than 0")
    }
    
    if (test.score > test.maxScore) {
      testErrors.push("Score cannot exceed max score")
    }
    
    return testErrors
  }, [])

  const addTest = useCallback(() => {
    const newTest: TestScore = {
      id: Date.now().toString(),
      name: `Test ${tests.length + 1}`,
      score: 0,
      maxScore: 100,
    }
    setTests(prev => [...prev, newTest])
  }, [tests.length])

  const removeTest = useCallback((id: string) => {
    if (tests.length > 1) {
      setTests(prev => prev.filter((test) => test.id !== id))
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[id]
        return newErrors
      })
    } else {
      toast({
        title: "Cannot Remove",
        description: "At least one test is required",
        variant: "destructive",
      })
    }
  }, [tests.length])

  const updateTest = useCallback((id: string, field: keyof TestScore, value: string | number) => {
    setTests(prev => prev.map((test) => {
      if (test.id === id) {
        const sanitizedValue = typeof value === 'string' ? sanitizeInput(value) : value
        const updatedTest = { ...test, [field]: sanitizedValue }
        
        // Validate the updated test
        const testErrors = validateTest(updatedTest)
        setErrors(prevErrors => ({
          ...prevErrors,
          [id]: testErrors.length > 0 ? testErrors.join(', ') : ''
        }))
        
        return updatedTest
      }
      return test
    }))
  }, [validateTest])

  // Animate average counter
  useEffect(() => {
    setIsCalculating(true)
    const timer = setTimeout(() => {
      setIsCalculating(false)
    }, 300)

    const startValue = animatedAverage
    const endValue = average
    const duration = 1000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (endValue - startValue) * easeOutQuart

      setAnimatedAverage(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
    return () => clearTimeout(timer)
  }, [average])

  const copyResult = useCallback(async () => {
    try {
      const result = `Average: ${average.toFixed(2)}% (${grade})`
      await navigator.clipboard.writeText(result)
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }, [average, grade])

  const exportData = useCallback(() => {
    try {
      const data = {
        tests: tests.map(test => ({
          ...test,
          percentage: test.maxScore > 0 ? ((test.score / test.maxScore) * 100).toFixed(2) : '0'
        })),
        average: average.toFixed(2),
        grade,
        exportDate: new Date().toISOString(),
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `grade-average-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      toast({
        title: "Success",
        description: "Data exported successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export data",
        variant: "destructive",
      })
    }
  }, [tests, average, grade])

  const saveData = useCallback(() => {
    const success = saveToLocalStorage("averageCalculatorBackup", tests)
    toast({
      title: success ? "Success" : "Error",
      description: success ? "Data saved successfully!" : "Failed to save data",
      variant: success ? "default" : "destructive",
    })
  }, [tests])

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
          Average Calculator
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
          Calculate your average grade across multiple tests and assignments
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Tests Input */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-xl">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                  <BarChart3 className="w-5 h-5" />
                  <span>Test Scores</span>
                </CardTitle>
                <Button 
                  onClick={addTest} 
                  size="sm" 
                  className="bg-gradient-to-r from-blue-500 to-green-500 w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Test
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {tests.map((test, index) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 border rounded-lg space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <Input
                        placeholder="Test name"
                        value={test.name}
                        onChange={(e) => updateTest(test.id, "name", e.target.value)}
                        className="flex-1 text-sm"
                      />
                      {tests.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTest(test.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-muted-foreground">Score</label>
                        <Input
                          type="number"
                          placeholder="Score"
                          value={test.score || ""}
                          onChange={(e) => updateTest(test.id, "score", parseFloat(e.target.value) || 0)}
                          className="text-sm"
                          min="0"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-muted-foreground">Max Score</label>
                        <Input
                          type="number"
                          placeholder="Max score"
                          value={test.maxScore || ""}
                          onChange={(e) => updateTest(test.id, "maxScore", parseFloat(e.target.value) || 0)}
                          className="text-sm"
                          min="1"
                        />
                      </div>
                    </div>

                    {test.maxScore > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Percentage:</span>
                        <Badge variant="outline" className="font-mono">
                          {((test.score / test.maxScore) * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    )}

                    {errors[test.id] && (
                      <Alert variant="destructive" className="py-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-xs">
                          {errors[test.id]}
                        </AlertDescription>
                      </Alert>
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Results */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-xl sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                  <Trophy className="w-5 h-5" />
                  <span>Average Grade</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                      {animatedAverage.toFixed(1)}%
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-lg px-3 py-1 font-bold ${
                        grade === 'A' ? 'border-green-500 text-green-700' :
                        grade === 'B' ? 'border-blue-500 text-blue-700' :
                        grade === 'C' ? 'border-yellow-500 text-yellow-700' :
                        grade === 'D' ? 'border-orange-500 text-orange-700' :
                        'border-red-500 text-red-700'
                      }`}
                    >
                      {grade}
                    </Badge>
                  </div>
                  
                  {isCalculating && (
                    <div className="text-sm text-muted-foreground animate-pulse">
                      Calculating...
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={copyResult} 
                    variant="outline" 
                    className="w-full"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Result
                  </Button>
                  
                  <Button 
                    onClick={exportData} 
                    variant="outline" 
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  
                  <Button 
                    onClick={saveData} 
                    variant="outline" 
                    className="w-full"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Backup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-6 sm:mt-8"
      >
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">
                  {tests.length}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Total Tests</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  {Math.max(...tests.map(t => t.maxScore > 0 ? (t.score / t.maxScore) * 100 : 0)).toFixed(1)}%
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Highest Score</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold text-orange-600">
                  {Math.min(...tests.map(t => t.maxScore > 0 ? (t.score / t.maxScore) * 100 : 0)).toFixed(1)}%
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Lowest Score</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">
                  {tests.reduce((sum, test) => sum + test.score, 0)}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Total Points</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}