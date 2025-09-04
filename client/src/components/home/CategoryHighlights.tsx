import { useQuery } from "@tanstack/react-query";
import CategoryCard from "../shop/CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

const CategoryHighlights = () => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  // Fallback categories if API fails
  const fallbackCategories: Category[] = [
    {
      id: 1,
      name: "Facial Skincare",
      slug: "facial-skincare",
      image: "/images/category-facial.jpg",
      productCount: 25
    },
    {
      id: 2,
      name: "Body Enhancement",
      slug: "body-enhancement",
      image: "/images/IMG_7693.JPG",
      productCount: 18
    },
    {
      id: 3,
      name: "Specialized Treatments",
      slug: "specialized-treatments",
      image: "/images/IMG_7694.JPG",
      productCount: 32
    },
    {
      id: 5,
      name: "Natural & Organic",
      slug: "natural-organic",
      image: "/images/IMG_7695.JPG",
      productCount: 21
    }
  ];
  
  const displayCategories = categories || fallbackCategories;
  
  return (
    <section className="py-12 bg-neutral">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-heading text-primary mb-2">Shop by Category</h2>
          <p className="text-gray-600">Discover products tailored for your specific beauty needs</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {isLoading ? (
            Array(5).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow overflow-hidden text-center">
                <Skeleton className="w-full h-40" />
                <div className="p-4">
                  <Skeleton className="h-6 w-24 mx-auto mb-1" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
              </div>
            ))
          ) : (
            displayCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlights;
