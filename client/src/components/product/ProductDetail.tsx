import { useState } from "react";
import { Link } from "wouter";
import { Product, Review } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Minus, Plus, ChevronRight, Truck, Shield, RefreshCcw } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import StarRating from "@/components/ui/star-rating";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

interface ProductDetailProps {
  product: Product;
  reviews: Review[];
  isLoadingReviews: boolean;
}

const ProductDetail = ({ product, reviews, isLoadingReviews }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted ? "Item has been removed from your wishlist" : "Item has been added to your wishlist",
    });
  };

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart`,
    });
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Calculate average rating
  const avgRating = reviews.length 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="bg-neutral py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/">
              <a className="hover:text-primary">Home</a>
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href={`/categories/${product.categoryId}`}>
              <a className="hover:text-primary">Category</a>
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-700">{product.name}</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              {product.name}
            </h1>

            <div className="flex items-center mb-4">
              <StarRating rating={avgRating} showCount count={reviews.length} />
            </div>

            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-4">
                  {formatPrice(product.salePrice || product.price)}
                </span>
                {product.salePrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
                {product.salePrice && (
                  <span className="ml-4 bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
                    {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                  </span>
                )}
              </div>
              
              <p className="text-green-600 mt-2">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                {product.description}
              </p>
              
              {product.skinType && (
                <p className="mb-2"><span className="font-medium">Skin Type:</span> {product.skinType}</p>
              )}
            </div>

            <div className="flex flex-col space-y-4 mb-8">
              <div className="flex items-center">
                <span className="mr-4">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={incrementQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full flex-1"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                >
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button 
                  variant="outline" 
                  className={`rounded-full ${isWishlisted ? "bg-primary/10 text-primary border-primary" : ""}`}
                  onClick={handleWishlist}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? "fill-primary" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-full mr-3">
                  <Truck className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">Free Delivery</p>
                  <p className="text-sm text-gray-600">On orders above GH₵200</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-full mr-3">
                  <Shield className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">100% Authentic Products</p>
                  <p className="text-sm text-gray-600">Guaranteed genuine products</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-full mr-3">
                  <RefreshCcw className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">7-Day Returns</p>
                  <p className="text-sm text-gray-600">Easy return policy for your peace of mind</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="usage">How to Use</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="py-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                  <p className="text-gray-700">
                    {product.description}
                  </p>
                </div>
                
                {product.benefits && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                    <p className="text-gray-700">
                      {product.benefits}
                    </p>
                  </div>
                )}
                
                {product.packageContents && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">What's Included</h3>
                    <p className="text-gray-700">
                      {product.packageContents}
                    </p>
                  </div>
                )}
                
                {product.safetyInfo && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Important Notes</h3>
                    <p className="text-gray-700">
                      {product.safetyInfo}
                    </p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Delivery Info</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Accra: 1-2 days</li>
                    <li>Other regions: 2-5 days</li>
                    <li>Free delivery on orders above GH₵200</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="usage" className="py-6">
              <h3 className="text-lg font-semibold mb-4">How to Use</h3>
              {product.usage ? (
                <p className="text-gray-700">
                  {product.usage}
                </p>
              ) : (
                <p className="text-gray-700">
                  For best results, please follow the usage instructions provided on the product packaging. 
                  If you have any questions about how to use this product, please contact our customer service team.
                </p>
              )}
            </TabsContent>

            <TabsContent value="ingredients" className="py-6">
              <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
              {product.ingredients ? (
                <p className="text-gray-700">
                  {product.ingredients}
                </p>
              ) : (
                <p className="text-gray-700">
                  Detailed ingredient information is provided on the product packaging. 
                  If you have specific concerns about ingredients or allergies, please contact our customer service team.
                </p>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="py-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                <Button variant="outline" className="rounded-full">Write a Review</Button>
              </div>

              {isLoadingReviews ? (
                <div className="space-y-6">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-6 w-2/3 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-4" />
                      <div className="flex items-center">
                        <Skeleton className="h-8 w-8 rounded-full mr-2" />
                        <div>
                          <Skeleton className="h-4 w-24 mb-1" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6">
                      <StarRating rating={review.rating} size="md" className="mb-2" />
                      <p className="text-gray-700 mb-4">{review.comment}</p>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mr-2">
                          <span className="text-gray-600 font-medium">
                            {review.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{review.name}</p>
                          <p className="text-gray-500 text-sm">{review.location}</p>
                        </div>
                        {review.verified && (
                          <span className="ml-auto text-xs text-primary font-medium">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    This product has no reviews yet. Be the first to share your experience!
                  </p>
                  <Button variant="outline" className="rounded-full">Write a Review</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Recommended Products Section */}
        <div>
          <h2 className="text-2xl font-serif font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-medium truncate">Similar Product {index + 1}</h3>
                  <p className="text-primary font-semibold mt-1">GH₵ 120</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
