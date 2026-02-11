"use client"

import { useEffect, useRef, useCallback, useState } from "react"

interface UseShakeOptions {
  threshold?: number
  timeout?: number
  onShake: () => void
  enabled?: boolean
}

export function useShake({ threshold = 15, timeout = 1000, onShake, enabled = true }: UseShakeOptions) {
  const lastAcceleration = useRef({ x: 0, y: 0, z: 0 })
  const lastShakeTime = useRef(0)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [needsPermission, setNeedsPermission] = useState(false)

  const handleMotion = useCallback(
    (event: DeviceMotionEvent) => {
      if (!enabled) return

      const acceleration = event.accelerationIncludingGravity
      if (!acceleration) return

      const { x = 0, y = 0, z = 0 } = acceleration
      const deltaX = Math.abs(x - lastAcceleration.current.x)
      const deltaY = Math.abs(y - lastAcceleration.current.y)
      const deltaZ = Math.abs(z - lastAcceleration.current.z)

      lastAcceleration.current = { x: x || 0, y: y || 0, z: z || 0 }

      if ((deltaX > threshold || deltaY > threshold || deltaZ > threshold)) {
        const now = Date.now()
        if (now - lastShakeTime.current > timeout) {
          lastShakeTime.current = now
          onShake()
        }
      }
    },
    [threshold, timeout, onShake, enabled]
  )

  const requestPermission = useCallback(async () => {
    if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
      try {
        const permission = await (DeviceMotionEvent as any).requestPermission()
        if (permission === "granted") {
          setPermissionGranted(true)
          setNeedsPermission(false)
        }
      } catch {
        console.log("[v0] Permission denied for DeviceMotion")
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
      setNeedsPermission(true)
    } else {
      setPermissionGranted(true)
    }
  }, [])

  useEffect(() => {
    if (!permissionGranted || typeof window === "undefined") return

    window.addEventListener("devicemotion", handleMotion)
    return () => {
      window.removeEventListener("devicemotion", handleMotion)
    }
  }, [permissionGranted, handleMotion])

  return { requestPermission, needsPermission, permissionGranted }
}
