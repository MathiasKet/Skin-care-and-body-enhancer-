import { useState } from "react";
import { Link } from "wouter";
import { Product } from "@shared/schema";
import { Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import StarRating from "@/components/ui/star-rating";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted ? "Item has been removed from your wishlist" : "Item has been added to your wishlist",
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product.id, 1);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  // Get random reviews count for demo
  const reviewsCount = Math.floor(Math.random() * 100) + 20;

  return (
    <Link href={`/products/${product.slug}`}>
      <a className="product-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 border border-gray-100">
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          {product.isBestSeller && (
            <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
              Best Seller
            </div>
          )}
          {product.isPopular && !product.isBestSeller && (
            <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
              Popular
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 ${
              isWishlisted ? "bg-primary/10 text-primary" : "bg-white/80 hover:bg-white text-gray-700"
            } rounded-full p-2 backdrop-blur-sm`}
            onClick={handleWishlist}
          >
            <Heart className={isWishlisted ? "fill-primary" : ""} size={20} />
          </Button>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            <StarRating rating={4.5} size="sm" showCount count={reviewsCount} />
          </div>
          <h3 className="font-medium text-lg mb-1">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-3">
            {product.description.length > 40
              ? product.description.substring(0, 40) + "..."
              : product.description}
          </p>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-lg font-semibold">
                {formatPrice(product.salePrice || product.price)}
              </span>
              {product.salePrice && (
                <span className="text-gray-400 text-sm line-through ml-2">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="bg-secondary hover:bg-secondary/90 text-white p-2 rounded-full"
              onClick={handleAddToCart}
            >
              <Plus size={20} />
            </Button>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
