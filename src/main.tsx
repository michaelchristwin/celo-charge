import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Buffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";
import { useDisconnect, useAccount, WagmiProvider } from "wagmi";
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
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();
  return (
    <div className="w-full h-[100vh]">
      <header className="h-[20px] p-4 flex justify-between items-center">
        <h1 className="font-bold text-[#FCFF52] text-[20px]">RE-CHARGE</h1>
        {isConnected && (
          <div className="flex justify-between items-center h-[20px]">
            <button
              type="button"
              onClick={() => disconnect()}
              className="text-[#FCFF52] font-bold underline cursor-pointer"
            >
              disconnect
            </button>
          </div>
        )}
      </header>
      {children}
      <footer className="h-[40px] bg-white/10 backdrop-blur-lg flex justify-center items-center">
        <p className="text-white font-semibold block">
          BUILT ON THE M3TERING PROTOCOL
        </p>
      </footer>
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
