import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ProductCard from "../shop/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

const BestSellers = () => {
  const { data: bestSellers, isLoading } = useQuery({
    queryKey: ['/api/products/bestsellers'],
  });
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-heading text-primary">Best Sellers</h2>
          <Link href="/shop?sort=popularity">
            <a className="text-accent hover:text-accent-dark font-medium inline-flex items-center transition">
              View All <i className="fas fa-arrow-right ml-2"></i>
            </a>
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
            bestSellers?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
