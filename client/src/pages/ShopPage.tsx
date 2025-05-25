import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import ProductCard from "@/components/shop/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const ShopPage = () => {
  const params = useParams();
  const [location] = useLocation();
  const [filters, setFilters] = useState({
    category: params.category || "",
    price: [0, 500],
    brand: [] as string[],
    skinConcern: [] as string[],
    skinType: [] as string[],
    sort: "featured"
  });
  
  // Extract search params from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.split('?')[1]);
    const search = searchParams.get('search');
    const sale = searchParams.get('sale');
    const newArrival = searchParams.get('new');
    const sort = searchParams.get('sort');
    
    if (search || sale || newArrival || sort) {
      // Update filters based on URL params
      setFilters(prev => ({
        ...prev,
        search: search || undefined,
        sale: sale === 'true',
        new: newArrival === 'true',
        sort: sort || prev.sort
      }));
    }
  }, [location]);
  
  // Update category from URL params
  useEffect(() => {
    if (params.category) {
      setFilters(prev => ({
        ...prev,
        category: params.category
      }));
    }
  }, [params.category]);
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products', filters],
  });
  
  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
  });
  
  const { data: brands } = useQuery({
    queryKey: ['/api/brands'],
  });
  
  const { data: skinConcerns } = useQuery({
    queryKey: ['/api/skin-concerns'],
  });
  
  const { data: skinTypes } = useQuery({
    queryKey: ['/api/skin-types'],
  });
  
  const handleSortChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      sort: value
    }));
  };
  
  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      price: value
    }));
  };
  
  const handleCheckboxChange = (group: 'brand' | 'skinConcern' | 'skinType', value: string) => {
    setFilters(prev => {
      const currentValues = prev[group] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
        
      return {
        ...prev,
        [group]: newValues
      };
    });
  };
  
  const pageTitle = params.category 
    ? `${params.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} - Body Enhance & Skincare Hub`
    : "Shop All Products - Body Enhance & Skincare Hub";
  
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Browse our wide selection of premium skincare and body enhancement products, specially formulated for Ghanaian skin and climate." />
      </Helmet>
      
      <div className="bg-neutral py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary font-heading mb-2">
            {params.category 
              ? params.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
              : "All Products"}
          </h1>
          <nav className="text-sm breadcrumbs">
            <ul className="flex">
              <li><a href="/" className="text-gray-500 hover:text-primary">Home</a></li>
              <li><span className="mx-2">/</span></li>
              <li><a href="/shop" className="text-gray-500 hover:text-primary">Shop</a></li>
              {params.category && (
                <>
                  <li><span className="mx-2">/</span></li>
                  <li className="text-primary font-medium">
                    {params.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar/Filters - Mobile toggle on small screens */}
          <div className="w-full md:w-1/4 lg:w-1/5">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4 md:hidden">
                <h3 className="font-bold">Filters</h3>
                <Button variant="ghost" size="sm">
                  <i className="fas fa-sliders-h"></i>
                </Button>
              </div>
              
              <div className="hidden md:block">
                <h3 className="font-bold mb-4">Filters</h3>
                
                {/* Categories */}
                <Accordion type="single" collapsible className="mb-4">
                  <AccordionItem value="categories">
                    <AccordionTrigger className="font-medium">Categories</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {categories?.map(category => (
                          <div key={category.id} className="flex items-center">
                            <a 
                              href={`/shop/${category.slug}`}
                              className={`text-sm ${filters.category === category.slug ? 'text-primary font-medium' : 'text-gray-600'}`}
                            >
                              {category.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                {/* Price Range */}
                <Accordion type="single" collapsible className="mb-4">
                  <AccordionItem value="price">
                    <AccordionTrigger className="font-medium">Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="px-2">
                        <Slider 
                          defaultValue={[0, 500]} 
                          max={500} 
                          step={10}
                          onValueChange={handlePriceChange}
                          className="my-6"
                        />
                        <div className="flex justify-between text-sm">
                          <span>GH₵{filters.price[0]}</span>
                          <span>GH₵{filters.price[1]}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                {/* Brands */}
                <Accordion type="single" collapsible className="mb-4">
                  <AccordionItem value="brands">
                    <AccordionTrigger className="font-medium">Brands</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {brands?.map(brand => (
                          <div key={brand.id} className="flex items-center">
                            <Checkbox 
                              id={`brand-${brand.id}`}
                              checked={(filters.brand as string[]).includes(brand.slug)}
                              onCheckedChange={() => handleCheckboxChange('brand', brand.slug)}
                              className="mr-2"
                            />
                            <label htmlFor={`brand-${brand.id}`} className="text-sm text-gray-600">
                              {brand.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                {/* Skin Concerns */}
                <Accordion type="single" collapsible className="mb-4">
                  <AccordionItem value="concerns">
                    <AccordionTrigger className="font-medium">Skin Concerns</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {skinConcerns?.map(concern => (
                          <div key={concern.id} className="flex items-center">
                            <Checkbox 
                              id={`concern-${concern.id}`}
                              checked={(filters.skinConcern as string[]).includes(concern.slug)}
                              onCheckedChange={() => handleCheckboxChange('skinConcern', concern.slug)}
                              className="mr-2"
                            />
                            <label htmlFor={`concern-${concern.id}`} className="text-sm text-gray-600">
                              {concern.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                {/* Skin Types */}
                <Accordion type="single" collapsible className="mb-4">
                  <AccordionItem value="types">
                    <AccordionTrigger className="font-medium">Skin Types</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {skinTypes?.map(type => (
                          <div key={type.id} className="flex items-center">
                            <Checkbox 
                              id={`type-${type.id}`}
                              checked={(filters.skinType as string[]).includes(type.slug)}
                              onCheckedChange={() => handleCheckboxChange('skinType', type.slug)}
                              className="mr-2"
                            />
                            <label htmlFor={`type-${type.id}`} className="text-sm text-gray-600">
                              {type.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="text-gray-600 mb-4 sm:mb-0">
                  Showing {products?.length || 0} products
                </p>
                
                <div className="flex items-center">
                  <label className="mr-2 text-gray-600">Sort by:</label>
                  <Select defaultValue={filters.sort} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="best-selling">Best Selling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {isLoading ? (
                Array(8).fill(0).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Skeleton className="w-full h-64" />
                    <div className="p-4">
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-5 w-48 mb-2" />
                      <Skeleton className="h-4 w-32 mb-2" />
                      <div className="flex justify-between">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))
              ) : products?.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                  <p className="text-gray-500">Try adjusting your filters or search criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
