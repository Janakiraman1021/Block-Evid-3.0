"use client"

import type React from "react"

import { useAccount } from "wagmi"
import { getUserRole, hasPermission } from "@/lib/wallet"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, Lock } from "lucide-react"
import Link from "next/link"

interface RBACGuardProps {
  children: React.ReactNode
  requiredRole?: "user" | "police" | "admin"
  requiredPermission?: string
  fallback?: React.ReactNode
}

export function RBACGuard({ children, requiredRole, requiredPermission, fallback }: RBACGuardProps) {
  const { address, isConnected } = useAccount()
  const [userRole, setUserRole] = useState<any>(null)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    if (isConnected && address) {
      const role = getUserRole(address)
      setUserRole(role)

      if (role) {
        let access = true

        if (requiredRole && role.role !== requiredRole) {
          access = false
        }

        if (requiredPermission && !hasPermission(role.role, requiredPermission)) {
          access = false
        }

        setHasAccess(access)
      } else {
        setHasAccess(false)
      }
    } else {
      setUserRole(null)
      setHasAccess(false)
    }
  }, [isConnected, address, requiredRole, requiredPermission])

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-red-600" />
              Authentication Required
            </CardTitle>
            <CardDescription>Please connect your wallet to access this page</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/auth/login">
              <Button className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Go to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Unauthorized Wallet
            </CardTitle>
            <CardDescription>Your wallet address is not authorized to access BlockEvid 3.0</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">
              <p>Wallet Address:</p>
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">{address}</code>
            </div>
            <p className="text-sm text-gray-600">
              Please contact an administrator to get your wallet authorized for system access.
            </p>
            <Link href="/auth/login">
              <Button variant="outline" className="w-full">
                Back to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-red-600" />
              Access Denied
            </CardTitle>
            <CardDescription>You don't have permission to access this resource</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">
              <p>
                Your Role: <span className="font-medium capitalize">{userRole.role}</span>
              </p>
              {requiredRole && (
                <p>
                  Required Role: <span className="font-medium capitalize">{requiredRole}</span>
                </p>
              )}
              {requiredPermission && (
                <p>
                  Required Permission: <span className="font-medium">{requiredPermission}</span>
                </p>
              )}
            </div>
            <Link href={`/dashboard/${userRole.role}`}>
              <Button className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Go to Your Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
