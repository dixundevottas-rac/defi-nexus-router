import { ethers } from "ethers";

// Router Contract Address (Polygon Mumbai/Amoy)
export const ROUTER_ADDRESS = "0xYourRouterContractAddress"; // Replace with actual address

export const ROUTER_ABI = [
  "function transferTokens(address _receiver, uint256 _amount) external",
  "function stake(uint256 _amount) external",
  "function withdraw(uint256 _amount) external",
  "function getStakedBalance(address _user) external view returns (uint256)",
  "event TokensTransferred(address indexed from, address indexed to, uint256 amount)",
  "event Staked(address indexed user, uint256 amount)",
  "event Withdrawn(address indexed user, uint256 amount)"
];

export const AI_BACKEND_URL = "https://router-ai-backend.onrender.com/checkRisk";

export async function connectWallet(): Promise<string | null> {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    return accounts[0];
  } catch (error) {
    console.error("Wallet connection error:", error);
    return null;
  }
}

export async function getProvider() {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }
  return new ethers.providers.Web3Provider(window.ethereum);
}

export async function getBalance(address: string): Promise<string> {
  const provider = await getProvider();
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
}

export async function checkReceiverRisk(receiverAddress: string): Promise<any> {
  try {
    const response = await fetch(AI_BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: receiverAddress })
    });
    return await response.json();
  } catch (error) {
    console.error("Risk check error:", error);
    return { risk: "unknown", message: "Unable to check risk" };
  }
}

export async function transferPOL(
  receiverAddress: string,
  amount: string
): Promise<string> {
  const provider = await getProvider();
  const signer = provider.getSigner();
  const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer);

  const amountWei = ethers.utils.parseEther(amount);
  const tx = await contract.transferTokens(receiverAddress, amountWei);
  await tx.wait();
  
  return tx.hash;
}

export async function stakePOL(amount: string): Promise<string> {
  const provider = await getProvider();
  const signer = provider.getSigner();
  const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer);

  const amountWei = ethers.utils.parseEther(amount);
  const tx = await contract.stake(amountWei);
  await tx.wait();
  
  return tx.hash;
}

export async function withdrawPOL(amount: string): Promise<string> {
  const provider = await getProvider();
  const signer = provider.getSigner();
  const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer);

  const amountWei = ethers.utils.parseEther(amount);
  const tx = await contract.withdraw(amountWei);
  await tx.wait();
  
  return tx.hash;
}

export async function getStakedBalance(userAddress: string): Promise<string> {
  const provider = await getProvider();
  const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, provider);
  
  const balance = await contract.getStakedBalance(userAddress);
  return ethers.utils.formatEther(balance);
}

// Extend Window type for ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
