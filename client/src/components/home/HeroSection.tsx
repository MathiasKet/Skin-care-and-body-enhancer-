import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://pixabay.com/get/g9dc29e9c9b987110b3f1dc0a0c0c79befde264866c60ee8995137c241118311c8317e1b6ed0b8e13247c8c166ce8142b76ef7316f3ecf422c46dfe666e4095ff_1280.jpg')", 
          filter: "brightness(0.6)" 
        }}
      ></div>
      
      {/* Gradient overlay */}
      <div className="hero-gradient absolute inset-0 opacity-60"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-4">
            Transform Your Skin, Elevate Your Beauty
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6">
            Ghana's #1 Online Destination for Premium Skincare & Body Enhancement Products
          </p>
          <p className="text-white/80 text-lg mb-8 max-w-xl">
            Discover authentic, high-quality skincare and body enhancement products carefully curated for beautiful Ghanaian skin. From Accra to Kumasi, we deliver confidence to your doorstep with products that actually work.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/categories/facial-skincare">
              <a className="btn-primary">Shop Now</a>
            </Link>
            <Link href="/consultation">
              <a className="btn-secondary">Free Skin Consultation</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
