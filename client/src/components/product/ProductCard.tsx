import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const [imageSrc, setImageSrc] = useState(product.image);

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100">
          <img
            src={imageSrc}
            alt={product.name}
            className="h-64 w-full object-cover object-center group-hover:opacity-90 transition-opacity"
            onError={() => {
              console.log('Product image failed to load, using fallback');
              setImageSrc('/favicon.jpg');
            }}
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
              {product.name}
            </h3>
            {product.isBestSeller && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Best Seller
              </span>
            )}
          </div>
          <div className="mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-xs text-gray-500">
                ({product.reviewCount})
              </span>
            </div>
            <div className="mt-2 flex items-center">
              <p className="text-lg font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </p>
              {hasDiscount && (
                <p className="ml-2 text-sm text-gray-500 line-through">
                  ${product.originalPrice?.toFixed(2)}
                </p>
              )}
              {hasDiscount && (
                <span className="ml-2 text-sm font-medium text-green-600">
                  {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% off
                </span>
              )}
            </div>
            {product.isNew && (
              <span className="mt-2 inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                New Arrival
              </span>
            )}
            {product.isOrganic && (
              <span className="mt-1 block text-xs text-green-600">
                Organic
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <button
          onClick={(e) => {
            e.preventDefault();
            // TODO: Add to cart functionality
          }}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
