import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { 
  getProducts, 
  getCategories, 
  getBrands, 
  getSkinTypes, 
  getSkinConcerns, 
  Product, 
  ProductFilters as Filters
} from '../api/mockApi';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  
  // Get search params
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Function to update URL with new search params
  const updateSearchParams = useCallback((updates: Record<string, string | string[] | boolean | undefined | null>) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          newParams.set(key, value.join(','));
        } else {
          newParams.delete(key);
        }
      } else if (typeof value === 'boolean') {
        newParams.set(key, String(value));
      } else {
        newParams.set(key, value);
      }
    });
    
    // Update the URL with the new params
    const newSearch = newParams.toString();
    const currentSearch = location.search ? location.search.slice(1) : '';
    
    // Only update if the search params have changed
    if (newSearch !== currentSearch) {
      setSearchParams(newParams, { replace: true });
    }
  }, [location, searchParams, setSearchParams]);
  
  const [filters, setFilters] = useState<Filters>(() => ({
    category: undefined,
    brand: undefined,
    skinType: undefined,
    skinConcern: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    isBestSeller: false,
    isNew: false,
    isOrganic: false,
    minRating: undefined,
    searchQuery: undefined,
    sortBy: undefined,
    page: 1,
    limit: 12
  }));
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [availableSkinTypes, setAvailableSkinTypes] = useState<string[]>([]);
  const [availableSkinConcerns, setAvailableSkinConcerns] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  
  // Parse URL parameters into filters
  useEffect(() => {
    const newFilters: Filters = {
      category: searchParams.get('category') || undefined,
      brand: searchParams.get('brand')?.split(',').filter(Boolean) as string[] | undefined,
      skinType: searchParams.get('skinType')?.split(',').filter(Boolean) as string[] | undefined,
      skinConcern: searchParams.get('skinConcern')?.split(',').filter(Boolean) as string[] | undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      isBestSeller: searchParams.get('isBestSeller') === 'true',
      isNew: searchParams.get('isNew') === 'true',
      isOrganic: searchParams.get('isOrganic') === 'true',
      minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined,
      searchQuery: searchParams.get('searchQuery') || undefined,
      sortBy: searchParams.get('sortBy') as any,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 12,
    };
    
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  }, [location]);

  // Update URL when filters change (debounced to avoid too many updates)
  useEffect(() => {
    const handler = setTimeout(() => {
      const updates: Record<string, string | string[] | boolean | undefined | null> = {};
      
      // Type-safe iteration over filter entries
      const filterEntries = Object.entries(filters) as [keyof Filters, any][];
      filterEntries.forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          updates[key] = null;
        } else if (Array.isArray(value)) {
          updates[key] = value;
        } else if (typeof value === 'boolean') {
          updates[key] = value;
        } else {
          updates[key] = String(value);
        }
      });
      
      updateSearchParams(updates);
    }, 300);
    
    return () => clearTimeout(handler);
  }, [filters, updateSearchParams]);
  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { products, total } = await getProducts(filters);
        setProducts(products);
        setTotalProducts(total);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);
  
  // Update URL when filters change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams();
      
      // Add non-empty filter values to URL params
      Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') return;
        
        if (Array.isArray(value) && value.length > 0) {
          params.set(key, value.join(','));
        } else if (typeof value === 'boolean' && value) {
          params.set(key, 'true');
        } else if (value) {
          params.set(key, String(value));
        }
      });
      
      // Only update if the params have changed
      if (params.toString() !== searchParams.toString()) {
        setSearchParams(params, { replace: true });
      }
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [filters, searchParams, setSearchParams]);

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [categories, brands, skinTypes, skinConcerns] = await Promise.all([
          getCategories(),
          getBrands(),
          getSkinTypes(),
          getSkinConcerns(),
        ]);
        
        setAvailableCategories(categories);
        setAvailableBrands(brands);
        setAvailableSkinTypes(skinTypes);
        setAvailableSkinConcerns(skinConcerns);
        
        // Set initial price range
        if (products.length > 0) {
          const prices = products.map(p => p.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setPriceRange([minPrice, maxPrice]);
        }
      } catch (err) {
        console.error('Error fetching filter options:', err);
      }
    };

    fetchFilterOptions();
  }, [products]);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({
      ...prev,
      page,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Filters</h1>
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              availableCategories={availableCategories}
              availableBrands={availableBrands}
              availableSkinTypes={availableSkinTypes}
              availableSkinConcerns={availableSkinConcerns}
              minPrice={priceRange[0]}
              maxPrice={priceRange[1]}
            />
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {loading ? 'Loading...' : `${totalProducts} products found`}
              </h2>
              
              <div className="flex items-center
              ">
                <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={filters.sortBy || ''}
                  onChange={(e) =>
                    handleFilterChange({ sortBy: e.target.value as any || undefined })
                  }
                  className="rounded-md border-gray-300 py-1 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Top Rated</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
            
            <ProductGrid products={products} loading={loading} error={error} />
            
            {/* Pagination */}
            {!loading && totalProducts > 0 && (
              <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-8">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(Math.max(1, (filters.page || 1) - 1))}
                    disabled={(filters.page || 1) <= 1}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange((filters.page || 1) + 1)}
                    disabled={products.length < (filters.limit || 12)}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">
                        {((filters.page || 1) - 1) * (filters.limit || 12) + 1}
                      </span> to{' '}
                      <span className="font-medium">
                        {Math.min(filters.page || 1 * (filters.limit || 12), totalProducts)}
                      </span>{' '}
                      of <span className="font-medium">{totalProducts}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <button
                        onClick={() => handlePageChange(Math.max(1, (filters.page || 1) - 1))}
                        disabled={(filters.page || 1) <= 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {Array.from({ length: Math.ceil(totalProducts / (filters.limit || 12)) }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                            (filters.page || 1) === pageNum
                              ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange((filters.page || 1) + 1)}
                        disabled={products.length < (filters.limit || 12)}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductListPage;
