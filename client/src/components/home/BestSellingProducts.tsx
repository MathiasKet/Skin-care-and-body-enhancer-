import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";

const BestSellingProducts = () => {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products?bestSeller=true&limit=4"],
  });

  if (error) {
    return (
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">Failed to load products</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">Best Selling Products</h2>
            <p className="text-gray-600">Loved by thousands of Ghanaians</p>
          </div>
          <Link href="/best-sellers">
            <a className="hidden md:block text-primary hover:text-primary/80 font-medium">
              View All Products
              <ChevronRight className="h-4 w-4 inline ml-1" />
            </a>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <div className="relative">
                    <Skeleton className="w-full h-64" />
                  </div>
                  <div className="p-4">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-6 w-5/6 mb-1" />
                    <Skeleton className="h-4 w-4/6 mb-3" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-9 w-9 rounded-full" />
                    </div>
                  </div>
                </div>
              ))
            : products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/best-sellers">
            <a className="text-primary hover:text-primary/80 font-medium">
              View All Products
              <ChevronRight className="h-4 w-4 inline ml-1" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellingProducts;
