
import { mockProducts } from "@/data/mockProducts";

// Types
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isOrganic?: boolean;
  category: string;
  brand: string;
  skinConcerns: string[];
  skinTypes: string[];
}

export interface ProductFilters {
  category?: string;
  brand?: string[];
  skinType?: string[];
  skinConcern?: string[];
  minPrice?: number;
  maxPrice?: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isOrganic?: boolean;
  minRating?: number;
  searchQuery?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'rating-desc' | 'newest' | 'popular';
  limit?: number;
  page?: number;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all unique categories
export const getCategories = async (): Promise<string[]> => {
  await delay(100);
  return Array.from(new Set(mockProducts.map(p => p.category)));
};

// Get all unique brands
export const getBrands = async (): Promise<string[]> => {
  await delay(100);
  return Array.from(new Set(mockProducts.map(p => p.brand)));
};

// Get all unique skin types
export const getSkinTypes = async (): Promise<string[]> => {
  await delay(100);
  const allTypes = mockProducts.flatMap(p => p.skinTypes);
  return Array.from(new Set(allTypes));
};

// Get all unique skin concerns
export const getSkinConcerns = async (): Promise<string[]> => {
  await delay(100);
  const allConcerns = mockProducts.flatMap(p => p.skinConcerns);
  return Array.from(new Set(allConcerns));
};

// Get product by ID
export const getProductById = async (id: number | string): Promise<Product | undefined> => {
  await delay(100);
  const productId = typeof id === 'string' ? parseInt(id, 10) : id;
  return mockProducts.find(product => product.id === productId);
};

// Get best selling products
export const getBestSellingProducts = async (limit: number = 4): Promise<Product[]> => {
  await delay(200);
  return [...mockProducts]
    .filter(product => product.isBestSeller)
    .slice(0, limit);
};

// Get new arrivals
export const getNewArrivals = async (limit: number = 4): Promise<Product[]> => {
  await delay(200);
  return [...mockProducts]
    .filter(product => product.isNew)
    .slice(0, limit);
};

// Get organic products
export const getOrganicProducts = async (limit: number = 4): Promise<Product[]> => {
  await delay(200);
  return mockProducts
    .filter(product => product.isOrganic)
    .slice(0, limit);
};

// Get related products
export const getRelatedProducts = async (productId: number | string, limit: number = 4): Promise<Product[]> => {
  await delay(200);
  const product = await getProductById(productId);
  if (!product) return [];
  
  return mockProducts
    .filter(p => 
      p.id !== product.id && 
      (p.category === product.category || p.brand === product.brand)
    )
    .slice(0, limit);
};

// Main products query with advanced filtering and pagination
export const getProducts = async (filters: ProductFilters = {}): Promise<{
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}> => {
  // Simulate network delay
  await delay(300);
  
  // Start with all products
  let filteredProducts = [...mockProducts];
  
  // Apply filters
  if (filters.category) {
    filteredProducts = filteredProducts.filter(
      product => product.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }
  
  if (filters.brand && filters.brand.length > 0) {
    filteredProducts = filteredProducts.filter(
      product => filters.brand!.includes(product.brand)
    );
  }
  
  // Apply price filter
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => {
      if (filters.minPrice !== undefined && product.price < filters.minPrice!) return false;
      if (filters.maxPrice !== undefined && product.price > filters.maxPrice!) return false;
      return true;
    });
  }
  
  // Apply other filters
  if (filters.isBestSeller) {
    filteredProducts = filteredProducts.filter(product => product.isBestSeller);
  }
  
  if (filters.isNew) {
    filteredProducts = filteredProducts.filter(product => product.isNew);
  }
  
  if (filters.isOrganic) {
    filteredProducts = filteredProducts.filter(product => product.isOrganic);
  }
  
  if (filters.minRating) {
    filteredProducts = filteredProducts.filter(product => product.rating >= filters.minRating!);
  }
  
  // Apply search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
    );
  }
  
  // Apply sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        // Assuming newer products have higher IDs
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
      default: // 'featured' or default
        // Keep original order for featured
        break;
    }
  }
  
  // Apply pagination
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / limit);
  
  return {
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    totalPages,
  };
};

// Get enriched categories with additional metadata
export const getEnrichedCategories = async () => {
  await delay(200);
  const categories = await getCategories();
  return categories.map(category => ({
    id: category.toLowerCase().replace(/\s+/g, '-'),
    name: category,
    slug: category.toLowerCase().replace(/\s+/g, '-')
  }));
};

// Get enriched brands with additional metadata
export const getEnrichedBrands = async () => {
  await delay(200);
  const brands = await getBrands();
  return brands.map(brand => ({
    id: brand.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: brand,
    slug: brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }));
};

// Get enriched skin concerns with additional metadata
export const getEnrichedSkinConcerns = async () => {
  await delay(200);
  const concerns = await getSkinConcerns();
  return concerns.map(concern => ({
    id: concern.toLowerCase().replace(/\s+/g, '-'),
    name: concern,
    slug: concern.toLowerCase().replace(/\s+/g, '-')
  }));
};

// Get enriched skin types with additional metadata
export const getEnrichedSkinTypes = async () => {
  await delay(200);
  const types = await getSkinTypes();
  return types.map(type => ({
    id: type.toLowerCase().replace(/\s+/g, '-'),
    name: type,
    slug: type.toLowerCase().replace(/\s+/g, '-')
  }));
};
