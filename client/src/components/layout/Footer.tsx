import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">Body<span className="text-secondary">Enhance</span></h3>
            <p className="mb-4 text-gray-300">Ghana's #1 online destination for premium skincare and body enhancement products.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-secondary transition"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-white hover:text-secondary transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-white hover:text-secondary transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white hover:text-secondary transition"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/shop/facial-skincare" className="text-gray-300 hover:text-white transition">Facial Skincare</Link></li>
              <li><Link href="/shop/body-enhancement" className="text-gray-300 hover:text-white transition">Body Enhancement</Link></li>
              <li><Link href="/shop/specialized-treatments" className="text-gray-300 hover:text-white transition">Specialized Treatments</Link></li>
              <li><Link href="/shop/natural-organic" className="text-gray-300 hover:text-white transition">Natural & Organic</Link></li>
              <li><Link href="/shop?new=true" className="text-gray-300 hover:text-white transition">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/faqs" className="text-gray-300 hover:text-white transition">FAQs</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white transition">Shipping & Delivery</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-white transition">Returns & Refunds</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white transition">Track Your Order</Link></li>
              <li><Link href="/consultation" className="text-gray-300 hover:text-white transition">Skin Consultation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2 text-secondary"></i>
                <span>123 Independence Ave, Accra, Ghana</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-2 text-secondary"></i>
                <span>+233 (0) 302 123 456</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-2 text-secondary"></i>
                <span>hello@bodyenhancehub.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock mt-1 mr-2 text-secondary"></i>
                <span>Mon-Sat: 9am - 6pm</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">© 2023 Body Enhance & Skincare Hub. All Rights Reserved.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition">Terms of Service</Link>
              <Link href="/shipping" className="text-sm text-gray-400 hover:text-white transition">Shipping Policy</Link>
              <Link href="/returns" className="text-sm text-gray-400 hover:text-white transition">Refund Policy</Link>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">Payment Methods:</p>
            <div className="flex justify-center space-x-3 mt-2">
              <i className="fab fa-cc-visa text-2xl text-gray-400"></i>
              <i className="fab fa-cc-mastercard text-2xl text-gray-400"></i>
              <i className="fab fa-cc-paypal text-2xl text-gray-400"></i>
              <span className="text-gray-400 text-lg">Mobile Money</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
