import { createContext, useContext, useState } from 'react'
import api from '../utils/api'
const Ctx = createContext()
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('fc_user')) } catch { return null } })
  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setUser(data); localStorage.setItem('fc_user', JSON.stringify(data)); return data
  }
  const register = async (payload) => { const { data } = await api.post('/auth/register', payload); return data }
  const logout = () => { setUser(null); localStorage.removeItem('fc_user') }
  return <Ctx.Provider value={{ user, login, register, logout }}>{children}</Ctx.Provider>
}
export const useAuth = () => useContext(Ctx)
