import { Link } from "wouter";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <h2 className="text-primary font-serif font-bold text-2xl">Body Enhance</h2>
              <span className="text-white text-xl ml-1">&</span>
              <span className="text-white font-serif font-semibold text-xl ml-1">Skincare Hub</span>
            </div>
            <p className="text-gray-400 mb-4">
              Ghana's #1 destination for premium skincare and body enhancement products tailored for African skin.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="https://youtube.com" className="text-gray-400 hover:text-white" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/categories/facial-skincare" className="text-gray-400 hover:text-white">Facial Skincare</Link></li>
              <li><Link href="/categories/body-enhancement" className="text-gray-400 hover:text-white">Body Enhancement</Link></li>
              <li><Link href="/categories/specialized-treatments" className="text-gray-400 hover:text-white">Specialized Treatments</Link></li>
              <li><Link href="/categories/mens-grooming" className="text-gray-400 hover:text-white">Men's Grooming</Link></li>
              <li><Link href="/categories/natural-organic" className="text-gray-400 hover:text-white">Natural & Organic</Link></li>
              <li><Link href="/new-arrivals" className="text-gray-400 hover:text-white">New Arrivals</Link></li>
              <li><Link href="/best-sellers" className="text-gray-400 hover:text-white">Best Sellers</Link></li>
              <li><Link href="/special-offers" className="text-gray-400 hover:text-white">Special Offers</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link href="/faqs" className="text-gray-400 hover:text-white">FAQs</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white">Shipping & Delivery</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white">Returns & Exchanges</Link></li>
              <li><Link href="/payment-methods" className="text-gray-400 hover:text-white">Payment Methods</Link></li>
              <li><Link href="/consultation" className="text-gray-400 hover:text-white">Skincare Consultation</Link></li>
              <li><Link href="/track-order" className="text-gray-400 hover:text-white">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                <span className="text-gray-400">123 Osu Road, Accra, Ghana</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                <span className="text-gray-400">+233 20 123 4567</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                <span className="text-gray-400">info@bodyenhancehub.com</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                <div className="text-gray-400">
                  <p>Monday - Friday: 9am - 7pm</p>
                  <p>Saturday: 10am - 5pm</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Body Enhance & Skincare Hub. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
              <Link href="/shipping-policy" className="text-gray-400 hover:text-white text-sm">Shipping Policy</Link>
              <Link href="/refund-policy" className="text-gray-400 hover:text-white text-sm">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
