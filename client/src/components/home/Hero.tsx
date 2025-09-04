import { Link } from "wouter";
import { useState, useEffect } from 'react';

const Hero = () => {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    // Try to load the image first
    const img = new Image();
    // In Vite, public assets should be referenced from the root in both dev and prod
    const imagePath = '/images/Beauthgirl2.jpg';
    
    // Create a URL object to handle the path resolution
    const imageUrl = new URL(imagePath, import.meta.url).href;
    
    img.src = imagePath;
    
    img.onload = () => {
      // If image loads successfully, use it
      setImgSrc(imagePath);
    };
    
    img.onerror = () => {
      // If image fails to load, try alternative paths
      console.log('Hero image not found at', imagePath, 'trying fallback...');
      
      // Try alternative paths
      const fallbackPaths = [
        '/favicon.jpg',
        '/client/public/favicon.jpg'
      ];
      
      const tryNextFallback = (index = 0) => {
        if (index >= fallbackPaths.length) {
          console.error('All fallback images failed to load');
          return;
        }
        
        const fallbackImg = new Image();
        fallbackImg.src = fallbackPaths[index];
        
        fallbackImg.onload = () => {
          console.log('Using fallback image:', fallbackPaths[index]);
          setImgSrc(fallbackPaths[index]);
        };
        
        fallbackImg.onerror = () => {
          console.log('Fallback image failed:', fallbackPaths[index]);
          tryNextFallback(index + 1);
        };
      };
      
      tryNextFallback();
    };
  }, []);
  
  // Don't render the image until we know which source to use
  if (!imgSrc) return null;

  return (
    <section className="relative bg-neutral py-8 md:py-12">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold text-primary font-heading mb-4 leading-tight">Transform Your Skin, Elevate Your Beauty</h1>
            <p className="text-xl md:text-2xl font-medium text-accent mb-6 font-heading">Ghana's #1 Online Destination for Premium Skincare & Body Enhancement Products</p>
            <p className="text-gray-700 mb-8">Discover authentic, high-quality skincare and body enhancement products carefully curated for beautiful Ghanaian skin. From Accra to Kumasi, we deliver confidence to your doorstep with products that actually work.</p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/shop" 
                className="btn-primary inline-flex items-center px-6 py-3 rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
              >
                <span>Shop Now</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
              <Link 
                href="/consultation" 
                className="btn-secondary inline-flex items-center px-6 py-3 rounded-md text-primary border-2 border-primary hover:bg-primary/10 transition-colors"
              >
                Free Skin Consultation
              </Link>
            </div>
          </div>
          <div className="w-full md:w-5/12 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={imgSrc}
              alt="Beautiful woman with glowing skin" 
              className="w-full h-auto object-cover rounded-lg max-h-[400px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
