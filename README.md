



# 🚨 BlockEvid 3.0 — Decentralized Evidence Management System

**BlockEvid 3.0** is a next-generation decentralized complaint and evidence handling platform built on Ethereum (Sepolia Testnet), with IPFS integration and role-based access control. It ensures secure, immutable, and transparent handling of complaints, evidence, and FIRs through smart contracts and decentralized storage.

> "Redefining justice infrastructure with Web3."

---

## 🔗 Live Demo

> 🌐 [blockevid.vercel.app](https://blockevid.vercel.app) — *(Link only if deployed)*

---

## 📌 Core Features

- 🔐 **Role-based Access Control** (User, Officer, Admin)
- 📝 **Complaint Registration** with status updates
- 🧾 **FIR Uploads** by authorized personnel
- 🧬 **Evidence Upload** to IPFS for transparency & immutability
- 🧑‍⚖️ **Admin Panel** to oversee and manage case flow
- 🌐 **WalletConnect** authentication (MetaMask compatible)
- 📱 **Fully Mobile-Responsive** and Web3-enabled UI
- ⚙️ **Smart Contract-Powered** on Sepolia Testnet

---

## 🧱 System Architecture

```plaintext
Frontend: React + Next.js + Tailwind CSS + Shadcn/UI
Backend: Node.js + Express + Ethers.js + IPFS API (Pinata or Web3.Storage)
Blockchain: Solidity Smart Contracts on Ethereum Sepolia Testnet
Storage: IPFS for FIRs & Evidence | MongoDB for metadata
Wallet: MetaMask / WalletConnect
````

---

## 🗂️ Project Modules

### 👥 Authentication

* Web3 login via MetaMask or WalletConnect
* Wallet address is the identity

### 🧑 User Dashboard

* Register a complaint
* View complaint status & FIR
* Check uploaded evidence (if available)

### 👮 Officer Dashboard

* View assigned complaints
* Upload FIR (PDF)
* Upload evidence files (images/videos/audio)

### 🛡️ Admin Panel

* View all complaints
* Assign levels or officers
* Manage system roles

### 📂 IPFS Integration

* All FIRs and evidence are stored on IPFS
* Only hashes are stored on-chain for verification

---

## 🔐 Access Roles

| Role      | Permissions                  |
| --------- | ---------------------------- |
| `user`    | Register/view own complaints |
| `officer` | Upload FIR & Evidence        |
| `admin`   | Full access to all modules   |

---

## ⚙️ Tech Stack

| Layer          | Tech                                   |
| -------------- | -------------------------------------- |
| Frontend       | React, Next.js, TailwindCSS, Shadcn/UI |
| Wallet         | MetaMask, WalletConnect                |
| Backend        | Node.js, Express.js, Ethers.js         |
| Smart Contract | Solidity (Ethereum Sepolia)            |
| Storage        | IPFS (via Pinata/Web3.Storage)         |
| Database       | MongoDB + Mongoose                     |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/blockevid3.0.git
cd blockevid3.0
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create `.env` file in root:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourSmartContractAddress
NEXT_PUBLIC_PINATA_API_KEY=your_key
NEXT_PUBLIC_PINATA_SECRET_API_KEY=your_secret
MONGODB_URI=your_mongodb_url
```

### 4. Deploy Smart Contracts

```bash
cd smart-contract
npx hardhat deploy --network sepolia
```

### 5. Run the Development Server

```bash
npm run dev
```

---

## 💡 Smart Contract Overview

### 🧾 Contract: `BlockEvid.sol`

* `registerComplaint(string memory desc)`
* `uploadFIR(uint complaintId, string memory ipfsHash)`
* `uploadEvidence(uint complaintId, string memory ipfsHash)`
* `setComplaintLevel(uint complaintId, uint8 level)`
* `getComplaint(uint id) returns (details...)`

---

## 📸 Screenshots

> Include these if available:

* User dashboard
* Officer FIR/evidence upload
* IPFS hash viewer
* Admin complaint listing
* Mobile responsive UI preview

---

## 📅 Roadmap

* [x] Role-based complaint registration
* [x] IPFS upload for FIR & evidence
* [x] MetaMask-based auth
* [x] Mobile responsive design
* [ ] Notification system via email/socket
* [ ] AI-powered evidence classifier (future phase)
* [ ] zk-SNARKs for privacy-preserving complaints (future phase)

---



## 🧠 Built With ❤️ By

**Janakiraman K**
` Blockchain Architect | Fullstack Web3 Dev | AI Innovator`


---

## 📜 License

MIT License © 2025 BlockEvid Team

