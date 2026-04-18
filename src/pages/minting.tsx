import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Gem, Loader2, Send, Wallet } from "lucide-react";
import nftImg from "@/assets/nft-cube.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useAccount, useConnect, useWriteContract } from "wagmi";
import { injected } from "wagmi/connectors";
import { isAddress, parseEther } from "viem";

const STAKING_TOKEN_ADDRESS = import.meta.env.VITE_STAKING_TOKEN_ADDRESS as
  | `0x${string}`
  | undefined;
const ADMIN_ADDRESS = import.meta.env.VITE_ADMIN_ADDRESS?.toLowerCase() as
  | string
  | undefined;

const MINT_ABI = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default function Minting() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const { address, isConnected } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { toast } = useToast();

  const { writeContractAsync: mintToken, isPending: isMinting } =
    useWriteContract();

  const isAdmin =
    !!address && !!ADMIN_ADDRESS && address.toLowerCase() === ADMIN_ADDRESS;

  const recipientValid =
    recipient.trim() !== "" && isAddress(recipient as `0x${string}`);

  const handleMint = async () => {
    if (!amount || !recipient || !isConnected || !isAdmin) return;
    if (!STAKING_TOKEN_ADDRESS) {
      toast({
        title: "Configuration missing",
        description: "Set VITE_STAKING_TOKEN_ADDRESS in your environment.",
      });
      return;
    }
    if (!recipientValid) {
      toast({
        title: "Invalid recipient",
        description: "Enter a valid Ethereum address (0x…).",
      });
      return;
    }

    let value: bigint;
    try {
      value = parseEther(amount);
    } catch {
      toast({
        title: "Invalid amount",
        description: "Enter a valid token amount.",
        variant: "destructive",
      });
      return;
    }

    try {
      await mintToken({
        address: STAKING_TOKEN_ADDRESS,
        abi: MINT_ABI,
        functionName: "mint",
        args: [recipient as `0x${string}`, value],
      });

      toast({
        title: "Mint Successful!",
        description: `Successfully minted ${amount} tokens to ${recipient.slice(
          0,
          6,
        )}…${recipient.slice(-4)}.`,
      });

      setAmount("");
    } catch (error: unknown) {
      console.error("Minting error:", error);
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      toast({
        title: "Mint Failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleAutoFill = () => {
    if (address) setRecipient(address);
  };

  const handlePrimaryClick = async () => {
    if (!isConnected) {
      connect({ connector: injected() });
      return;
    }
    await handleMint();
  };

  const primaryDisabled =
    isConnecting ||
    isMinting ||
    (isConnected && (!isAdmin || !amount || !recipient || !recipientValid));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="section-container section-padding">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left - Visual */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-3xl blur-[50px] opacity-20 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none" />
            <Card className="overflow-hidden bg-card glass-panel border-white/10 relative z-10">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={nftImg}
                    alt="Token Faucet"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 space-y-2">
                    <div className="flex items-center gap-2">
                      <Gem className="h-5 w-5 text-primary" />
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        Token Faucet
                      </h2>
                    </div>
                    <p className="text-sm font-mono text-primary">
                      Mint Testnet Tokens
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Use this interface to mint Staking Tokens for testing the
                      protocol. Requires MINTER_ROLE on the contract.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Minting Form */}
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-secondary bg-secondary/10 border border-secondary/20 rounded-full px-3 py-1 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
                </span>
                Admin Access Required
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Mint Tokens
              </h1>
              <p className="mt-3 text-muted-foreground text-lg leading-relaxed">
                Directly mint ERC20 tokens to any address. This function is
                restricted to authorized minters.
              </p>
            </div>

            <Card className="bg-card glass-panel border-white/10 shadow-xl">
              <CardContent className="pt-6 space-y-5 md:space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label className="text-foreground" htmlFor="recipient">
                      Recipient Address
                    </Label>
                    {isConnected && !recipient && (
                      <button
                        type="button"
                        onClick={handleAutoFill}
                        className="text-xs text-primary hover:underline shrink-0"
                      >
                        Use my address
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Send className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="recipient"
                      placeholder="0x..."
                      className="pl-10 font-mono"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground" htmlFor="amount">
                    Amount
                  </Label>
                  <div className="relative">
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      className="pr-16 text-lg font-mono"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-sm pointer-events-none">
                      DApp
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full h-12 md:h-14 text-lg font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg transition-all duration-300"
                  size="lg"
                  onClick={handlePrimaryClick}
                  disabled={primaryDisabled}
                >
                  {!isConnected ? (
                    <span className="flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      Connect Wallet
                    </span>
                  ) : isConnecting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Connecting…
                    </span>
                  ) : isMinting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Minting…
                    </span>
                  ) : !isAdmin ? (
                    <span className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      You are not authorized to mint tokens
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Gem className="h-5 w-5" />
                      Mint Tokens
                    </span>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Ensure you have the correct permissions before interacting.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
