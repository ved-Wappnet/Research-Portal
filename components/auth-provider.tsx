"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useLoginMutation } from '@/services/authService'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials, logout as reduxLogout } from '@/lib/features/auth/authSlice'
import type { RootState } from '@/lib/store'

import { RegisterRoleEnum } from '@/data/constant'

export type UserRole = RegisterRoleEnum

export interface User {
  id: string
  _id?: string // for MongoDB compatibility/fallback
  email: string
  name: string
  role: UserRole
  avatar?: string
  institution?: string
  bio?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (data: RegisterData) => Promise<void>
  loading: boolean
}

interface RegisterData {
  email: string
  password: string
  name: string
  role: UserRole
  institution?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [loginApi, { isLoading: loginLoading }] = useLoginMutation()

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      dispatch(setCredentials(JSON.parse(storedUser)))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const result = await loginApi({ email, password }).unwrap()
      if (!result?.user) throw new Error('Invalid response from server')
      // Set random avatar on login
      const randomSeed = `${result.user.email}-${Math.floor(Math.random() * 10000)}`
      const userWithAvatar = {
        ...result.user,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(randomSeed)}`,
      }
      dispatch(setCredentials({ user: userWithAvatar, token: '' }))
      router.push("/dashboard")
    } catch (error: any) {
      throw new Error(error?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const register = async (data: RegisterData) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: data.role,
        institution: data.institution,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
      }

      dispatch(setCredentials({ user: newUser, token: '' }))
      localStorage.setItem("user", JSON.stringify(newUser))
      router.push("/dashboard")
    } catch (error) {
      throw new Error("Registration failed")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    dispatch(reduxLogout())
    router.push("/auth/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, register, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
