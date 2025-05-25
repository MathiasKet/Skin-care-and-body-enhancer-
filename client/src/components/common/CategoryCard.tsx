import { Link } from "wouter";
import { Category } from "@shared/schema";
import { ChevronRight } from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div className="category-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300">
      <img
        src={category.imageUrl}
        alt={category.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="font-serif font-semibold text-lg mb-1">{category.name}</h3>
        <p className="text-gray-500 text-sm mb-3">{category.description}</p>
        <Link href={`/categories/${category.slug}`} className="text-primary hover:text-primary/80 text-sm font-medium flex items-center justify-center">
          Shop Collection
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
