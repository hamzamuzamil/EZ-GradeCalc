import { useMemo } from "react"
import { calculateGrade } from "@/lib/grade-utils"

export function useChartData(totalQuestions: string, CHART_LIMIT = 200) {
  return useMemo(() => {
    const total = parseInt(totalQuestions) || 0
    if (total <= 0 || total > CHART_LIMIT) return []
    const chart = []
    for (let wrong = 0; wrong <= total; wrong++) {
      const calculation = calculateGrade(total, wrong)
      if (calculation.success) {
        chart.push({
          wrong,
          percentage: calculation.data!.percentage,
          grade: calculation.data!.letterGrade,
        })
      }
    }
    return chart
  }, [totalQuestions, CHART_LIMIT])
} 