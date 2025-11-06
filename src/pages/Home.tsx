import { HeroSection } from "../components/HeroSection";
import { PortfolioSection } from "../components/PortfolioSection";
import { AboutSection } from "../components/AboutSection";
import { ServicesSection } from "../components/ServicesSection";
import { ContactSection } from "../components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PortfolioSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
