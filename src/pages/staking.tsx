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
import {
  useAccount,
  useConnect,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { formatEther, parseEther } from "viem";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StakingPoolABI from "@/lib/abis/StakingPool.json";
import StakingTokenABI from "@/lib/abis/StakingToken.json";

const STAKING_TOKEN_ADDRESS = import.meta.env.VITE_STAKING_TOKEN_ADDRESS as
  | `0x${string}`
  | undefined;
const STAKING_POOL_ADDRESS = import.meta.env.VITE_STAKING_POOL_ADDRESS as
  | `0x${string}`
  | undefined;

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
  const { connect, isPending: isConnecting } = useConnect();
  const { toast } = useToast();

  const { writeContractAsync: stakeToken, isPending: isStaking } =
    useWriteContract();
  const { writeContractAsync: approveToken, isPending: isApproving } =
    useWriteContract();

  const contractsConfigured = !!(STAKING_TOKEN_ADDRESS && STAKING_POOL_ADDRESS);

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: STAKING_TOKEN_ADDRESS,
    abi: StakingTokenABI,
    functionName: "allowance",
    args:
      address && STAKING_POOL_ADDRESS
        ? [address, STAKING_POOL_ADDRESS]
        : undefined,
    query: {
      enabled: !!address && contractsConfigured,
    },
  });

  const { data: tokenBalance } = useReadContract({
    address: STAKING_TOKEN_ADDRESS,
    abi: StakingTokenABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && contractsConfigured,
    },
  });

  const handleStake = async () => {
    if (!amount || !isConnected || !contractsConfigured) return;

    let weiAmount: bigint;
    try {
      weiAmount = parseEther(amount);
    } catch {
      toast({
        title: "Invalid amount",
        description: "Enter a valid token amount.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!allowance || (allowance as bigint) < weiAmount) {
        toast({
          title: "Approving Token...",
          description:
            "Please confirm the approval transaction in your wallet.",
        });

        await approveToken({
          address: STAKING_TOKEN_ADDRESS!,
          abi: StakingTokenABI,
          functionName: "approve",
          args: [STAKING_POOL_ADDRESS!, weiAmount],
        });

        toast({
          title: "Approval Successful",
          description: "Now proceeding to stake...",
          className: "bg-green-500 text-white border-none",
        });

        await new Promise((r) => setTimeout(r, 2000));
        await refetchAllowance();
      }

      toast({
        title: "Staking...",
        description: "Please confirm the staking transaction in your wallet.",
      });

      await stakeToken({
        address: STAKING_POOL_ADDRESS!,
        abi: StakingPoolABI,
        functionName: "stake",
        args: [weiAmount, BigInt(planIndex)],
      });

      toast({
        title: "Staking Successful!",
        description: `Successfully staked ${amount} tokens.`,
      });

      setAmount("");
    } catch (error: unknown) {
      console.error("Staking error:", error);
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      toast({
        title: "Transaction Failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handlePrimaryClick = async () => {
    if (!isConnected) {
      connect({ connector: injected() });
      return;
    }
    if (!contractsConfigured) {
      toast({
        title: "Configuration missing",
        description:
          "Set VITE_STAKING_TOKEN_ADDRESS and VITE_STAKING_POOL_ADDRESS in your environment.",
        variant: "destructive",
      });
      return;
    }
    await handleStake();
  };

  const setMaxAmount = () => {
    if (tokenBalance === undefined || tokenBalance === null) return;
    setAmount(formatEther(tokenBalance as bigint));
  };

  const primaryDisabled =
    isConnecting ||
    isStaking ||
    isApproving ||
    (isConnected && contractsConfigured && !amount);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="section-container section-padding">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Staking Vault
              </h1>
              <p className="mt-3 text-muted-foreground text-lg">
                Stake your tokens to earn rewards. Choose a plan that suits your
                timeline.
              </p>
            </div>

            <Card className="border-primary/30 bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-5">
                  <Lock className="h-5 w-5 text-primary" />
                  <span className="font-bold text-foreground">
                    Staking Plans
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {PLANS.map((plan) => (
                    <div
                      key={plan.id}
                      className="flex items-center justify-between border border-border rounded-lg px-4 py-3 hover:border-primary/50 transition-colors"
                    >
                      <span className="text-sm text-muted-foreground">
                        {plan.duration}
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {plan.apy} APR
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div>
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-foreground">
                    Manage Stake
                  </CardTitle>
                  {isConnected && (
                    <span className="text-xs font-mono shrink-0 rounded bg-green-500/15 text-green-600 dark:text-green-400 px-2 py-1">
                      Connected
                    </span>
                  )}
                </div>
                <CardDescription>
                  Enter amount and select a plan to stake
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="stake">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="stake">Stake</TabsTrigger>
                    <TabsTrigger value="unstake">Unstake</TabsTrigger>
                  </TabsList>

                  <TabsContent value="stake" className="space-y-5">
                    <div className="space-y-2">
                      <Label className="text-foreground">Staking Plan</Label>
                      <Select value={planIndex} onValueChange={setPlanIndex}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PLANS.map((plan) => (
                            <SelectItem key={plan.id} value={String(plan.id)}>
                              {plan.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-foreground">Amount</Label>
                        <span className="text-xs text-muted-foreground">
                          Staking Token
                        </span>
                      </div>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={setMaxAmount}
                          disabled={!isConnected || tokenBalance === undefined}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary hover:text-primary/80 transition-colors disabled:pointer-events-none disabled:opacity-40"
                        >
                          MAX
                        </button>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handlePrimaryClick}
                      disabled={primaryDisabled}
                    >
                      {!isConnected ? (
                        <>
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Connect Wallet
                        </>
                      ) : isConnecting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Connecting...
                        </>
                      ) : isApproving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Approving...
                        </>
                      ) : isStaking ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Staking...
                        </>
                      ) : (
                        "Stake Tokens"
                      )}
                    </Button>
                  </TabsContent>

                  <TabsContent value="unstake" className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Unstaking requires interacting with your active stakes.
                    </p>
                    <p className="text-xs text-muted-foreground italic">
                      (Unstaking implementation coming soon)
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
