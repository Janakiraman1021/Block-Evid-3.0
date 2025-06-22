"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, LogOut, Shield } from "lucide-react"
import { getUserRole } from "@/lib/wallet"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface WalletConnectProps {
  onRoleDetected?: (role: string) => void
}

export function WalletConnect({ onRoleDetected }: WalletConnectProps) {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const router = useRouter()
  const [userRole, setUserRole] = useState<any>(null)
  const [demoMode, setDemoMode] = useState(true) // Enable demo mode by default

  useEffect(() => {
    if (isConnected && address) {
      const role = getUserRole(address)
      setUserRole(role)
      if (role && onRoleDetected) {
        onRoleDetected(role.role)
      }
    } else {
      setUserRole(null)
    }
  }, [isConnected, address, onRoleDetected])

  const handleConnect = (connector: any) => {
    connect({ connector })
  }

  const handleDisconnect = () => {
    disconnect()
    setUserRole(null)
    router.push("/auth/login")
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "police":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "user":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  if (isConnected && address) {
    return (
      <Card className="w-full max-w-md glass-effect glow-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-orange-500/80" />
            Wallet Connected
          </CardTitle>
          <CardDescription>Your wallet is successfully connected</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Address:</span>
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {address.slice(0, 6)}...{address.slice(-4)}
              </code>
            </div>

            {userRole && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Role:</span>
                  <Badge className={getRoleBadgeColor(userRole.role)}>{userRole.role.toUpperCase()}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Name:</span>
                  <span className="text-sm">{userRole.name}</span>
                </div>
                {userRole.badgeNumber && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Badge:</span>
                    <Badge variant="outline">{userRole.badgeNumber}</Badge>
                  </div>
                )}
                {demoMode && (
                  <div className="flex items-center gap-2 p-2 bg-orange-50/80 dark:bg-orange-900/20 border border-orange-200/80 dark:border-orange-800/50 rounded-lg">
                    <Shield className="h-4 w-4 text-orange-600/80" />
                    <span className="text-sm text-orange-800/80 dark:text-orange-400">
                      Demo Mode: Auto-assigned role based on wallet address
                    </span>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex gap-2">
            {userRole && (
              <Button
                onClick={() => router.push(`/dashboard/${userRole.role}`)}
                className="flex-1 bg-orange-500/80 hover:bg-orange-600/80 text-white"
              >
                <Shield className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Button>
            )}
            <Button onClick={handleDisconnect} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md glass-effect glow-effect">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-orange-500/80" />
          Connect Wallet
        </CardTitle>
        <CardDescription>Connect your Web3 wallet to access BlockEvid 3.0</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {demoMode && (
          <div className="flex items-center gap-2 p-3 bg-green-50/80 dark:bg-green-900/20 border border-green-200/80 dark:border-green-800/50 rounded-lg mb-4">
            <Shield className="h-4 w-4 text-green-600/80" />
            <div className="text-sm text-green-800/80 dark:text-green-400">
              <p className="font-medium">Demo Mode Active</p>
              <p>Any wallet will be auto-assigned a role for testing</p>
            </div>
          </div>
        )}

        {connectors.map((connector) => (
          <Button
            key={connector.uid}
            onClick={() => handleConnect(connector)}
            disabled={isPending}
            variant="outline"
            className="w-full justify-start hover:bg-orange-50/80 dark:hover:bg-orange-900/20 hover:border-orange-200/80"
          >
            <Wallet className="h-4 w-4 mr-2" />
            {connector.name}
            {isPending && " (Connecting...)"}
          </Button>
        ))}

        <div className="text-xs text-gray-500 dark:text-gray-400 mt-4 space-y-1">
          <p>Supported wallets: MetaMask and other injected wallets</p>
          <p className="text-orange-600/80">Demo: Any wallet gets auto-assigned role for testing</p>
        </div>
      </CardContent>
    </Card>
  )
}
