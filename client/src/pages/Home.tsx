import HeroSection from "@/components/home/HeroSection";
import TrustIndicators from "@/components/home/TrustIndicators";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import BestSellingProducts from "@/components/home/BestSellingProducts";
import TestimonialSection from "@/components/home/TestimonialSection";
import ConsultationCTA from "@/components/home/ConsultationCTA";
import BlogPreview from "@/components/home/BlogPreview";
import Newsletter from "@/components/home/Newsletter";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Body Enhance & Skincare Hub - Ghana's #1 Skincare Destination</title>
        <meta name="description" content="Discover authentic, high-quality skincare and body enhancement products curated for Ghanaian skin. From Accra to Kumasi, we deliver premium skincare products to your doorstep." />
      </Helmet>

      <HeroSection />
      <TrustIndicators />
      <FeaturedCategories />
      <BestSellingProducts />
      <TestimonialSection />
      <ConsultationCTA />
      <BlogPreview />
      <Newsletter />
    </>
  );
};

export default Home;
