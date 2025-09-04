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

export interface FilterOption {
  id: string;
  name: string;
  count: number;
  checked: boolean;
}
