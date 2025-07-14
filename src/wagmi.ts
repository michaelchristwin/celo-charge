import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { celo, celoAlfajores } from "wagmi/chains";

export const config = getDefaultConfig({
	appName: "My RainbowKit App",
	projectId: "YOUR_PROJECT_ID",
	chains: [celo, celoAlfajores],
});

declare module "wagmi" {
	interface Register {
		config: typeof config;
	}
}
