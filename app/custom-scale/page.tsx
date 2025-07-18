"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Settings, Save, RotateCcw, Check, AlertCircle, Eye } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { defaultGradeScale, saveToLocalStorage, loadFromLocalStorage, sanitizeInput, validatePercentage } from "@/lib/grade-utils"
// import { ErrorBoundary } from "@/components/error-boundary"
import type { GradeScale } from "@/lib/grade-utils"

export default function CustomScale() {
  const [scale, setScale] = useState<GradeScale[]>(defaultGradeScale)
  const [testPercentage, setTestPercentage] = useState(85)
  const [errors, setErrors] = useState<Record<number, string>>({})
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  // Load saved scale from localStorage
  useEffect(() => {
    const savedScale = loadFromLocalStorage<GradeScale[]>("customGradeScale", defaultGradeScale)
    if (savedScale && Array.isArray(savedScale) && savedScale.length > 0) {
      setScale(savedScale)
    }
  }, [])

  // Validation function
  const validateScale = useCallback((gradeScale: GradeScale[]): Record<number, string> => {
    const newErrors: Record<number, string> = {}
    
    gradeScale.forEach((grade, index) => {
      if (grade.min < 0 || grade.min > 100) {
        newErrors[index] = "Minimum percentage must be between 0 and 100"
      } else if (grade.max < 0 || grade.max > 100) {
        newErrors[index] = "Maximum percentage must be between 0 and 100"
      } else if (grade.min > grade.max) {
        newErrors[index] = "Minimum cannot be greater than maximum"
      } else if (index > 0 && grade.max >= gradeScale[index - 1].min) {
        newErrors[index] = "Grade ranges cannot overlap"
      }
    })
    
    return newErrors
  }, [])

  const updateGradeRange = useCallback((index: number, field: "min" | "max", value: number) => {
    // Sanitize input
    const sanitizedValue = Math.max(0, Math.min(100, Math.round(value)))
    
    const newScale = [...scale]
    newScale[index] = { ...newScale[index], [field]: sanitizedValue }

    // Auto-adjust adjacent ranges to prevent overlaps
    if (field === "min" && index < scale.length - 1) {
      const nextGrade = newScale[index + 1]
      if (nextGrade.max >= sanitizedValue) {
        newScale[index + 1] = { ...nextGrade, max: Math.max(0, sanitizedValue - 1) }
      }
    }
    if (field === "max" && index > 0) {
      const prevGrade = newScale[index - 1]
      if (prevGrade.min <= sanitizedValue) {
        newScale[index - 1] = { ...prevGrade, min: Math.min(100, sanitizedValue + 1) }
      }
    }

    setScale(newScale)
    
    // Validate the new scale
    const newErrors = validateScale(newScale)
    setErrors(newErrors)
  }, [scale, validateScale])

  const saveScale = useCallback(() => {
    const validationErrors = validateScale(scale)
    if (Object.keys(validationErrors).length > 0) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before saving",
        variant: "destructive",
      })
      return
    }

    const success = saveToLocalStorage("customGradeScale", scale)
    toast({
      title: success ? "Success" : "Error",
      description: success ? "Custom grading scale saved!" : "Failed to save grading scale",
      variant: success ? "default" : "destructive",
    })
  }, [scale, validateScale])

  const resetToDefault = useCallback(() => {
    setScale(defaultGradeScale)
    setErrors({})
    if (typeof window !== "undefined") {
      localStorage.removeItem("customGradeScale")
    }
    toast({
      title: "Success",
      description: "Reset to default grading scale!",
    })
  }, [])

  const getGradeForPercentage = useCallback((percentage: number): GradeScale | null => {
    return scale.find((grade) => percentage >= grade.min && percentage <= grade.max) || null
  }, [scale])

  const currentGrade = useMemo(() => getGradeForPercentage(testPercentage), [getGradeForPercentage, testPercentage])

  const handleTestPercentageChange = useCallback((value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setTestPercentage(numValue)
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      {/* Hero Section */}
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 bg-clip-text text-transparent mb-4 leading-tight">
            Custom Grading Scale
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
          Create and customize your own grading scale for personalized grade calculations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Scale Configuration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-xl">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                  <Settings className="w-5 h-5" />
                  <span>Grade Scale Configuration</span>
                </CardTitle>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                  <Button 
                    onClick={() => setIsPreviewMode(!isPreviewMode)} 
                    variant="outline" 
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {isPreviewMode ? 'Edit' : 'Preview'}
                  </Button>
                  <Button 
                    onClick={saveScale} 
                    size="sm" 
                    className="bg-gradient-to-r from-blue-500 to-green-500 w-full sm:w-auto"
                    disabled={Object.keys(errors).length > 0}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button 
                    onClick={resetToDefault} 
                    variant="outline" 
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <AnimatePresence>
                  {Object.keys(errors).length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Please fix validation errors before saving
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

              {scale.map((grade, index) => (
                <motion.div
                  key={grade.letter}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 sm:p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 ${
                    errors[index] ? 'border-red-300 dark:border-red-700' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 ${grade.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}
                      >
                        {grade.letter}
                      </div>
                      <span className="font-medium text-sm sm:text-base">Grade {grade.letter}</span>
                    </div>
                    <Badge variant="outline" className="text-xs sm:text-sm">
                      {grade.min}% - {grade.max}%
                    </Badge>
                  </div>

                  {!isPreviewMode && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`min-${index}`} className="text-sm">
                          Minimum %
                        </Label>
                        <Input
                          id={`min-${index}`}
                          type="number"
                          value={grade.min}
                          onChange={(e) => updateGradeRange(index, "min", parseInt(e.target.value) || 0)}
                          min="0"
                          max="100"
                          className="bg-background"
                          aria-label={`Minimum percentage for grade ${grade.letter}`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`max-${index}`} className="text-sm">
                          Maximum %
                        </Label>
                        <Input
                          id={`max-${index}`}
                          type="number"
                          value={grade.max}
                          onChange={(e) => updateGradeRange(index, "max", parseInt(e.target.value) || 100)}
                          min="0"
                          max="100"
                          className="bg-background"
                          aria-label={`Maximum percentage for grade ${grade.letter}`}
                        />
                      </div>
                    </div>
                  )}

                  {errors[index] && (
                    <Alert variant="destructive" className="mt-3">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        {errors[index]}
                      </AlertDescription>
                    </Alert>
                  )}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Test Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Grade Tester */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Test Your Scale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="test-percentage" className="text-sm font-medium">
                    Test Percentage: {testPercentage}%
                  </Label>
                  <Input
                    type="number"
                    value={testPercentage}
                    onChange={(e) => handleTestPercentageChange(e.target.value)}
                    min="0"
                    max="100"
                    className="w-20 text-center"
                    aria-label="Test percentage input"
                  />
                </div>
                <Slider
                  id="test-percentage"
                  value={[testPercentage]}
                  onValueChange={(value) => setTestPercentage(value[0])}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                  aria-label="Test percentage slider"
                />
              </div>

              <AnimatePresence>
                {currentGrade ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`p-4 sm:p-6 ${currentGrade.color} text-white rounded-lg text-center`}
                  >
                    <div className="text-3xl sm:text-4xl font-bold mb-2">{testPercentage}%</div>
                    <div className="text-lg sm:text-xl">Grade: {currentGrade.letter}</div>
                    <div className="text-sm opacity-90 mt-2">
                      Range: {currentGrade.min}% - {currentGrade.max}%
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 sm:p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-bold mb-2 text-gray-600 dark:text-gray-400">
                      {testPercentage}%
                    </div>
                    <div className="text-lg text-gray-500 dark:text-gray-400">No Grade Found</div>
                    <div className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                      This percentage doesn't match any grade range
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Scale Preview */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Scale Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {scale.map((grade, index) => (
                  <motion.div
                    key={grade.letter}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 ${grade.color} rounded-full flex items-center justify-center text-white text-sm font-bold`}
                      >
                        {grade.letter}
                      </div>
                      <span className="font-medium text-sm sm:text-base">Grade {grade.letter}</span>
                    </div>
                    <Badge variant="outline" className="text-xs sm:text-sm">
                      {grade.min}% - {grade.max}%
                    </Badge>
                  </motion.div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500" />
                <span>Scale will be applied to all calculators</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        </div>

        {/* Usage Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 sm:mt-8"
        >
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">How to Use Custom Grading Scale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Setting Up Your Scale</h3>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Adjust the minimum and maximum percentages for each grade</li>
                    <li>• Ensure there are no gaps or overlaps between grades</li>
                    <li>• Use the test slider to preview how percentages map to grades</li>
                    <li>• Click "Save" to apply your custom scale</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Important Notes</h3>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Your custom scale applies to all grade calculators</li>
                    <li>• Data is saved locally in your browser</li>
                    <li>• You can reset to the default scale anytime</li>
                    <li>• Validation errors must be fixed before saving</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
    </div>
  )
}
