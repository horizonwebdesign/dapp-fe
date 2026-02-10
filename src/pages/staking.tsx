import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock, Loader2, AlertCircle } from "lucide-react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { parseEther } from "viem";
import { useToast } from "@/hooks/use-toast";
import StakingPoolABI from "@/lib/abis/StakingPool.json";
import StakingTokenABI from "@/lib/abis/StakingToken.json";

const STAKING_TOKEN_ADDRESS = import.meta.env.VITE_STAKING_TOKEN_ADDRESS;
const STAKING_POOL_ADDRESS = import.meta.env.VITE_STAKING_POOL_ADDRESS;

const PLANS = [
  { id: 0, label: "7 Days (1%)", duration: "7 Days", apy: "1%" },
  { id: 1, label: "14 Days (2%)", duration: "14 Days", apy: "2%" },
  { id: 2, label: "30 Days (3%)", duration: "30 Days", apy: "3%" },
  { id: 3, label: "2 Mins (1.2%)", duration: "2 Mins", apy: "1.2%" },
];

export default function Staking() {
  const [amount, setAmount] = useState("");
  const [planIndex, setPlanIndex] = useState("0");
  const { isConnected, address } = useAccount();
  const { toast } = useToast();

  const { writeContractAsync: stakeToken, isPending: isStaking } =
    useWriteContract();
  const { writeContractAsync: approveToken, isPending: isApproving } =
    useWriteContract();

  // Read Allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: STAKING_TOKEN_ADDRESS,
    abi: StakingTokenABI,
    functionName: "allowance",
    args: [address, STAKING_POOL_ADDRESS],
    query: {
      enabled: !!address,
    },
  });

  const handleStake = async () => {
    if (!amount || !isConnected) return;

    try {
      const weiAmount = parseEther(amount);

      // Check allowance first
      if (!allowance || (allowance as bigint) < weiAmount) {
        toast({
          title: "Approving Token...",
          description:
            "Please confirm the approval transaction in your wallet.",
        });

        await approveToken({
          address: STAKING_TOKEN_ADDRESS,
          abi: StakingTokenABI,
          functionName: "approve",
          args: [STAKING_POOL_ADDRESS, weiAmount],
        });

        toast({
          title: "Approval Successful",
          description: "Now proceeding to stake...",
          className: "bg-green-500 text-white border-none",
        });

        // Wait a bit for the RPC to update
        await new Promise((r) => setTimeout(r, 2000));
        await refetchAllowance();
      }

      toast({
        title: "Staking...",
        description: "Please confirm the staking transaction in your wallet.",
      });

      const hash = await stakeToken({
        address: STAKING_POOL_ADDRESS,
        abi: StakingPoolABI,
        functionName: "stake",
        args: [weiAmount, BigInt(planIndex)],
      });

      toast({
        title: "Staking Successful!",
        description: `Successfully staked ${amount} tokens.`,
        className: "bg-primary text-primary-foreground border-none",
      });

      setAmount("");
    } catch (error: any) {
      console.error("Staking error:", error);
      toast({
        title: "Transaction Failed",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className=" px-4 py-12 md:py-20 w-full">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Left Column: Info */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Staking Vault
            </h1>
            <p className="text-muted-foreground text-lg">
              Stake your tokens to earn rewards. Choose a plan that suits your
              timeline.
            </p>
          </div>

          {/* <div className="grid grid-cols-2 gap-4">
            <Card className="glass-panel bg-transparent border-white/10">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-2 font-mono">Staking Pool</div>
                <div className="text-xs font-mono break-all text-primary">{STAKING_POOL_ADDRESS}</div>
              </CardContent>
            </Card>
            <Card className="glass-panel bg-transparent border-white/10">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-2 font-mono">Token</div>
                <div className="text-xs font-mono break-all text-secondary">{STAKING_TOKEN_ADDRESS}</div>
              </CardContent>
            </Card>
          </div> */}

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 relative overflow-hidden">
            {/* <div className="absolute top-0 right-0 p-4 opacity-20">
              <img
                src={coinImg}
                alt="Coin"
                className="w-32 h-32 object-contain animate-pulse"
              />
            </div> */}
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Staking Plans
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className="p-3 rounded-lg bg-black/20 border border-white/5 flex justify-between items-center"
                >
                  <span className="text-sm text-muted-foreground">
                    {plan.duration}
                  </span>
                  <span className="font-bold text-primary">{plan.apy} APR</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interaction Card */}
        <div className="w-full md:w-1/2">
          <Card className="glass-panel border-white/10 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none rounded-xl" />
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Manage Stake</span>
                {isConnected && (
                  <span className="text-xs font-mono bg-green-500/20 text-green-500 px-2 py-1 rounded">
                    Connected
                  </span>
                )}
              </CardTitle>
              <CardDescription>
                Enter amount and select a plan to stake
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="stake" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-black/40 mb-6">
                  <TabsTrigger
                    value="stake"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Stake
                  </TabsTrigger>
                  <TabsTrigger
                    value="unstake"
                    className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
                  >
                    Unstake
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="stake" className="space-y-6">
                  <div className="space-y-2">
                    <Label>Staking Plan</Label>
                    <Select value={planIndex} onValueChange={setPlanIndex}>
                      <SelectTrigger className="bg-black/20 border-white/10 h-12">
                        <SelectValue placeholder="Select a plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {PLANS.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id.toString()}>
                            {plan.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Amount</Label>
                      <span className="text-muted-foreground">
                        Staking Token
                      </span>
                    </div>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="bg-black/20 border-white/10 h-12 text-lg font-mono pl-4 pr-20"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute right-1 top-1 h-10 text-xs font-bold text-primary hover:text-primary hover:bg-primary/10"
                      >
                        MAX
                      </Button>
                    </div>
                  </div>

                  <Button
                    className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_-5px_hsl(var(--primary))]"
                    onClick={handleStake}
                    disabled={
                      isStaking || isApproving || !amount || !isConnected
                    }
                  >
                    {!isConnected ? (
                      <>
                        <AlertCircle className="mr-2 h-4 w-4" /> Connect Wallet
                      </>
                    ) : isApproving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Approving...
                      </>
                    ) : isStaking ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Staking...
                      </>
                    ) : (
                      "Stake Tokens"
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="unstake" className="space-y-6">
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-500 text-sm mb-4">
                    Unstaking requires interacting with your active stakes.
                  </div>
                  <div className="text-center py-8 text-muted-foreground">
                    (Unstaking implementation coming soon)
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
