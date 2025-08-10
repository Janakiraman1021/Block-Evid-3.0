"use client"

import * as React from "react"

type User = any

type AuthContextType = {
  user: User | null
  token: string | null
  setUser: (u: User | null) => void
  setToken: (t: string | null) => void
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [token, setToken] = React.useState<string | null>(null)

  const value = React.useMemo(
    () => ({
      user,
      token,
      setUser,
      setToken,
    }),
    [user, token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
