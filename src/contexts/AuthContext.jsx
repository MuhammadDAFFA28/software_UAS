import { createContext, useState, useCallback, useEffect } from 'react'
import { mockUser } from '@/data/mockData'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('payeasy_user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setIsLoading(false)
  }, [])

  const login = useCallback((username, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === 'demo' && password === 'demo123') {
          const userData = { ...mockUser, username }
          localStorage.setItem('payeasy_user', JSON.stringify(userData))
          setUser(userData)
          resolve({ success: true })
        } else {
          resolve({ success: false, message: 'Invalid username or password' })
        }
      }, 1000)
    })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('payeasy_user')
    setUser(null)
  }, [])

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates }
      localStorage.setItem('payeasy_user', JSON.stringify(updated))
      return updated
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}
