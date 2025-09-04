import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "../cart/CartProvider";
import logoImage from "@assets/IMG_7763.jpg";

interface HeaderProps {
  onCartOpenChange?: (open: boolean) => void;
}

const Header = ({ onCartOpenChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { cartItems } = useCart();
  
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <span><i className="fas fa-phone-alt mr-1"></i> +233 (0) 302 123 456</span>
            <span className="hidden md:inline"><i className="fas fa-envelope mr-1"></i> hello@bodyenhancehub.com</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/shipping" className="hover:text-secondary-light transition">Track Order</Link>
            <Link to="/store-locator" className="hover:text-secondary-light transition hidden sm:inline">Store Locator</Link>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src={logoImage} 
                alt="Body Enhance & Skincare Hub" 
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold text-primary font-heading hidden sm:block">
                Body Enhance & Skincare Hub
              </span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden text-gray-700">
                  <i className="fas fa-bars text-xl"></i>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 mt-8">
                  <Link to="/" className="text-lg font-medium hover:text-primary">Home</Link>
                  <Link to="/shop/facial-skincare" className="text-lg font-medium hover:text-primary">Facial Skincare</Link>
                  <Link to="/shop/body-enhancement" className="text-lg font-medium hover:text-primary">Body Enhancement</Link>
                  <Link to="/shop/specialized-treatments" className="text-lg font-medium hover:text-primary">Specialized Treatments</Link>
                  <Link to="/shop/natural-organic" className="text-lg font-medium hover:text-primary">Natural & Organic</Link>
                  <Link to="/about" className="text-lg font-medium hover:text-primary">About Us</Link>
                  <Link to="/consultation" className="text-lg font-medium hover:text-primary">Consultation</Link>
                  <Link to="/shipping" className="text-lg font-medium hover:text-primary">Shipping</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="flex-1 max-w-xl mx-auto md:mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input 
                type="search" 
                placeholder="Search for products..." 
                className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </form>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Link to="/account" className="flex items-center text-gray-700 hover:text-primary">
              <i className="fas fa-user text-xl"></i>
              <span className="ml-2 hidden sm:inline">Account</span>
            </Link>
            <Link to="/wishlist" className="flex items-center text-gray-700 hover:text-primary">
              <i className="fas fa-heart text-xl"></i>
              <span className="ml-2 hidden sm:inline">Wishlist</span>
            </Link>
            <button 
              onClick={() => onCartOpenChange?.(true)}
              className="flex items-center hover:text-primary transition relative"
            >
              <i className="fas fa-shopping-bag text-xl"></i>
              <span className="ml-2 hidden sm:inline">Cart</span>
              <span className="ml-1 hidden sm:inline">Cart</span>
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="bg-white border-t border-b border-gray-200 hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex flex-wrap justify-center space-x-1 md:space-x-6 text-sm md:text-base font-medium">
            <li><Link to="/" className="block py-3 px-2 hover:text-primary transition">Home</Link></li>
            <li><Link to="/shop/facial-skincare" className="block py-3 px-2 hover:text-primary transition">Facial Skincare</Link></li>
            <li><Link to="/shop/body-enhancement" className="block py-3 px-2 hover:text-primary transition">Body Enhancement</Link></li>
            <li><Link to="/shop/specialized-treatments" className="block py-3 px-2 hover:text-primary transition">Specialized Treatments</Link></li>
            <li><Link to="/shop/natural-organic" className="block py-3 px-2 hover:text-primary transition">Natural & Organic</Link></li>
            <li><Link to="/shop?sale=true" className="block py-3 px-2 text-accent font-semibold">Sale</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
