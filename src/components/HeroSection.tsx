import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroCityscape from "@/assets/hero-cityscape.jpg";
import heroDavos from "@/assets/hero-davos.jpg";
import heroOffice from "@/assets/hero-office.jpg";
import heroFuture from "@/assets/hero-future.jpg";

const spotlightData = [
  {
    tab: "Stake your tokens and earn passive rewards today",
    title: "Stake, earn, and grow your portfolio effortlessly",
    cta: "Start staking",
    link: "/staking",
    image: heroCityscape,
  },
  {
    tab: "Mint unique digital assets on-chain in seconds",
    title: "Mint NFTs and digital assets with zero friction",
    cta: "Mint now",
    link: "/minting",
    image: heroDavos,
  },
  {
    tab: "DeFi yields reimagined with next-gen protocols",
    title: "Unlock next-generation DeFi yields securely",
    cta: "Explore DeFi",
    image: heroOffice,
  },
  {
    tab: "Governance and community-driven protocol evolution",
    title: "Shape the future through decentralized governance",
    cta: "Join governance",
    image: heroFuture,
  },
];

const AUTO_INTERVAL = 15000;

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const active = spotlightData[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setActiveIndex(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning],
  );

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % spotlightData.length);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + spotlightData.length) % spotlightData.length);
  }, [activeIndex, goTo]);

  // Auto-rotate every 15 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % spotlightData.length);
    }, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section className="relative">
      {/* Hero Image */}
      <div className="relative h-[420px] md:h-[500px] overflow-hidden">
        {spotlightData.map((item, i) => (
          <img
            key={i}
            src={item.image}
            alt={item.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="section-container w-full">
            <h1
              key={activeIndex}
              className="text-3xl md:text-5xl font-bold text-background max-w-lg leading-tight animate-fade-in"
            >
              {active.title}
            </h1>
            <a
              href={active.link || "#"}
              className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
            >
              {active.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Mobile carousel arrows (below 1020px) */}
        <div className="flex lg:hidden absolute bottom-6 right-6 gap-2 z-10">
          <button
            onClick={goPrev}
            className="w-10 h-10 flex items-center justify-center rounded bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-background transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            className="w-10 h-10 flex items-center justify-center rounded bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-background transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Spotlight tabs - desktop only (1020px+) */}
      <div className="section-container -mt-8 relative z-10 hidden lg:block">
        <div className="bg-background rounded-xl shadow-lg border border-border grid grid-cols-[auto_1fr_1fr_1fr_1fr] overflow-hidden">
          <span className="px-5 py-4 text-sm font-bold text-primary self-center">
            Featured
            <br />
            highlights
          </span>
          {spotlightData.map((item, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`relative px-5 py-4 text-xs text-left transition-colors border-l border-border hover:bg-muted/50 ${
                i === activeIndex
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              {i === activeIndex && (
                <span className="absolute left-0 top-3 bottom-3 w-[3px] bg-primary rounded-r transition-all duration-300" />
              )}
              {item.tab}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile spotlight indicator dots */}
      <div className="lg:hidden flex justify-center gap-2 mt-4">
        {spotlightData.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-6 bg-primary"
                : "w-2 bg-muted-foreground/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
