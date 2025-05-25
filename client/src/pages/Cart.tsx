import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCart } from "@/hooks/useCart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, ShoppingBag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const Cart = () => {
  const { sessionId, isInitialized } = useCart();

  const { data, isLoading, error } = useQuery({
    queryKey: [`/api/cart?sessionId=${sessionId}`],
    enabled: isInitialized && !!sessionId,
  });

  // Early return if cart is still initializing
  if (!isInitialized) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Your Shopping Cart</h1>
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Your Shopping Cart</h1>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load your cart. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Your Shopping Cart - Body Enhance & Skincare Hub</title>
        <meta name="description" content="Review and checkout your selected skincare and body enhancement products from Body Enhance & Skincare Hub." />
      </Helmet>

      <div className="bg-neutral py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Your Shopping Cart</h1>

            {isLoading ? (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <Skeleton className="h-6 w-32 mb-4" />
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="border-b border-gray-100 py-6">
                        <div className="flex gap-4">
                          <Skeleton className="h-24 w-24 rounded" />
                          <div className="flex-1">
                            <Skeleton className="h-5 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2 mb-4" />
                            <Skeleton className="h-6 w-20" />
                          </div>
                          <div className="flex flex-col items-end gap-4">
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-5 w-16" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-full md:w-80">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <Skeleton className="h-64 w-full rounded" />
                  </div>
                </div>
              </div>
            ) : data?.items?.length > 0 ? (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <h2 className="text-xl font-medium mb-4">Cart Items</h2>
                    {data.items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                  <div className="w-full md:w-80">
                    <CartSummary items={data.items} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-10 text-center">
                <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-serif font-bold mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">
                  Looks like you haven't added any products to your cart yet.
                </p>
                <Link href="/categories/facial-skincare">
                  <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-2 rounded-full">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
