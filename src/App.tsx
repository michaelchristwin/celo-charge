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
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
//@ts-ignore
import { M3terHead, m3terAlias } from "m3ters";

// Helper function to capitalize each word's first letter
const capitalizeWords = (str: string) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function App() {
  const [formState, setFormState] = useState({
    amount: "",
    id: "",
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/[0-9.]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) {
      e.preventDefault();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="md:w-[450px] sm:w-[350px] w-[300px] h-[400px] bg-white/10 backdrop-blur-lg border-0 text-white">
        <CardHeader className="hidden">
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent className="h-[80%] space-y-2">
          {formState.id ? (
            <div className="w-full flex flex-col items-center">
              <M3terHead seed={formState.id} size={100} />
              <p className="text-[13px] font-bold text-green-400 gap-2">
                {capitalizeWords(m3terAlias(formState.id))}
              </p>
            </div>
          ) : (
            <Skeleton className="w-[118px] h-[118px] rounded-lg mx-auto" />
          )}
          <form className="space-y-[20px]">
            <Input
              name="id"
              type="text"
              className="border-muted/10"
              placeholder="M3ter ID"
              value={formState.id}
              inputMode={`numeric`}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <Input
              name="amount"
              type="text"
              className="border-muted/10"
              placeholder="Amount"
              inputMode={`numeric`}
              value={formState.amount}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </form>
        </CardContent>
        <CardFooter>
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <button
                type="button"
                onClick={openConnectModal}
                className="flex gap-2 items-center text-black bg-[#FCFF52] px-4 w-full font-bold justify-center h-[35px] rounded-2xl mx-auto cursor-pointer hover:opacity-80"
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
