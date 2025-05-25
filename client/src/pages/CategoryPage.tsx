import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Category, Product } from "@shared/schema";
import ProductCard from "@/components/product/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Filter } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Helmet } from "react-helmet";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState("featured");

  const { data: category, isLoading: isLoadingCategory, error: categoryError } = useQuery<Category>({
    queryKey: [`/api/categories/${slug}`],
  });

  const { data: allProducts, isLoading: isLoadingProducts, error: productsError } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Filter products by category
  const products = allProducts?.filter(product => 
    category && product.categoryId === category.id
  );

  // Sort products based on selection
  const sortedProducts = products ? [...products] : [];
  if (sortBy === "price-low") {
    sortedProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
  } else if (sortBy === "price-high") {
    sortedProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
  } else if (sortBy === "newest") {
    // In a real app, this would sort by date
    sortedProducts.sort((a, b) => b.id - a.id);
  } else {
    // featured - show featured products first
    sortedProducts.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }

  if (categoryError || productsError) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {categoryError
              ? "Failed to load category. Please try again later."
              : "Failed to load products. Please try again later."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      {category && (
        <Helmet>
          <title>{`${category.name} - Body Enhance & Skincare Hub`}</title>
          <meta
            name="description"
            content={`Shop premium ${category.name.toLowerCase()} products at Body Enhance & Skincare Hub. Quality skincare for Ghanaian skin.`}
          />
        </Helmet>
      )}

      <div className="bg-neutral py-8 md:py-12">
        <div className="container mx-auto px-4">
          {isLoadingCategory ? (
            <div className="text-center mb-8">
              <Skeleton className="h-12 w-64 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
          ) : category ? (
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{category.name}</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {category.description || `Explore our premium collection of ${category.name.toLowerCase()} products curated specifically for Ghanaian skin.`}
              </p>
            </div>
          ) : (
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Category Not Found</h1>
              <p className="text-gray-600">The category you are looking for does not exist.</p>
            </div>
          )}

          {/* Filters and Sorting */}
          {category && (
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <Filter className="mr-2 h-5 w-5 text-gray-500" />
                <span className="text-gray-700 font-medium">Filter:</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 mr-2">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <Skeleton className="w-full h-64" />
                  <div className="p-4">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-6 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4 mb-3" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-9 w-9 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
