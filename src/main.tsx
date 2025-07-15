import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Buffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";

import App from "./App.tsx";
import { config } from "./wagmi.ts";
import "@rainbow-me/rainbowkit/styles.css";
import "@/styles.css";
import {
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-[100vh] p-4">
      <header className="h-[20px]">
        <h1 className="font-bold text-[#FCFF52] text-2xl">Celo Mini app</h1>
      </header>
      {children}
      <footer className="h-[20px]"></footer>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={{ lightMode: lightTheme(), darkMode: darkTheme() }}
        >
          <Layout>
            <App />
          </Layout>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
