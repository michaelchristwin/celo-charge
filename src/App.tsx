import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { BackgroundGradient } from "./components/ui/background-gradient";
import { useConnect, useWriteContract } from "wagmi";
import { Send, Zap } from "lucide-react";
//@ts-ignore
import { M3terHead, m3terAlias } from "m3ters";
import { contractConfig } from "./wagmi";
import { parseEther } from "viem";

// Helper function to capitalize each word's first letter
const capitalizeWords = (str: string) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function App() {
  const { connect, connectors } = useConnect();
  const { writeContract } = useWriteContract();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const amount = params.get("amount");
  const [formState, setFormState] = useState({
    amount: amount || "",
    id: id || "",
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

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      writeContract({
        ...contractConfig,
        functionName: "pay",
        args: [BigInt(formState.id), parseEther(formState.amount)],
      });
    },
    [writeContract, formState.amount, formState.id]
  );
  // Sample tariff rate (price per kWh)
  const tariffRate = 0.25; // $0.25 per kWh

  useEffect(() => {
    connect({ connector: connectors[0] });
  }, []);

  const units = useMemo(() => {
    return tariffRate * Number(formState.amount);
  }, [formState.amount]);
  return (
    <div className="w-full h-[calc(100%-76px)] flex justify-center items-center">
      <BackgroundGradient className="md:w-[450px] sm:w-[350px] w-[300px] min-h-[390px] bg-[#171717] rounded-[22px] text-white p-4 flex flex-col justify-center items-center">
        <div className="h-[80%] space-y-4 w-[95%]">
          {formState.id ? (
            <div className="w-full flex flex-col items-center">
              <M3terHead seed={formState.id} size={100} />
              <p className="text-[13px] font-bold text-green-400 gap-2">
                {capitalizeWords(m3terAlias(formState.id))}
              </p>
            </div>
          ) : (
            <Skeleton className="w-[118px] h-[118px] rounded-full mx-auto" />
          )}
          <form className="space-y-[30px]" onSubmit={handleSubmit}>
            <Input
              name="id"
              type="text"
              className="border-[#FCFF52]/30 placeholder:text-[#FCFF52]/30 h-[45px] font-semibold text-lg"
              placeholder="M3TER ID"
              value={formState.id}
              inputMode={`numeric`}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <fieldset className="relative">
              <span className="absolute left-3 top-[35%] transform -translate-y-1/2 text-[#FCFF52] text-lg">
                $
              </span>
              <Input
                name="amount"
                type="text"
                className="border-[#FCFF52]/30 placeholder:text-[#FCFF52]/30 h-[45px] font-semibold pl-7 text-lg"
                placeholder="AMOUNT"
                inputMode={`numeric`}
                value={formState.amount}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <p className="text-xs text-[#FCFF52]/30 mt-1">
                Rate: ${tariffRate}/kWh
              </p>
            </fieldset>
            {formState.amount && (
              <div
                className="transform transition-all duration-500 ease-out animate-in slide-in-from-bottom-4 fade-in"
                style={{
                  animation: "slideInUp 0.5s ease-out forwards",
                }}
              >
                <div className="bg-[#011222] border border-[#FCFF52]/30 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Zap className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      Gets you:
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {units.toFixed(2)}{" "}
                    <span className="text-lg font-normal">kWh</span>
                  </div>
                </div>
              </div>
            )}
            <button
              type="submit"
              className="flex items-center text-black bg-[#FCFF52] px-4 w-full font-bold justify-center h-[35px] rounded-lg mx-auto cursor-pointer hover:opacity-80 gap-2"
            >
              <span>PAY</span> <Send />
            </button>
          </form>
        </div>
      </BackgroundGradient>
      <style>{`
        @keyframes slideInUp {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default App;
