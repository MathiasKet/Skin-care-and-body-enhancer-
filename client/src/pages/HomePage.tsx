import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/home/TrustBadges";
import CategoryHighlights from "@/components/home/CategoryHighlights";
import BestSellers from "@/components/home/BestSellers";
import ConsultationPromo from "@/components/home/ConsultationPromo";
import NewArrivals from "@/components/home/NewArrivals";
import Testimonials from "@/components/home/Testimonials";
import Stats from "@/components/home/Stats";
import Newsletter from "@/components/home/Newsletter";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Body Enhance & Skincare Hub - Ghana's Premium Skincare Destination</title>
        <meta name="description" content="Discover authentic, high-quality skincare and body enhancement products carefully curated for beautiful Ghanaian skin. From Accra to Kumasi, we deliver confidence to your doorstep with products that actually work." />
      </Helmet>
      
      <Hero />
      <TrustBadges />
      <CategoryHighlights />
      <BestSellers />
      <ConsultationPromo />
      <NewArrivals />
      <Testimonials />
      <Stats />
      <Newsletter />
    </>
  );
};

export default HomePage;
