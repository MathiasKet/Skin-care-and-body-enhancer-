import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ProductCard from "../shop/ProductCard";
import type { Product } from "../shop/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for new arrivals using placeholder product images
const mockNewArrivals: Product[] = [
  {
    id: 10,
    name: 'Niacinamide Serum',
    slug: 'niacinamide-serum',
    description: '10% Niacinamide for blemish-prone skin',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://via.placeholder.com/400x400?text=Niacinamide+Serum',
    rating: 4.8,
    reviewCount: 215,
    isNew: true,
    brand: 'PureSkin',
    category: 'Serum',
    skinConcerns: ['acne', 'pores', 'uneven tone'],
    skinTypes: ['oily', 'combination', 'acne-prone']
  },
  {
    id: 11,
    name: 'Retinol Night Cream',
    slug: 'retinol-night-cream',
    description: 'Anti-aging cream with 1% retinol',
    price: 42.99,
    originalPrice: 49.99,
    image: 'https://via.placeholder.com/400x400?text=Retinol+Night+Cream',
    rating: 4.9,
    reviewCount: 178,
    isNew: true,
    brand: 'AgeDefy',
    category: 'Night Cream',
    skinConcerns: ['fine lines', 'wrinkles', 'aging'],
    skinTypes: ['all']
  },
  // Add more mock products as needed
];

const NewArrivals = () => {
  const { data: newArrivals = mockNewArrivals, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/new-arrivals'],
    retry: 1,
  });
  
  // Use the mock data if the API call fails
  const displayedProducts = newArrivals || mockNewArrivals;
  
  return (
    <section className="py-12 bg-neutral">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-heading text-primary">New Arrivals</h2>
          <Link 
            href="/shop?new=true"
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

export default NewArrivals;
