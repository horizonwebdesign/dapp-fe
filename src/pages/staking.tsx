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
import { Lock, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PLANS = [
  { id: 0, label: "7 Days (1%)", duration: "7 Days", apy: "1%" },
  { id: 1, label: "14 Days (2%)", duration: "14 Days", apy: "2%" },
  { id: 2, label: "30 Days (3%)", duration: "30 Days", apy: "3%" },
  { id: 3, label: "2 Mins (1.2%)", duration: "2 Mins", apy: "1.2%" },
];

export default function Staking() {
  const [amount, setAmount] = useState("");
  const [planIndex, setPlanIndex] = useState("0");

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
                Stake your tokens to earn rewards. Choose a plan that suits your timeline.
              </p>
            </div>

            <Card className="border-primary/30 bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-5">
                  <Lock className="h-5 w-5 text-primary" />
                  <span className="font-bold text-foreground">Staking Plans</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {PLANS.map((plan) => (
                    <div
                      key={plan.id}
                      className="flex items-center justify-between border border-border rounded-lg px-4 py-3 hover:border-primary/50 transition-colors"
                    >
                      <span className="text-sm text-muted-foreground">{plan.duration}</span>
                      <span className="text-sm font-bold text-primary">{plan.apy} APR</span>
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
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">Manage Stake</CardTitle>
                </div>
                <CardDescription>Enter amount and select a plan to stake</CardDescription>
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
                        <span className="text-xs text-muted-foreground">Staking Token</span>
                      </div>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary hover:text-primary/80 transition-colors">
                          MAX
                        </button>
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Connect Wallet
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
