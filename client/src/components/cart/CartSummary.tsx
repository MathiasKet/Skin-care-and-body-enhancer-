import { useMemo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";

interface CartSummaryProps {
  items: {
    quantity: number;
    product: {
      price: number;
      salePrice: number | null;
    };
  }[];
  isCheckout?: boolean;
}

export const CartSummary = ({ items, isCheckout = false }: CartSummaryProps) => {
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = item.product.salePrice || item.product.price;
      return sum + price * item.quantity;
    }, 0);
  }, [items]);

  const deliveryFee = subtotal >= 200 ? 0 : 15;
  const total = subtotal + deliveryFee;

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">{isCheckout ? "Order Summary" : "Cart Summary"}</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({items.length} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery</span>
          {deliveryFee === 0 ? (
            <span className="text-green-600">Free</span>
          ) : (
            <span>{formatPrice(deliveryFee)}</span>
          )}
        </div>
        
        {subtotal > 0 && subtotal < 200 && (
          <div className="bg-primary/5 p-3 rounded-lg text-sm">
            Add <span className="font-semibold">{formatPrice(200 - subtotal)}</span> more to your cart for free delivery!
          </div>
        )}
        
        <Separator className="my-2" />
        
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
      
      {!isCheckout && (
        <div className="mt-6">
          <Link href="/checkout">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-full">
              Proceed to Checkout
            </Button>
          </Link>
          
          <div className="mt-4">
            <Link href="/categories/facial-skincare">
              <a className="text-primary hover:text-primary/80 text-sm font-medium flex justify-center">
                Continue Shopping
              </a>
            </Link>
          </div>
        </div>
      )}
      
      <div className="mt-6 flex flex-col space-y-2">
        <div className="flex items-center justify-center text-xs text-gray-500">
          <span className="mr-2">We accept:</span>
          <div className="flex space-x-2">
            <div className="bg-yellow-500 text-white px-1.5 rounded text-xs font-bold">MTN</div>
            <div className="bg-red-500 text-white px-1.5 rounded text-xs font-bold">Voda</div>
            <div className="bg-blue-500 text-white px-1.5 rounded text-xs font-bold">AirtelTigo</div>
          </div>
        </div>
        <div className="flex items-center justify-center text-xs text-gray-500">
          <span>& Bank Transfers</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
