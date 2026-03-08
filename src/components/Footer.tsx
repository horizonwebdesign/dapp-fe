import { Twitter, Github, MessageCircle } from "lucide-react";

const footerColumns = [
  {
    title: "Products",
    links: [
      "Token staking",
      "NFT minting",
      "Liquidity pools",
      "Yield farming",
      "Cross-chain bridge",
      "Governance portal",
      "Analytics dashboard",
    ],
  },
  {
    title: "Resources",
    links: [
      "Documentation",
      "Developer API",
      "Smart contract audits",
      "Tokenomics",
      "Whitepaper",
      "FAQ",
    ],
  },
  {
    title: "Community",
    links: [
      "About DAppFi",
      "Blog",
      "Roadmap",
      "Bug bounty",
      "Partnerships",
      "Careers",
      "Brand kit",
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <span className="text-xl font-bold font-heading tracking-tight group-hover:text-primary transition-colors">
              Dapp<span className="text-primary">Fi</span>
            </span>
            {/* <span className="text-2xl font-extrabold">DAppFi</span> */}
            <span className="ml-2 text-xs text-background/60">
              DECENTRALIZED FINANCE
            </span>
            <p className="mt-4 text-sm text-background/60 leading-relaxed">
              Stake, mint, and earn across multiple chains. A fully
              decentralized protocol for the next generation of digital finance
              and NFT ownership.
            </p>
            {/* <a
              href=""
              className="link-arrow mt-6 border-background/40 text-background/80 hover:bg-background hover:text-foreground text-xs"
            >
              Launch app →
            </a> */}
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="text-background/60 hover:text-background transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-background/60 hover:text-background transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-background/60 hover:text-background transition-colors"
                aria-label="Discord"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col, i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold text-background mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="text-sm text-background/50 hover:text-background transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-background/10">
          <div className="flex flex-wrap gap-4 text-xs text-background/40">
            <a href="#" className="hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Cookie Policy
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Risk Disclaimer
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Security
            </a>
          </div>
          <p className="mt-4 text-xs text-background/30">
            © 2026 DAppFi Protocol. All rights reserved. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
