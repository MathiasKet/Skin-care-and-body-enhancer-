import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Category } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import CategoryCard from "@/components/common/CategoryCard";

const FeaturedCategories = () => {
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (error) {
    return (
      <section className="py-12 md:py-16 bg-neutral">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">Failed to load categories</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-neutral">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Shop Our Categories</h2>
          <p className="section-subtitle">
            Explore our carefully curated selection of premium skincare and body enhancement products designed for Ghanaian skin
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))
            : categories?.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
