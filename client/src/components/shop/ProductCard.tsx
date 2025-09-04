import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useCart } from "../cart/CartProvider";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isOrganic?: boolean;
  brand: string;
  category: string;
  skinConcerns: string[];
  skinTypes: string[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [imageSrc, setImageSrc] = useState(product.image);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    
    // Prepare the item data without quantity
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
      brand: product.brand
    };
    
    // Add to cart with default quantity of 1
    addToCart(item, 1);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    
    return stars;
  };
  
  return (
    <div 
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <a className="block relative overflow-hidden h-64">
          {/* Product Image */}
          <div className="relative w-full h-full">
            <img 
              src={imageSrc} 
              alt={product.name} 
              className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
              onError={() => {
                console.log('Product image failed to load, using fallback');
                setImageSrc('/favicon.jpg');
              }}
            />
            
            {/* Sale Badge */}
            {product.originalPrice && (
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </div>
            )}
            
            {/* Product Badges */}
            <div className="absolute top-3 right-3 flex flex-col space-y-2">
              {product.isBestSeller && (
                <div className="bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">Best Seller</div>
              )}
              {product.isNew && (
                <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">New</div>
              )}
              {product.isOrganic && (
                <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">Organic</div>
              )}
            </div>
            
            {/* Quick Add to Cart */}
            <div className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3 transform transition-all duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-primary text-white hover:bg-primary/90 transition-colors duration-300"
                size="sm"
              >
                <i className="fas fa-shopping-bag mr-2"></i>
                Add to Cart
              </Button>
            </div>
          </div>
        </a>
      </Link>
      
      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <Link href={`/product/${product.id}`}>
            <a className="font-medium text-gray-800 hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </a>
          </Link>
          
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <i className={`${isHovered ? 'fas' : 'far'} fa-heart`}></i>
          </button>
        </div>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 text-sm">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <div>
            <span className="text-lg font-bold text-gray-900">GH₵{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">GH₵{product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <Button 
            onClick={handleAddToCart}
            variant="outline"
            size="sm"
            className="border-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-colors"
          >
            <i className="fas fa-plus"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
