import { ChevronDown, Plus } from "lucide-react";

const links = [
  {
    title: "Explore decentralized finance",
    desc: "Discover how staking, minting, and DeFi protocols are creating new opportunities for passive income and digital ownership – the DAppFi way.",
    icon: null,
  },
  {
    title: "Staking rewards",
    desc: null,
    icon: <ChevronDown className="h-5 w-5" />,
  },
  { title: "NFT minting", desc: null, icon: <Plus className="h-5 w-5" /> },
  {
    title: "DeFi protocols",
    desc: null,
    icon: <ChevronDown className="h-5 w-5" />,
  },
  {
    title: "Governance & voting",
    desc: null,
    icon: <Plus className="h-5 w-5" />,
  },
];

const QuickLinks = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* First item - large */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              {links[0].title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {links[0].desc}
            </p>
          </div>
          {/* Other items */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-0">
            {links.slice(1).map((link, i) => (
              <button
                key={i}
                className="flex items-center justify-between py-5 px-2 border-b border-border text-left hover:bg-muted/50 transition-colors group"
              >
                <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {link.title}
                </span>
                <span className="text-muted-foreground">{link.icon}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
