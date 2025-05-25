import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/components/cart/CartProvider";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "@/components/shop/ProductCard";
import { Helmet } from "react-helmet";

const ProductPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const { data: product, isLoading } = useQuery({
    queryKey: [`/api/products/${id}`],
  });
  
  const { data: relatedProducts } = useQuery({
    queryKey: [`/api/products/related/${id}`],
  });
  
  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart.`
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
    <>
      {product && (
        <Helmet>
          <title>{product.name} - Body Enhance & Skincare Hub</title>
          <meta name="description" content={product.shortDescription} />
        </Helmet>
      )}
      
      <div className="bg-neutral py-6">
        <div className="container mx-auto px-4">
          <nav className="text-sm breadcrumbs">
            <ul className="flex">
              <li><a href="/" className="text-gray-500 hover:text-primary">Home</a></li>
              <li><span className="mx-2">/</span></li>
              <li><a href="/shop" className="text-gray-500 hover:text-primary">Shop</a></li>
              {product?.category && (
                <>
                  <li><span className="mx-2">/</span></li>
                  <li>
                    <a href={`/shop/${product.category.slug}`} className="text-gray-500 hover:text-primary">
                      {product.category.name}
                    </a>
                  </li>
                </>
              )}
              <li><span className="mx-2">/</span></li>
              <li className="text-primary font-medium">
                {isLoading ? <Skeleton className="h-4 w-24" /> : product?.name}
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="w-full md:w-1/2 p-4">
              {isLoading ? (
                <Skeleton className="w-full aspect-square rounded-lg" />
              ) : (
                <img 
                  src={product?.image} 
                  alt={product?.name} 
                  className="w-full h-auto object-contain rounded-lg"
                />
              )}
            </div>
            
            {/* Product Info */}
            <div className="w-full md:w-1/2 p-6">
              {isLoading ? (
                <>
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-5 w-1/4 mb-4" />
                  <Skeleton className="h-6 w-1/3 mb-6" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-6" />
                  <Skeleton className="h-10 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </>
              ) : (
                <>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product?.name}</h1>
                  
                  <div className="flex items-center mb-4">
                    <div className="text-yellow-400 mr-2">
                      {product && renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">({product?.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-2xl font-bold text-primary">GH₵{product?.price.toFixed(2)}</span>
                    {product?.originalPrice && (
                      <span className="text-gray-500 line-through ml-2">GH₵{product?.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-gray-600 mb-4">{product?.shortDescription}</p>
                    
                    {product?.stockStatus === 'in_stock' ? (
                      <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        <i className="fas fa-check-circle mr-1"></i> In Stock
                      </span>
                    ) : (
                      <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                        <i className="fas fa-times-circle mr-1"></i> Out of Stock
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        <label className="text-gray-600 block mb-1">Quantity</label>
                        <div className="flex items-center border rounded-md">
                          <button 
                            onClick={() => handleQuantityChange(-1)}
                            className="w-10 h-10 flex items-center justify-center border-r"
                            disabled={quantity <= 1}
                          >
                            <i className="fas fa-minus text-gray-500"></i>
                          </button>
                          <span className="w-12 text-center">{quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(1)}
                            className="w-10 h-10 flex items-center justify-center border-l"
                          >
                            <i className="fas fa-plus text-gray-500"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button 
                        onClick={handleAddToCart}
                        className="bg-primary hover:bg-primary-dark text-white py-3 rounded-full"
                        disabled={product?.stockStatus !== 'in_stock'}
                      >
                        <i className="fas fa-shopping-bag mr-2"></i> Add to Cart
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary-light hover:text-white py-3 rounded-full"
                      >
                        <i className="far fa-heart mr-2"></i> Add to Wishlist
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 w-24">SKU:</span>
                      <span>{product?.sku}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 w-24">Category:</span>
                      <a href={`/shop/${product?.category.slug}`} className="text-primary hover:underline">
                        {product?.category.name}
                      </a>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 w-24">Brand:</span>
                      <a href={`/shop?brand=${product?.brand.slug}`} className="text-primary hover:underline">
                        {product?.brand.name}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 w-24">Share:</span>
                      <div className="flex space-x-2">
                        <a href="#" className="text-gray-400 hover:text-primary"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="text-gray-400 hover:text-primary"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="text-gray-400 hover:text-primary"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="text-gray-400 hover:text-primary"><i className="fab fa-whatsapp"></i></a>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="p-6 border-t">
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <Tabs defaultValue="description">
                <TabsList className="border-b w-full justify-start">
                  <TabsTrigger value="description" className="text-md">Description</TabsTrigger>
                  <TabsTrigger value="details" className="text-md">Details</TabsTrigger>
                  <TabsTrigger value="how-to-use" className="text-md">How To Use</TabsTrigger>
                  <TabsTrigger value="reviews" className="text-md">Reviews ({product?.reviewCount})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="py-4">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-bold text-primary mb-4">Product Description</h3>
                    <div dangerouslySetInnerHTML={{ __html: product?.description || '' }} />
                    
                    <h4 className="text-lg font-bold text-primary mt-6 mb-3">✨ PRODUCT HIGHLIGHTS:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {product?.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                    
                    <h4 className="text-lg font-bold text-primary mt-6 mb-3">🌟 PERFECT FOR:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {product?.perfectFor.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    
                    <h4 className="text-lg font-bold text-primary mt-6 mb-3">🇬🇭 WHY GHANAIANS LOVE IT:</h4>
                    <p>{product?.whyGhanaLovesIt}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="py-4">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-bold text-primary mb-4">Product Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-bold mb-3">Ingredients</h4>
                        <p>{product?.ingredients}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-bold mb-3">Specifications</h4>
                        <ul className="space-y-2">
                          <li><strong>Size:</strong> {product?.size}</li>
                          <li><strong>Product Type:</strong> {product?.productType}</li>
                          <li><strong>Skin Type:</strong> {product?.skinTypes.join(', ')}</li>
                          <li><strong>Made In:</strong> {product?.madeIn}</li>
                          <li><strong>Shelf Life:</strong> {product?.shelfLife}</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-bold mb-3">⚠️ IMPORTANT NOTES:</h4>
                      <p>{product?.importantNotes}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="how-to-use" className="py-4">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-bold text-primary mb-4">💡 HOW TO USE:</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      {product?.howToUse.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-bold mb-3">📦 WHAT'S INCLUDED:</h4>
                      <p>{product?.whatsIncluded}</p>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-bold mb-3">🚚 DELIVERY INFO:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Accra: 1-2 days</li>
                        <li>Other regions: 2-5 days</li>
                        <li>Free delivery on orders above GH₵200</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="py-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Customer Reviews</h3>
                    
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                      <div className="md:w-1/3">
                        <div className="text-center p-4 bg-neutral rounded-lg">
                          <div className="text-5xl font-bold text-primary mb-2">{product?.rating.toFixed(1)}</div>
                          <div className="text-yellow-400 text-xl mb-2">
                            {renderStars(product?.rating || 0)}
                          </div>
                          <p className="text-gray-600">Based on {product?.reviewCount} reviews</p>
                        </div>
                      </div>
                      
                      <div className="md:w-2/3">
                        <div className="space-y-4">
                          {product?.reviews?.map((review, index) => (
                            <div key={index} className="border-b pb-4">
                              <div className="flex items-center mb-2">
                                <div className="text-yellow-400 mr-2">
                                  {renderStars(review.rating)}
                                </div>
                                <span className="font-medium">{review.title}</span>
                              </div>
                              <p className="text-gray-600 mb-2">{review.comment}</p>
                              <div className="flex items-center text-sm text-gray-500">
                                <span>{review.author}</span>
                                <span className="mx-2">•</span>
                                <span>{review.date}</span>
                                <span className="mx-2">•</span>
                                <span className="text-primary">Verified Purchase</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6">
                          <Button className="bg-primary hover:bg-primary-dark text-white">
                            Write a Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-primary mb-6">You May Also Like</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
