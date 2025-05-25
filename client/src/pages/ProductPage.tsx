import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Product, Review } from "@shared/schema";
import ProductDetail from "@/components/product/ProductDetail";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Helmet } from "react-helmet";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: product, isLoading: isLoadingProduct, error: productError } = useQuery<Product>({
    queryKey: [`/api/products/${slug}`],
  });

  const { data: reviews, isLoading: isLoadingReviews } = useQuery<Review[]>({
    queryKey: [`/api/products/${product?.id}/reviews`],
    enabled: !!product?.id,
  });

  if (productError) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load product. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoadingProduct) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-[500px] w-full rounded-xl" />
          <div>
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-6" />
            <Skeleton className="h-5 w-1/3 mb-8" />
            <Skeleton className="h-24 w-full mb-6" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Product Not Found</AlertTitle>
          <AlertDescription>
            The product you are looking for does not exist or has been removed.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${product.name} - Body Enhance & Skincare Hub`}</title>
        <meta
          name="description"
          content={`${product.description.substring(0, 160)}. Premium skincare products for Ghanaian skin.`}
        />
      </Helmet>

      <ProductDetail product={product} reviews={reviews || []} isLoadingReviews={isLoadingReviews} />
    </>
  );
};

export default ProductPage;
