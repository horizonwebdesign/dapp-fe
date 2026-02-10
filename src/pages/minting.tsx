import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Gem, Loader2, Send } from "lucide-react";
import nftImg from "@assets/generated_images/holographic_3d_cube_nft_artwork.png";
import { useToast } from "@/hooks/use-toast";
import { useWriteContract, useAccount } from "wagmi";
import { parseEther } from "viem";
import StakingTokenABI from "@/lib/abis/StakingToken.json";

const STAKING_TOKEN_ADDRESS = import.meta.env.VITE_STAKING_TOKEN_ADDRESS;
const STAKING_ADMIN_ADDRESS = import.meta.env.VITE_ADMIN_ADDRESS;

// Add mint function to ABI if not present in the full JSON file
// We are using a partial ABI here for the specific function call to ensure it works even if the file is incomplete
const MINT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default function Minting() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const { address, isConnected } = useAccount();
  const { toast } = useToast();

  const { writeContractAsync: mintToken, isPending: isMinting } =
    useWriteContract();

  const handleMint = async () => {
    if (!amount || !recipient || !isConnected) return;

    try {
      const hash = await mintToken({
        address: STAKING_TOKEN_ADDRESS,
        abi: MINT_ABI,
        functionName: "mint",
        args: [recipient, parseEther(amount)],
      });

      toast({
        title: "Mint Successful!",
        description: `Successfully minted ${amount} tokens to ${recipient.slice(
          0,
          6
        )}...${recipient.slice(-4)}.`,
        className: "bg-secondary text-white border-none",
      });

      setAmount("");
    } catch (error: any) {
      console.error("Minting error:", error);
      toast({
        title: "Mint Failed",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  // Auto-fill recipient with connected address if empty
  const handleAutoFill = () => {
    if (address) setRecipient(address);
  };
  console.log(address, STAKING_ADMIN_ADDRESS);

  return (
    <div className=" px-4 py-12 md:py-20 flex items-center justify-center min-h-[80vh]">
      <div className="grid md:grid-cols-2 gap-12 w-full items-center">
        {/* Visual - Left Side */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-3xl blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
          <Card className="glass-panel border-white/10 overflow-hidden relative z-10 aspect-square">
            <CardContent className="p-0 h-full flex flex-col justify-end relative">
              <img
                src={nftImg}
                alt="Token Mint"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="relative p-8 z-10">
                <h3 className="text-3xl font-bold font-heading mb-2">
                  Token Faucet
                </h3>
                <p className="text-primary font-mono">Mint Testnet Tokens</p>
                <p className="text-muted-foreground mt-4 text-sm">
                  Use this interface to mint Staking Tokens for testing the
                  protocol. Requires MINTER_ROLE on the contract.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Minting Interface - Right Side */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-bold mb-4 border border-secondary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              Admin Access Required
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">
              Mint Tokens
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Directly mint ERC20 tokens to any address. This function is
              restricted to authorized minters.
            </p>
          </div>

          <div className="space-y-6 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="recipient">Recipient Address</Label>
                {isConnected && !recipient && (
                  <button
                    onClick={handleAutoFill}
                    className="text-xs text-primary hover:underline"
                  >
                    Use my address
                  </button>
                )}
              </div>
              <div className="relative">
                <Input
                  id="recipient"
                  placeholder="0x..."
                  className="bg-black/20 border-white/10 h-12 font-mono pl-10"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
                <Send className="w-4 h-4 absolute left-3 top-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="bg-black/20 border-white/10 h-12 text-lg font-mono pl-4 pr-16"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="absolute right-4 top-3 text-muted-foreground font-bold text-sm">
                  DApp
                </div>
              </div>
            </div>

            <Button
              className="w-full h-14 text-xl font-bold bg-secondary hover:bg-secondary/90 text-white shadow-[0_0_30px_-5px_hsl(var(--secondary)/0.5)] transition-all duration-300 hover:scale-[1.02] mt-4"
              onClick={handleMint}
              disabled={
                isMinting ||
                !amount ||
                !recipient ||
                address !== STAKING_ADMIN_ADDRESS
              }
            >
              {isMinting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Minting...
                </div>
              ) : address !== STAKING_ADMIN_ADDRESS ? (
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  You are not authorized to mint tokens
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Gem className="w-5 h-5" />
                  Mint Tokens
                </div>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Ensure you have the correct permissions before interacting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
