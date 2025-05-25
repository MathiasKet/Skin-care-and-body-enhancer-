import { useQuery } from "@tanstack/react-query";
import CategoryCard from "../shop/CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryHighlights = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['/api/categories'],
  });
  
  // Fallback categories if API fails
  const fallbackCategories = [
    {
      id: 1,
      name: "Facial Skincare",
      slug: "facial-skincare",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      productCount: 25
    },
    {
      id: 2,
      name: "Body Enhancement",
      slug: "body-enhancement",
      image: "https://pixabay.com/get/gac378c92cdcf10394f269cb5c5b06a49b937d690152c19378719827e4225f69f3f960a01b0d9ed6694151589b0554394e22b543d9f55c16a58a5539880cb322f_1280.jpg",
      productCount: 18
    },
    {
      id: 3,
      name: "Specialized Treatments",
      slug: "specialized-treatments",
      image: "https://pixabay.com/get/g637c0bde2eee2b052478a9b77bd5ce6c33224266930c14944df191cbe67a1f20b8e0f44e6fdfabd5d0f1797dded68d7c0583997e677ca2aced7358c9f6c06948_1280.jpg",
      productCount: 32
    },
    {
      id: 4,
      name: "Men's Grooming",
      slug: "mens-grooming",
      image: "https://pixabay.com/get/g84d47ed44a6fbf08d7d7c213440d5e3234fa053e6f4b323dd95a925311e2ec59d8afd54e3883641df2ade146b5dcf60cb808b1ceab488c8f25cc5570ac5434e6_1280.jpg",
      productCount: 15
    },
    {
      id: 5,
      name: "Natural & Organic",
      slug: "natural-organic",
      image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
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
