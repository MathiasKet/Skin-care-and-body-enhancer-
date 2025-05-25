import { Link } from "wouter";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "./CartProvider";
import { useState } from "react";

export const CartSidebar = () => {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity,
    subtotal 
  } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-2xl font-bold text-primary">Your Cart</SheetTitle>
        </SheetHeader>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <i className="fas fa-shopping-bag text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Button onClick={closeCart} className="btn-primary">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="py-4 flex flex-col h-full">
            <div className="flex-grow overflow-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start py-4 border-b">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded mr-4"
                  />
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-primary font-bold">GH₵{item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                        disabled={item.quantity <= 1}
                      >
                        <i className="fas fa-minus text-xs"></i>
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                      >
                        <i className="fas fa-plus text-xs"></i>
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-accent"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="border-t mt-auto pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold text-primary">GH₵{subtotal.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">Shipping and taxes calculated at checkout</p>
              <div className="grid gap-2">
                <Button 
                  asChild
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-full"
                  onClick={closeCart}
                >
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary-light hover:text-white py-3 rounded-full"
                  onClick={closeCart}
                >
                  <Link href="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
