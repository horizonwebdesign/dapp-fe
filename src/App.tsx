import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Staking from "@/pages/staking";
import Minting from "@/pages/minting";
import { Layout } from "@/components/layout";
import { WagmiProvider } from "wagmi";
import { config } from "./lib/wagmi";
import { Analytics } from "@vercel/analytics/react";
function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/staking" component={Staking} />
        <Route path="/minting" component={Minting} />
        <Route component={NotFound} />
      </Switch>

      <Analytics />
    </Layout>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
