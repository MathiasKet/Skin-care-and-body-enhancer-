import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ProductCard from "../shop/ProductCard";
import type { Product } from "../shop/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for best sellers using placeholder product images
const mockBestSellers: Product[] = [
  {
    id: 1,
    name: 'Vitamin C Serum',
    slug: 'vitamin-c-serum',
    description: 'Brightening serum with 20% vitamin C',
    price: 34.99,
    originalPrice: 44.99,
    image: 'https://via.placeholder.com/400x400?text=Vitamin+C+Serum',
    rating: 4.8,
    reviewCount: 256,
    isBestSeller: true,
    brand: 'DermaGlow',
    category: 'Serum',
    skinConcerns: ['dullness', 'dark spots', 'uneven tone'],
    skinTypes: ['all']
  },
  {
    id: 2,
    name: 'Hyaluronic Acid Moisturizer',
    slug: 'hyaluronic-acid-moisturizer',
    description: 'Intense hydration with hyaluronic acid',
    price: 29.99,
    image: 'https://via.placeholder.com/400x400?text=Hyaluronic+Acid+Moisturizer',
    rating: 4.7,
    reviewCount: 189,
    isBestSeller: true,
    brand: 'AquaSkin',
    category: 'Moisturizer',
    skinConcerns: ['dryness', 'dehydration'],
    skinTypes: ['dry', 'normal', 'combination']
  },
  // Add more mock products as needed
];

const BestSellers = () => {
  const { data: bestSellers = mockBestSellers, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/bestsellers'],
    retry: 1,
  });
  
  // Use the mock data if the API call fails
  const displayedProducts = bestSellers || mockBestSellers;
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-heading text-primary">Best Sellers</h2>
          <Link 
            href="/shop?sort=popularity"
            className="text-accent hover:text-accent-dark font-medium inline-flex items-center transition"
          >
            View All <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="w-full h-64" />
                <div className="p-4">
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-5 w-48 mb-2" />
                  <Skeleton className="h-4 w-32 mb-2" />
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            displayedProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
