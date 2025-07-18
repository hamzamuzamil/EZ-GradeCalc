import { z } from "zod"

export interface GradeScale {
  letter: string
  min: number
  max: number
  color: string
  emoji: string
}

export const defaultGradeScale: GradeScale[] = [
  { letter: "A", min: 90, max: 100, color: "grade-a", emoji: "🏆" },
  { letter: "B", min: 80, max: 89, color: "grade-b", emoji: "🎯" },
  { letter: "C", min: 70, max: 79, color: "grade-c", emoji: "📈" },
  { letter: "D", min: 60, max: 69, color: "grade-d", emoji: "⚠️" },
  { letter: "F", min: 0, max: 59, color: "grade-f", emoji: "❌" },
]

// Validation schemas
const GradeScaleSchema = z.object({
  letter: z.string().min(1).max(2),
  min: z.number().min(0).max(100),
  max: z.number().min(0).max(100),
  color: z.string().min(1),
  emoji: z.string().min(1),
})

const GradeScaleArraySchema = z.array(GradeScaleSchema)

// Input validation functions
export function validatePercentage(value: number): boolean {
  return typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 100
}

export function validateQuestionCount(value: number): boolean {
  return typeof value === 'number' && !isNaN(value) && value > 0 && Number.isInteger(value)
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>\"'&]/g, '').trim()
}

export function getGradeScale(): GradeScale[] {
  if (typeof window === "undefined") return defaultGradeScale

  try {
    const saved = localStorage.getItem("customGradeScale")
    if (!saved) return defaultGradeScale
    
    const parsed = JSON.parse(saved)
    const validated = GradeScaleArraySchema.safeParse(parsed)
    
    return validated.success ? validated.data : defaultGradeScale
  } catch (error) {
    console.error("Failed to load grade scale:", error)
    return defaultGradeScale
  }
}

export function getLetterGrade(percentage: number): { grade: string; emoji: string; color: string } {
  // Validate input
  if (!validatePercentage(percentage)) {
    return { grade: "F", emoji: "❌", color: "grade-f" }
  }

  const scale = getGradeScale()
  const gradeInfo = scale.find((grade) => percentage >= grade.min && percentage <= grade.max)

  if (gradeInfo) {
    return {
      grade: gradeInfo.letter,
      emoji: gradeInfo.emoji,
      color: gradeInfo.color,
    }
  }

  return { grade: "F", emoji: "❌", color: "grade-f" }
}

export function saveToLocalStorage<T>(key: string, data: T): boolean {
  if (typeof window === "undefined") return false

  try {
    // Sanitize key
    const sanitizedKey = sanitizeInput(key)
    if (!sanitizedKey) return false

    localStorage.setItem(sanitizedKey, JSON.stringify(data))
    return true
  } catch (error) {
    console.error("Failed to save to localStorage:", error)
    return false
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue

  try {
    const sanitizedKey = sanitizeInput(key)
    if (!sanitizedKey) return defaultValue

    const saved = localStorage.getItem(sanitizedKey)
    return saved ? JSON.parse(saved) : defaultValue
  } catch (error) {
    console.error("Failed to load from localStorage:", error)
    return defaultValue
  }
}

// Calculate grade with error handling
export function calculateGrade(totalQuestions: number, wrongAnswers: number): {
  success: boolean
  data?: {
    totalQuestions: number
    wrongAnswers: number
    correctAnswers: number
    percentage: number
    letterGrade: string
    emoji: string
    color: string
  }
  error?: string
} {
  // Validate inputs
  if (!validateQuestionCount(totalQuestions)) {
    return { success: false, error: "Total questions must be a positive integer" }
  }

  if (!validateQuestionCount(wrongAnswers) && wrongAnswers !== 0) {
    return { success: false, error: "Wrong answers must be a non-negative integer" }
  }

  if (wrongAnswers > totalQuestions) {
    return { success: false, error: "Wrong answers cannot exceed total questions" }
  }

  if (wrongAnswers < 0) {
    return { success: false, error: "Wrong answers cannot be negative" }
  }

  const correctAnswers = totalQuestions - wrongAnswers
  const percentage = (correctAnswers / totalQuestions) * 100
  const { grade, emoji, color } = getLetterGrade(percentage)

  return {
    success: true,
    data: {
      totalQuestions,
      wrongAnswers,
      correctAnswers,
      percentage,
      letterGrade: grade,
      emoji,
      color,
    }
  }
}

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
