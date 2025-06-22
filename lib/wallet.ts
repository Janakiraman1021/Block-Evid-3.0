"use client"

import { createConfig, http } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { injected } from "wagmi/connectors"

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

export interface UserRole {
  address: string
  role: "user" | "police" | "admin"
  name?: string
  email?: string
  badgeNumber?: string
}

// Mock role database - in real app, this would be from backend
export const mockRoles: Record<string, UserRole> = {
  // Original test addresses
  "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c": {
    address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c",
    role: "user",
    name: "John Doe",
    email: "john@example.com",
  },
  "0x8ba1f109551bD432803012645Hac136c9c3": {
    address: "0x8ba1f109551bD432803012645Hac136c9c3",
    role: "police",
    name: "Officer Smith",
    email: "smith@police.gov",
    badgeNumber: "BADGE-1234",
  },
  "0x1234567890123456789012345678901234567890": {
    address: "0x1234567890123456789012345678901234567890",
    role: "admin",
    name: "Admin Wilson",
    email: "admin@BlockEvid 3.0.com",
  },
  // Common MetaMask test addresses
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266": {
    address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    role: "user",
    name: "Test User",
    email: "testuser@example.com",
  },
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8": {
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    role: "police",
    name: "Test Officer",
    email: "testofficer@police.gov",
    badgeNumber: "TEST-001",
  },
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC": {
    address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    role: "admin",
    name: "Test Admin",
    email: "testadmin@BlockEvid 3.0.com",
  },
}

export const getUserRole = (address: string): UserRole | null => {
  // First check if address exists in mockRoles
  if (mockRoles[address]) {
    return mockRoles[address]
  }

  // For demo purposes, auto-assign roles based on address patterns
  // This allows any wallet to connect for testing
  const lowerAddress = address.toLowerCase()

  // Auto-assign admin role if address contains certain patterns
  if (lowerAddress.includes("fff") || lowerAddress.includes("aaa") || lowerAddress.endsWith("0")) {
    return {
      address,
      role: "admin",
      name: "Demo Admin",
      email: "demo.admin@BlockEvid 3.0.com",
    }
  }

  // Auto-assign police role if address contains certain patterns
  if (lowerAddress.includes("bbb") || lowerAddress.includes("ccc") || lowerAddress.endsWith("1")) {
    return {
      address,
      role: "police",
      name: "Demo Officer",
      email: "demo.officer@police.gov",
      badgeNumber: "DEMO-001",
    }
  }

  // Default to user role for any other wallet (for demo purposes)
  return {
    address,
    role: "user",
    name: "Demo User",
    email: "demo.user@example.com",
  }
}

export const hasPermission = (userRole: string, action: string): boolean => {
  const permissions = {
    user: [
      "view_own_complaints",
      "register_complaint",
      "view_own_evidence",
      "view_blockchain_hashes",
      "connect_wallet",
    ],
    police: [
      "view_all_complaints",
      "upload_evidence",
      "view_evidence",
      "upload_fir",
      "set_complaint_level",
      "update_complaint_status",
      "view_blockchain_hashes",
      "connect_wallet",
    ],
    admin: [
      "view_own_complaints",
      "view_all_complaints",
      "view_evidence",
      "update_complaint_status",
      "promote_users",
      "view_audit_logs",
      "view_blockchain_hashes",
      "access_admin_panel",
      "manage_roles",
      "flag_complaints",
      "connect_wallet",
    ],
  }

  return permissions[userRole as keyof typeof permissions]?.includes(action) || false
}
