import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";

function App() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <Card className="md:w-[450px] sm:w-[350px] w-[300px] h-[400px] bg-white/10 backdrop-blur-lg border-0 text-white">
        <CardHeader className="hidden">
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent className="h-[80%]">
          <div className="space-y-[20px]">
            <Input className="border-muted/10" />
            <Input className="border-muted/10" />
          </div>
        </CardContent>
        <CardFooter>
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <button
                type="button"
                onClick={openConnectModal}
                className="flex gap-2 items-center text-black bg-[#FCFF52] px-4 w-full font-bold justify-center h-[35px] rounded-[6px] mx-auto cursor-pointer hover:opacity-80"
              >
                <span>Connect</span> <Wallet className="h-5 w-5" />
              </button>
            )}
          </ConnectButton.Custom>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
