import { Search, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { WalletConnect } from "./wallet-connect";

const navItems = [
  { label: "Staking", href: "/staking" },
  { label: "Minting", href: "/minting" },
  { label: "DeFi", href: "#defi" },
  { label: "Governance", href: "#governance" },
  { label: "Docs", href: "#docs" },
  { label: "Community", href: "#community" },
];
const secondaryNav = ["About Us", "Blog", "Careers", "Roadmap", "Tokenomics"];

const networks = [
  { code: "⟠", name: "Ethereum" },
  { code: "◎", name: "Solana" },
  { code: "🔵", name: "Polygon" },
  { code: "🔴", name: "Arbitrum" },
  { code: "🟣", name: "Base" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="section-container">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="text-2xl font-bold font-heading tracking-tight group-hover:text-primary transition-colors">
                  Dapp<span className="text-primary">Fi</span>
                </span>
                <span className="ml-2 text-xs font-medium text-muted-foreground hidden sm:inline">
                  DECENTRALIZED FINANCE
                </span>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-sm text-muted-foreground hidden md:flex items-center gap-2 hover:text-foreground transition-colors">
                  {selectedNetwork.code} {selectedNetwork.name}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {networks.map((network) => (
                  <DropdownMenuItem
                    key={network.name}
                    onClick={() => setSelectedNetwork(network)}
                    className="cursor-pointer"
                  >
                    {network.code} {network.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-foreground" />
            </button>
            {/* <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 bg-foreground text-background text-sm font-semibold px-5 py-2 rounded-full hover:bg-foreground/90 transition-colors"
            >
              Launch App
            </a> */}
            <div className="hidden md:flex items-center gap-4">
              <WalletConnect />
            </div>{" "}
            <button
              className="xl:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 -mt-1 pb-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link px-3 py-1.5"
            >
              {item.label}
            </a>
          ))}
          <div className="ml-auto hidden xl:flex items-center gap-1">
            {secondaryNav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="xl:hidden bg-background border-t border-border px-4 pb-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block py-3 nav-link border-b border-border"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-3">
            <WalletConnect />
          </div>{" "}
        </nav>
      )}
    </header>
  );
};

export default Header;
