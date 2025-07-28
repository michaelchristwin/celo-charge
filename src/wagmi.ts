import abi from "@/ABI/contract-abi.json";
import { createConfig, http, injected } from "wagmi";
import { celoAlfajores, celo } from "wagmi/chains";

export const config = createConfig({
  chains: [celo, celoAlfajores],
  connectors: [
    injected(), // should be listed first
  ],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
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
