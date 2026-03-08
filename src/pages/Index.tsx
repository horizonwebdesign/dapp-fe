import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuickLinks from "@/components/QuickLinks";
import FeatureSection from "@/components/FeatureSection";
import ExploreSection from "@/components/ExploreSection";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <QuickLinks />
      <FeatureSection />
      <ExploreSection />
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default Index;
