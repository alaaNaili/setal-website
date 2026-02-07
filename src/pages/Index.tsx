import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import CitizenFeatures from "@/components/landing/CitizenFeatures";
import MunicipalityDashboard from "@/components/landing/MunicipalityDashboard";
import ImpactStats from "@/components/landing/ImpactStats";
import BeforeAfterSlider from "@/components/landing/BeforeAfterSlider";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="citizens">
          <CitizenFeatures />
        </section>
        <section id="municipalities">
          <MunicipalityDashboard />
        </section>
        <section id="impact">
          <ImpactStats />
        </section>
        <BeforeAfterSlider />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
