import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/abstract_dark_blockchain_network_background_with_glowing_nodes_and_lines.png";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight mb-6">
              The Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary neon-text">
                Decentralized Finance
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              DAppFi provides next-generation staking and minting solutions.
              Earn passive income with high APY and collect exclusive digital
              assets.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/staking">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 px-8 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)]"
                >
                  Start Staking <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/minting">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 border-white/20 hover:bg-white/10 hover:text-white backdrop-blur-sm"
                >
                  Explore NFTs
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Image/Graphic */}
        <div className="absolute top-0 right-0 w-full h-full md:w-2/3 -z-10 opacity-60 mask-image-gradient">
          <img
            src={heroBg}
            alt="Blockchain Network"
            className="w-full h-full object-cover object-center mask-image-to-l"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 40%)",
            }}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-white/5 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                label: "Total Value Locked",
                value: "$124.5M",
                color: "text-primary",
              },
              { label: "Current APY", value: "32.4%", color: "text-secondary" },
              { label: "Total Users", value: "15.2K", color: "text-white" },
              { label: "Treasury", value: "$12.8M", color: "text-primary" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground font-mono uppercase tracking-wider">
                  {stat.label}
                </span>
                <span
                  className={`text-3xl md:text-4xl font-bold font-heading ${stat.color}`}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
              icon={Shield}
              title="Secure Staking"
              description="Audited smart contracts ensure your assets are protected while you earn rewards."
            />
            <FeatureCard
              icon={Zap}
              title="Instant Rewards"
              description="Claim your staking rewards instantly with zero lock-up periods on core pools."
            />
            {/* <FeatureCard 
              icon={Globe}
              title="Cross-Chain"
              description="Seamlessly bridge assets across multiple networks with our integrated bridge."
            /> */}
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="p-8 rounded-2xl glass-panel group hover:bg-white/5 transition-all duration-500 border border-white/5 hover:border-primary/30">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
        <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
