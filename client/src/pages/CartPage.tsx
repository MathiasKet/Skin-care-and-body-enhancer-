import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet";
import { useCart } from "@/components/cart/CartProvider";
import { useToast } from "@/hooks/use-toast";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const { toast } = useToast();
  
  const handleCouponApply = () => {
    if (!couponCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a coupon code",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Coupon applied",
      description: "Your coupon has been applied to your order."
    });
  };
  
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };
  
  return (
    <>
      <Helmet>
        <title>Shopping Cart - Body Enhance & Skincare Hub</title>
        <meta name="description" content="Review and manage the items in your shopping cart before proceeding to checkout." />
      </Helmet>
      
      <div className="bg-neutral py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary font-heading">Shopping Cart</h1>
          <nav className="text-sm breadcrumbs">
            <ul className="flex">
              <li><a href="/" className="text-gray-500 hover:text-primary">Home</a></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-primary font-medium">Cart</li>
            </ul>
          </nav>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <i className="fas fa-shopping-cart text-5xl text-gray-300 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link href="/shop">
              <a className="btn-primary">
                <i className="fas fa-shopping-bag mr-2"></i>
                Continue Shopping
              </a>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-bold text-gray-800">Cart Items ({cartItems.length})</h2>
                </div>
                
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 flex flex-col sm:flex-row items-center">
                      <div className="sm:w-24 h-24 mb-4 sm:mb-0 sm:mr-6">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      
                      <div className="flex-grow mb-4 sm:mb-0">
                        <Link href={`/product/${item.id}`}>
                          <a className="text-lg font-medium text-gray-800 hover:text-primary transition">
                            {item.name}
                          </a>
                        </Link>
                        <p className="text-primary font-bold">GH₵{item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center sm:mr-6">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                        >
                          <i className="fas fa-minus text-xs"></i>
                        </button>
                        <span className="mx-3">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                        >
                          <i className="fas fa-plus text-xs"></i>
                        </button>
                      </div>
                      
                      <div className="text-right sm:w-24">
                        <p className="font-bold text-gray-800">GH₵{(item.price * item.quantity).toFixed(2)}</p>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm mt-1"
                        >
                          <i className="fas fa-trash-alt mr-1"></i> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <Link href="/shop">
                    <a className="text-primary hover:text-primary-dark font-medium inline-flex items-center">
                      <i className="fas fa-arrow-left mr-2"></i> Continue Shopping
                    </a>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="border-gray-300 text-gray-600 hover:bg-gray-100"
                    onClick={() => window.location.reload()}
                  >
                    <i className="fas fa-sync-alt mr-2"></i> Update Cart
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>GH₵{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>{subtotal >= 200 ? 'Free' : 'GH₵15.00'}</span>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg border-t border-dashed pt-2 mt-2">
                    <span>Total</span>
                    <span>GH₵{(subtotal + (subtotal >= 200 ? 0 : 15)).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="p-4 bg-neutral">
                  <Link href="/checkout">
                    <a className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-flex items-center justify-center w-full">
                      Proceed to Checkout
                    </a>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-bold text-gray-800">Apply Coupon</h2>
                </div>
                
                <div className="p-4">
                  <div className="flex gap-2">
                    <Input 
                      type="text" 
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-grow"
                    />
                    <Button onClick={handleCouponApply}>Apply</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
