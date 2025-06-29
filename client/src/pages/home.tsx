import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturedDishes from "@/components/featured-dishes";
import MenuSection from "@/components/menu-section";
import AboutSection from "@/components/about-section";
import LocationSection from "@/components/location-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="font-sans">
      <Navigation />
      <HeroSection />
      <FeaturedDishes />
      <MenuSection />
      <AboutSection />
      <LocationSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
