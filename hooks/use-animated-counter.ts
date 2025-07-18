import { useEffect, useRef } from "react"
import { useState } from "react"

export function useAnimatedCounter(target: number, prefersReducedMotion: boolean) {
  const [value, setValue] = useState(prefersReducedMotion ? target : 0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (prefersReducedMotion) {
      setValue(target)
      return
    }
    setValue(0)
    let current = 0
    const increment = target / 50
    intervalRef.current = setInterval(() => {
      current += increment
      if (current >= target) {
        setValue(target)
        if (intervalRef.current) clearInterval(intervalRef.current)
      } else {
        setValue(current)
      }
    }, 20)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [target, prefersReducedMotion])

  return value
} 