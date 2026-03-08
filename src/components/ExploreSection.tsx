import { useState, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import workers from "@/assets/workers.jpg";
import exploreMeeting from "@/assets/explore-meeting.jpg";
import exploreGreen from "@/assets/explore-green.jpg";
import exploreTech from "@/assets/explore-tech.jpg";
import exploreLobby from "@/assets/explore-lobby.jpg";

const exploreData = [
  {
    tag: "Announcement",
    title: "DAppFi launches cross-chain staking with 12% APY on launch pools",
    desc: "Stake across Ethereum, Solana, and Polygon with unified rewards and seamless bridging.",
    image: workers,
  },
  {
    tag: "Guide",
    title: "How to mint your first NFT collection on DAppFi in under 5 minutes",
    desc: "A step-by-step walkthrough for creators to launch NFTs with zero coding required.",
    image: exploreMeeting,
  },
  {
    tag: "Research",
    title:
      "DeFi yield strategies: comparing liquidity pools vs. staking rewards",
    desc: "Our data team breaks down risk-adjusted returns across major DeFi protocols in 2026.",
    image: exploreGreen,
  },
  {
    tag: "Update",
    title:
      "Governance proposal #47: community votes to reduce protocol fees by 30%",
    desc: "Token holders shape the future of DAppFi through transparent on-chain governance.",
    image: exploreTech,
  },
  {
    tag: "Case study",
    title:
      "From zero to 10K NFTs: how a digital artist scaled with DAppFi minting",
    desc: "How one creator leveraged batch minting and cross-chain distribution to grow their audience.",
    image: exploreLobby,
  },
];

const ExploreSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = exploreData[activeIndex];

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % exploreData.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + exploreData.length) % exploreData.length,
    );
  }, []);

  return (
    <section className="section-padding bg-secondary">
      <div className="section-container">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            More to explore
          </h2>
          <div className="flex gap-2">
            <button
              onClick={goPrev}
              className="p-2 rounded-full border border-border hover:bg-background transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={goNext}
              className="p-2 rounded-full border border-border hover:bg-background transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="overflow-hidden rounded-lg relative h-72">
            {exploreData.map((item, i) => (
              <img
                key={i}
                src={item.image}
                alt={item.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  i === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          <div className="bg-background rounded-lg p-8 flex flex-col justify-center border border-border">
            <span
              key={`tag-${activeIndex}`}
              className="text-xs font-semibold text-primary uppercase tracking-widest animate-fade-in"
            >
              {active.tag}
            </span>
            <h3
              key={`title-${activeIndex}`}
              className="mt-3 text-xl md:text-2xl font-bold text-foreground leading-snug animate-fade-in"
            >
              {active.title}
            </h3>
            <p
              key={`desc-${activeIndex}`}
              className="mt-3 text-sm text-muted-foreground leading-relaxed animate-fade-in"
            >
              {active.desc}
            </p>
            <a href="#" className="link-arrow-primary mt-6 self-start">
              Read more <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
