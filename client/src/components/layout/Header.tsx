import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, User, ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart, CartProvider } from "@/hooks/useCart";

const HeaderContent = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItemsCount } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log("Searching for:", searchQuery);
  };

  const navLinks = [
    { name: "Shop", href: "/categories/facial-skincare" },
    { name: "About Us", href: "/about-us" },
    { name: "Consultation", href: "/consultation" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <h1 className="text-primary font-serif font-bold text-2xl md:text-3xl">Body Enhance</h1>
              <span className="text-secondary text-xl ml-1">&</span>
              <span className="text-secondary font-serif font-semibold text-xl ml-1">Skincare Hub</span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full max-w-xl mx-auto">
              <form onSubmit={handleSearch}>
                <Input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>

          {/* Navigation for Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-dark hover:text-primary font-medium ${
                  location === link.href ? "text-primary" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center space-x-4">
              <Link href="/account" className="text-dark hover:text-primary">
                <User className="h-6 w-6" />
              </Link>
              <Link href="/cart" className="text-dark hover:text-primary relative">
                <ShoppingBag className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-dark hover:text-primary mr-4"
              onClick={() => {
                setMobileMenuOpen(true);
              }}
            >
              <Search className="h-6 w-6" />
            </Button>
            <Link href="/cart" className="text-dark hover:text-primary mr-4 relative">
              <ShoppingBag className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-dark hover:text-primary">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full py-6">
                  <div className="flex items-center mb-6">
                    <h1 className="text-primary font-serif font-bold text-2xl">Body Enhance</h1>
                    <span className="text-secondary text-xl ml-1">&</span>
                    <span className="text-secondary font-serif font-semibold text-xl ml-1">Skincare Hub</span>
                  </div>

                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`text-dark hover:text-primary font-medium text-lg ${
                          location === link.href ? "text-primary" : ""
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Link
                      href="/account"
                      className="text-dark hover:text-primary font-medium text-lg flex items-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="h-5 w-5 mr-2" />
                      My Account
                    </Link>
                  </nav>

                  <div className="mt-auto">
                    <form onSubmit={handleSearch} className="relative">
                      <Input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                      >
                        <Search className="h-5 w-5" />
                      </Button>
                    </form>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch} className="relative w-full">
            <Input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};

// Wrap HeaderContent in CartProvider
const Header = () => {
  return (
    <CartProvider>
      <HeaderContent />
    </CartProvider>
  );
};

export default Header;
