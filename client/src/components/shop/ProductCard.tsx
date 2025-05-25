import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useCart } from "../cart/CartProvider";
import { useToast } from "@/hooks/use-toast";

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
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    
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
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300">
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <a>
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
          </a>
        </Link>
        
        {product.isBestSeller && (
          <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded">Best Seller</div>
        )}
        
        {product.isNew && (
          <div className="absolute top-3 right-3 bg-secondary text-white text-xs font-bold px-2 py-1 rounded">New</div>
        )}
        
        {product.isOrganic && (
          <div className="absolute top-3 right-3 bg-forest text-white text-xs font-bold px-2 py-1 rounded">Organic</div>
        )}
        
        <button className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow hover:bg-primary hover:text-white transition">
          <i className="far fa-heart"></i>
        </button>
      </div>
      
      <div className="p-4">
        <div className="text-yellow-400 text-sm mb-1">
          {renderStars(product.rating)}
          <span className="text-gray-500 ml-1">({product.reviewCount})</span>
        </div>
        
        <Link href={`/product/${product.id}`}>
          <a className="font-medium text-gray-800 hover:text-primary transition">{product.name}</a>
        </Link>
        
        <p className="text-sm text-gray-500 mb-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-primary">GH₵{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">GH₵{product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <Button 
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary-dark text-white p-2 rounded-full transition"
          >
            <i className="fas fa-shopping-bag"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
