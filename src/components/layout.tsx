import { Link, useLocation } from "wouter";
import { WalletConnect } from "./wallet-connect";
import { LayoutGrid, Coins, Layers, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: LayoutGrid },
    { href: "/staking", label: "Staking", icon: Layers },
    { href: "/minting", label: "Minting", icon: Coins },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold group-hover:shadow-[0_0_15px_hsl(var(--primary))] transition-all">
                N
              </div>
              <span className="text-xl font-bold font-heading tracking-tight group-hover:text-primary transition-colors">
                Dapp<span className="text-primary">Fi</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                    isActive
                      ? "text-primary drop-shadow-[0_0_5px_hsl(var(--primary)/0.5)]"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <WalletConnect />
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center gap-4">
            <WalletConnect />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] border-l border-white/10 bg-background/95 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-8 mt-8">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-4 text-lg font-medium transition-colors cursor-pointer ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            isActive ? "bg-primary/10" : "bg-white/5"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 relative container mx-auto">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-30 animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] mix-blend-screen opacity-30 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>
        {children}
      </main>

      <footer className="border-t border-white/5 py-8 mt-12 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground font-mono">
          <p>© 2024 DappFi Protocol. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
