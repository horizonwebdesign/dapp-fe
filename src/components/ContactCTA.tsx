import { ArrowRight } from "lucide-react";
import contactBg from "@/assets/contact-bg.jpg";

const ContactCTA = () => {
  return (
    <section id="contact" className="relative h-72 md:h-80 overflow-hidden">
      <img
        src={contactBg}
        alt="Blockchain network"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-primary/70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
          Start staking on{" "}
          <span className=" font-bold font-heading tracking-tight group-hover:text-primary transition-colors">
            Dapp<span className="">Fi</span>
          </span>
        </h2>
        <a
          href="/staking"
          className="mt-6 inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors"
          aria-label="Launch app"
        >
          <ArrowRight className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
};

export default ContactCTA;
