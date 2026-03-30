import { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fc_user')) } catch { return null }
  })
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setUser(data)
    localStorage.setItem('fc_user', JSON.stringify(data))
    return data
  }

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload)
    return data
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('fc_user')
  }

  const isApproved = user?.isApproved
  const role = user?.role

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, setLoading, isApproved, role }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
