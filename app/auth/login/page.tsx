"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Wallet, Mail, Lock, Eye, Users, Activity } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { WalletConnect } from "@/components/wallet-connect"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from '../../context/AuthContext';
import { ethers } from "ethers";



export default function LoginPage() {
  const { login, setUser, setToken } = useAuth(); // Add setUser and setToken
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  // const { login } = useAuth();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("https://blockevid3-0-bc.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
      const data = await response.json();
      localStorage.setItem("userID", data.userID);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("isAuthenticated", "true");
      // Redirect based on role
      if (data.role === "admin") {
        router.push("/dashboard/admin");
      } else if (data.role === "police") {
        router.push("/dashboard/police");
      } else {
        router.push("/dashboard/user");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  const handleRoleDetected = (role: string) => {
    localStorage.setItem("isAuthenticated", "true")
    router.push(`/dashboard/${role}`)
  }

  const handleQuickAccess = (role: string) => {
    localStorage.setItem("userRole", role)
    localStorage.setItem("userEmail", `demo-${role}@BlockEvid 3.0.com`)
    localStorage.setItem("isAuthenticated", "true")
    router.push(`/dashboard/${role}`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(walletAddress);
      // Redirect or show success
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Metamask wallet connect login
const handleWalletLogin = async () => {
  
  setError("");
  setIsLoading(true);
  try {
    if (!window.ethereum) {
      setError("Please install MetaMask or another Ethereum-compatible wallet.");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    if (!accounts || accounts.length === 0) {
      setError("No accounts found. Please unlock MetaMask or connect an account.");
      return;
    }
    const wallet = accounts[0];
    setWalletAddress(wallet);
    const signer = await provider.getSigner();
    const message = `Sign this message to authenticate with BlockEvid 3.0: ${Date.now()}`;
    const signature = await signer.signMessage(message);
    const response = await fetch("https://blockevid3-0-bc.onrender.com/api/auth/wallet-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wallet,
        message,
        signature,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Wallet login failed");
    }
    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("walletAddress", wallet);
    localStorage.setItem("isAuthenticated", "true");
    // Update AuthContext state
    setUser(data.user); // Assuming the response includes a user object
    setToken(data.token); // Update token in AuthContext
    if (data.role === "admin") {
      router.push("/dashboard/admin");
    } else if (data.role === "police") {
      router.push("/dashboard/police");
    } else {
      router.push("/dashboard/user");
    }
  } catch (err: any) {
    if (err.code === 4001) {
      setError("User rejected the request in MetaMask.");
    } else if (err.code === -32603) {
      setError("Network error or MetaMask internal issue.");
    } else {
      setError(err.message || "An error occurred during wallet login.");
    }
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:via-black dark:to-gray-900 flex items-center justify-center p-4 transition-all duration-500">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-blue-600 dark:text-green-400 floating-animation" />
            <span className="text-2xl font-bold gradient-text">BlockEvid 3.0</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-300">Sign in to access your secure dashboard</p>
        </div>

        
        <Card className="glass-effect glow-effect card-3d">
          <CardHeader>
            <CardTitle>Login to Your Account</CardTitle>
            <CardDescription>Choose your preferred authentication method</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="wallet">
                  <Wallet className="h-4 w-4 mr-2" />
                  Wallet
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter any email (user@demo.com, officer@demo.com, admin@demo.com)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter any password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full pulse-glow hover:scale-105 transition-transform duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Lock className="h-4 w-4 mr-2 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Sign In with Email
                      </>
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="wallet" className="space-y-4">
                <Button
                  type="button"
                  onClick={handleWalletLogin}
                  className="w-full pulse-glow hover:scale-105 transition-transform duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Wallet className="h-4 w-4 mr-2 animate-spin" />
                      Connecting Wallet...
                    </>
                  ) : (
                    <>
                      <Wallet className="h-4 w-4 mr-2" />
                      Sign In with MetaMask
                    </>
                  )}
                </Button>
                {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-blue-600 hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}