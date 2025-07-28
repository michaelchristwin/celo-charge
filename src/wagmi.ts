import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { celo, celoAlfajores } from "wagmi/chains";
import abi from "@/ABI/contract-abi.json";

export const config = getDefaultConfig({
  appName: "Recharge",
  projectId: import.meta.env.VITE_WC_PROJECT_ID,
  chains: [celo, celoAlfajores],
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const contractConfig = {
  address: "0x86925C4C97E6765f76408fb6c61152300dec6426",
  abi,
} as const;
