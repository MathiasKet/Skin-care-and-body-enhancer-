import { Link } from "wouter";

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/shop/${category.slug}`}>
      <a className="category-card bg-white rounded-lg shadow overflow-hidden text-center transition duration-300">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="font-heading font-bold text-primary">{category.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{category.productCount} Products</p>
        </div>
      </a>
    </Link>
  );
};

export default CategoryCard;
