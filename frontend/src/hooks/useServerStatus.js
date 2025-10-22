import { useState, useEffect } from 'react'
import api from '../api'

export function useServerStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const checkConnection = async () => {
    try {
      setIsLoading(true)
      await api.get('/health', { timeout: 5000 })
      setIsOnline(true)
    } catch (error) {
      setIsOnline(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Check connection on mount
    checkConnection()

    // Set up periodic checks
    const interval = setInterval(checkConnection, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return { isOnline, isLoading, checkConnection }
}