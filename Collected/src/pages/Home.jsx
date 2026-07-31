import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustBand from "../components/TrustBand";
import HowItWorks from "../components/HowItWorks";
import Categories from "../components/Categories";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBand />
        <HowItWorks />
        <Categories />
      </main>
      <CTASection />
      <Footer />
    </>
  );
}

export default Home;