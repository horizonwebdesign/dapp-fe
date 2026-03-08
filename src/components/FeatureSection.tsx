import { ArrowRight } from "lucide-react";
import aiOffice from "@/assets/ai-office.jpg";
import sustainableBuilding from "@/assets/sustainable-building.jpg";
import industryInsights from "@/assets/industry-insights.jpg";

const FeatureSection = () => {
  return (
    <>
      {/* Staking Section */}
      <section className="section-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden rounded-lg">
            <img
              src={aiOffice}
              alt="Staking dashboard"
              className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Staking
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Earn passive <span className="italic text-primary">rewards</span>{" "}
              by staking your tokens
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Lock your tokens in our secure staking pools and earn competitive
              APY. Our protocol ensures maximum security with audited smart
              contracts and transparent reward distribution.
            </p>
            <a href="/staking" className="link-arrow-primary mt-6">
              Start staking <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Minting Section */}
      <section className="bg-secondary">
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                NFT Minting
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Mint unique digital{" "}
                <span className="italic text-primary">assets</span> on-chain
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Create, mint, and trade NFTs with low gas fees and
                lightning-fast transactions. Our minting engine supports ERC-721
                and ERC-1155 standards across multiple chains.
              </p>
              <a href="/minting" className="link-arrow-primary mt-6">
                Explore minting <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="order-1 md:order-2 overflow-hidden rounded-lg">
              <img
                src={sustainableBuilding}
                alt="NFT minting interface"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DeFi Section */}
      <section className="section-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden rounded-lg">
            <img
              src={industryInsights}
              alt="DeFi analytics dashboard"
              className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              DeFi Protocols
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Maximize <span className="italic text-primary">yields</span>{" "}
              across decentralized protocols
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From liquidity pools to yield farming, access the best DeFi
              opportunities with real-time analytics, automated compounding, and
              portfolio tracking tools.
            </p>
            <a href="#" className="link-arrow-primary mt-6">
              Explore DeFi protocols <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureSection;
