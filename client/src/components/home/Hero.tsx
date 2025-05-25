import { Link } from "wouter";

const Hero = () => {
  return (
    <section className="relative bg-neutral py-12 md:py-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold text-primary font-heading mb-4 leading-tight">Transform Your Skin, Elevate Your Beauty</h1>
            <p className="text-xl md:text-2xl font-medium text-accent mb-6 font-heading">Ghana's #1 Online Destination for Premium Skincare & Body Enhancement Products</p>
            <p className="text-gray-700 mb-8">Discover authentic, high-quality skincare and body enhancement products carefully curated for beautiful Ghanaian skin. From Accra to Kumasi, we deliver confidence to your doorstep with products that actually work.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop">
                <a className="btn-primary">
                  <span>Shop Now</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </Link>
              <Link href="/consultation">
                <a className="btn-secondary">
                  Free Skin Consultation
                </a>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://pixabay.com/get/g2f2387c197517b87d636c7209122492bace5d0498e65e2fae6992dcdf12b5080bdbdbe4180fdd0d1ad5ce49bdfafffc934891ac6f6d00d49079a9ca91cdb1cae_1280.jpg" 
              alt="Woman applying skincare products" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
