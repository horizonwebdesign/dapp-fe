import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Gem, Send } from "lucide-react";
import nftImg from "@/assets/nft-cube.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Minting() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="section-container section-padding">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left - Visual */}
          <Card className="overflow-hidden border-border bg-card">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={nftImg}
                  alt="Token Faucet NFT"
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Gem className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Token Faucet</h2>
                </div>
                <p className="text-sm font-mono text-primary">Mint Testnet Tokens</p>
                <p className="text-sm text-muted-foreground">
                  Use this interface to mint Staking Tokens for testing the protocol. Requires MINTER_ROLE on the contract.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right - Minting Form */}
          <div className="space-y-6">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/30 rounded-full px-3 py-1 mb-4">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Admin Access Required
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Mint Tokens
              </h1>
              <p className="mt-3 text-muted-foreground text-lg">
                Directly mint ERC20 tokens to any address. This function is restricted to authorized minters.
              </p>
            </div>

            <Card className="border-border bg-card">
              <CardContent className="pt-6 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-foreground">Recipient Address</Label>
                  </div>
                  <div className="relative">
                    <Send className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="0x..."
                      className="pl-10"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-foreground">Amount</Label>
                    <span className="text-xs text-muted-foreground">DApp</span>
                  </div>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <Button
                  className="w-full bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30"
                  size="lg"
                  disabled
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  You are not authorized to mint tokens
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
