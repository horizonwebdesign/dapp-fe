import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut, ChevronDown, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { injected } from "wagmi/connectors";

export function WalletConnect() {
  const { address, isConnected, status } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { toast } = useToast();
  const [isSigning, setIsSigning] = useState(false);

  const handleConnect = async () => {
    try {
      connect(
        { connector: injected() },
        {
          onSuccess: async (data) => {
            // User requested "sign then connect" (technically connect then sign)
            // We prompt for signature immediately after connection
            setIsSigning(true);
            try {
              // Determine wallet address from connect data or account hook
              const walletAddress = data?.accounts?.[0] ?? address;
              if (!walletAddress)
                throw new Error("Unable to determine wallet address");

              const nonce = Math.random().toString(36).substring(7);
              const message = `Welcome to DAppFi! \n\nPlease sign this message to verify your ownership of this wallet.\n\nNonce: ${nonce}`;

              // Ask user to sign
              const signature = await signMessageAsync({ message });

              // Call login endpoint (matches provided curl)
              const loginResp = await fetch(
                `${import.meta.env.VITE_BE_URL}/auth/login`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    wallet: walletAddress,
                    nonce: signature,
                  }),
                },
              );

              if (!loginResp.ok) {
                const errText = await loginResp.text();
                throw new Error("Login failed: " + errText);
              }

              const loginJson = await loginResp.json();

              // Store token if returned
              if (loginJson.token) {
                localStorage.setItem("authToken", loginJson.token);
              }

              toast({
                title: "Wallet Connected & Logged In",
                description: "Successfully connected and logged in",
                className: "bg-primary text-primary-foreground border-none",
              });
            } catch (signError: any) {
              // Distinguish user rejection from other errors when possible
              if (
                signError?.code === 4001 ||
                /user rejected/i.test(signError?.message || "")
              ) {
                console.error("Signature rejected", signError);
                toast({
                  title: "Signature Rejected",
                  description:
                    "You connected your wallet but declined to sign.",
                  variant: "destructive",
                });
                // Optional: disconnect if signature is mandatory
                // disconnect();
              } else {
                console.error("Login/Verification error", signError);
                toast({
                  title: "Login Failed",
                  description: signError?.message ?? String(signError),
                  variant: "destructive",
                });
              }
            } finally {
              setIsSigning(false);
            }
          },
          onError: (error) => {
            toast({
              title: "Connection Failed",
              description: error.message,
              variant: "destructive",
            });
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    localStorage.removeItem("authToken");

    toast({
      title: "Disconnected",
      description: "Wallet disconnected",
    });
  };

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary transition-all duration-300"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {address.slice(0, 6)}...{address.slice(-4)}
            <ChevronDown className="w-4 h-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 glass-panel text-foreground border-white/10"
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem
            className="cursor-pointer hover:bg-white/5 focus:bg-white/5"
            onClick={() => navigator.clipboard.writeText(address)}
          >
            Copy Address
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive cursor-pointer hover:bg-white/5 focus:bg-white/5"
            onClick={handleDisconnect}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting || isSigning}
      className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_0_20px_-5px_hsl(var(--primary))]"
    >
      {isConnecting || isSigning ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Wallet className="w-4 h-4 mr-2" />
      )}
      {isSigning
        ? "Signing..."
        : isConnecting
          ? "Connecting..."
          : "Connect Wallet"}
    </Button>
  );
}
