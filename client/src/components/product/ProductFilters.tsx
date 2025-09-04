import { Fragment, useEffect, useState } from 'react';
import { ProductFilters as Filters } from '@/types';

interface ProductFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  availableCategories: string[];
  availableBrands: string[];
  availableSkinTypes: string[];
  availableSkinConcerns: string[];
  minPrice: number;
  maxPrice: number;
}

const ProductFilters = ({
  filters,
  onFilterChange,
  availableCategories,
  availableBrands,
  availableSkinTypes,
  availableSkinConcerns,
  minPrice,
  maxPrice,
}: ProductFiltersProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice || minPrice,
    filters.maxPrice || maxPrice,
  ]);

  const handleFilterChange = (key: keyof Filters, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPriceRange = [...priceRange] as [number, number];
    newPriceRange[index] = Number(e.target.value);
    setPriceRange(newPriceRange);
  };

  const handlePriceChangeComplete = () => {
    onFilterChange({
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const toggleArrayItem = (array: string[] = [], value: string) => {
    return array.includes(value)
      ? array.filter((item) => item !== value)
      : [...array, value];
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      {/* Search */}
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
          Search
        </label>
        <input
          type="text"
          id="search"
          value={filters.searchQuery || ''}
          onChange={(e) => handleFilterChange('searchQuery', e.target.value || undefined)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          placeholder="Search products..."
        />
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium text-gray-900">Categories</h3>
        <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
          {availableCategories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category}`}
                checked={filters.category === category}
                onChange={() =>
                  handleFilterChange(
                    'category',
                    filters.category === category ? undefined : category
                  )
                }
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor={`category-${category}`}
                className="ml-3 text-sm text-gray-600"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-sm font-medium text-gray-900">Brands</h3>
        <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
          {availableBrands.map((brand) => (
            <div key={brand} className="flex items-center">
              <input
                type="checkbox"
                id={`brand-${brand}`}
                checked={filters.brand?.includes(brand) || false}
                onChange={() =>
                  handleFilterChange(
                    'brand',
                    toggleArrayItem(filters.brand, brand)
                  )
                }
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor={`brand-${brand}`}
                className="ml-3 text-sm text-gray-600"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
        <div className="mt-4 space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="minPrice" className="block text-xs text-gray-500">Min</label>
              <input
                type="number"
                id="minPrice"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                onBlur={handlePriceChangeComplete}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1 border"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="maxPrice" className="block text-xs text-gray-500">Max</label>
              <input
                type="number"
                id="maxPrice"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                onBlur={handlePriceChangeComplete}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1 border"
              />
            </div>
          </div>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
            onMouseUp={handlePriceChangeComplete}
            onTouchEnd={handlePriceChangeComplete}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Additional Filters */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Other Filters</h3>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="bestseller"
            checked={filters.isBestSeller || false}
            onChange={(e) =>
              handleFilterChange('isBestSeller', e.target.checked || undefined)
            }
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="bestseller" className="ml-3 text-sm text-gray-600">
            Best Sellers Only
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="new"
            checked={filters.isNew || false}
            onChange={(e) =>
              handleFilterChange('isNew', e.target.checked || undefined)
            }
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="new" className="ml-3 text-sm text-gray-600">
            New Arrivals
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="organic"
            checked={filters.isOrganic || false}
            onChange={(e) =>
              handleFilterChange('isOrganic', e.target.checked || undefined)
            }
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="organic" className="ml-3 text-sm text-gray-600">
            Organic Only
          </label>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-sm font-medium text-gray-900">Minimum Rating</h3>
        <div className="mt-2 space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <input
                type="radio"
                id={`rating-${rating}`}
                name="rating"
                checked={filters.minRating === rating}
                onChange={() =>
                  handleFilterChange(
                    'minRating',
                    filters.minRating === rating ? undefined : rating
                  )
                }
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor={`rating-${rating}`}
                className="ml-3 flex items-center text-sm text-gray-600"
              >
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1">& Up</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
          Sort By
        </label>
        <select
          id="sort"
          value={filters.sortBy || ''}
          onChange={(e) =>
            handleFilterChange('sortBy', e.target.value as any || undefined)
          }
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Top Rated</option>
          <option value="newest">Newest Arrivals</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Clear Filters */}
      <button
        type="button"
        onClick={() => {
          setPriceRange([minPrice, maxPrice]);
          onFilterChange({
            page: 1,
            limit: 12,
          });
        }}
        className="w-full mt-4 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ProductFilters;
