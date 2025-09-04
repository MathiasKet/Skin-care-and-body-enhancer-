import { Link, useLocation } from "wouter";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter,
  SheetClose,
  SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "./CartProvider";
import { useState, useEffect } from "react";
import { 
  X, 
  ShoppingBag, 
  Minus, 
  Plus, 
  Trash2, 
  Heart, 
  Clock, 
  ArrowRight,
  ArrowLeft,
  Tag,
  Check,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CartItem, SavedItem, CartContextType } from "./CartProvider";

interface CartItemCardProps {
  item: CartItem | SavedItem;
  onRemove: (id: number) => void;
  onUpdateQuantity?: (id: number, quantity: number) => void;
  onSaveForLater?: (id: number) => void;
  onMoveToCart?: (item: SavedItem) => void;
  isSavedItem?: boolean;
}

interface CartItemProps {
  item: CartItem | SavedItem;
  onRemove: (id: number) => void;
  onUpdateQuantity?: (id: number, quantity: number) => void;
  onSaveForLater?: (id: number) => void;
  isSavedItem?: boolean;
  onMoveToCart?: (item: SavedItem) => void;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  closeCart: () => void;
}

// Type guard to check if item has quantity (is CartItem)
const isCartItem = (item: CartItem | SavedItem): item is CartItem => {
  return 'quantity' in item;
};

const CartItemCard: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity,
  onSaveForLater,
  onMoveToCart,
  isSavedItem = false,
}) => {
  const handleRemove = () => onRemove(item.id);
  const handleSaveForLater = onSaveForLater ? () => onSaveForLater(item.id) : undefined;
  const handleMoveToCart = onMoveToCart && !isCartItem(item) ? () => onMoveToCart(item) : undefined;

  // Only show quantity controls if item is a CartItem
  const showQuantityControls = 'quantity' in item && onUpdateQuantity;
  
  // Handle quantity changes safely
  const handleQuantityChange = (newQuantity: number) => {
    if (onUpdateQuantity) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };
  
  // Calculate total price safely
  const getTotalPrice = () => {
    if ('quantity' in item) {
      return (item.price * item.quantity).toFixed(2);
    }
    return item.price.toFixed(2);
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
      className="flex items-start py-4 group"
    >
      <div className="relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden bg-muted">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium text-foreground line-clamp-2">
            {item.name}
          </h4>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-primary font-bold mt-1">GH₵{item.price.toFixed(2)}</p>
        
        {!isSavedItem && isCartItem(item) && onUpdateQuantity && (
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center border rounded-md overflow-hidden">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-none px-2"
                onClick={() => handleQuantityChange(Math.max(1, item.quantity - 1))}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <div className="w-10 h-8 flex items-center justify-center border-x">
                <span className="text-sm font-medium">{item.quantity}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-none px-2"
                onClick={() => handleQuantityChange(item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="ml-auto">
              <p className="font-medium">
                GH₵{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-2 flex gap-2">
          {!isSavedItem && onSaveForLater && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-muted-foreground hover:text-foreground"
              onClick={handleSaveForLater}
            >
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              Save for later
            </Button>
          )}
          {isSavedItem && onMoveToCart && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-primary hover:text-primary/80"
              onClick={handleMoveToCart}
            >
              <ArrowRight className="h-3.5 w-3.5 mr-1.5" />
              Move to cart
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const CartSidebar = ({ isOpen, onClose, closeCart }: CartSidebarProps) => {
  const [isOpenInternal, setIsOpenInternal] = useState(isOpen);
  const [activeTab, setActiveTab] = useState<'cart' | 'saved'>('cart');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const { toast } = useToast();
  const { 
    cartItems = [], 
    savedItems = [], 
    subtotal = 0, 
    clearCart = () => {}, 
    saveForLater = () => {}, 
    moveToCart = () => {}, 
    removeFromCart = () => {}, 
    removeSavedItem = () => {},
    updateQuantity = () => {}
  } = useCart() || {};

  useEffect(() => {
    setIsOpenInternal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpenInternal(false);
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    } else {
      setIsOpenInternal(true);
    }
  };

  const applyPromoCode = () => {
    if (!promoCode.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (promoCode.toUpperCase() === 'SKINCARE10') {
        setDiscount(10); // 10% discount
        setPromoApplied(true);
        toast({
          title: 'Promo code applied!',
          description: 'Your 10% discount has been applied to your order.',
        });
      } else {
        toast({
          title: 'Invalid promo code',
          description: 'The promo code you entered is not valid.',
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    }, 1000);
  };
  
  const removePromoCode = () => {
    setPromoCode('');
    setPromoApplied(false);
    setDiscount(0);
  };
  
  const calculateTotal = () => {
    const subtotalWithDiscount = subtotal * (1 - discount / 100);
    const shipping = subtotalWithDiscount >= 100 || subtotalWithDiscount === 0 ? 0 : 10;
    return subtotalWithDiscount + shipping;
  };
  
  const [location, setLocation] = useLocation();
  
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      toast({
        title: "Order Placed!",
        description: "Your order has been placed successfully.",
      });
      closeCart();
      setIsCheckingOut(false);
      setLocation('/checkout');
    }, 1500);
  };
  
  const handleSaveForLater = (id: number) => {
    saveForLater(id);
    toast({
      title: "Saved for later",
      description: "Item has been moved to your saved items.",
    });
  };
  
  const handleMoveToCart = (item: SavedItem) => {
    moveToCart(item);
    toast({
      title: "Moved to cart",
      description: "Item has been added to your cart.",
    });
  };
  
  const handleRemoveFromCart = (id: number) => {
    removeFromCart(id);
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };
  
  const handleRemoveSavedItem = (id: number) => {
    removeSavedItem(id);
    toast({
      title: "Removed",
      description: "Item has been removed from your saved items.",
    });
  };
  
  const hasItems = (cartItems?.length ?? 0) > 0;
  const hasSavedItems = (savedItems?.length ?? 0) > 0;

  const renderCartItems = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <motion.div 
              key={i} 
              className="flex gap-4 p-4 border rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.1 }}
            >
              <div className="bg-muted animate-pulse h-24 w-24 rounded-md" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-muted rounded w-1/4 animate-pulse" />
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-8 w-8 bg-muted rounded-md animate-pulse" />
                  <div className="h-8 w-8 bg-muted rounded-md animate-pulse" />
                  <div className="h-8 w-8 bg-muted rounded-md animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );
    }

    if (!hasItems) {
      return (
        <motion.div 
          className="flex flex-col items-center justify-center py-12 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground text-center mb-6 max-w-[280px]">
            Looks like you haven't added any products to your cart yet.
          </p>
          <SheetClose asChild>
            <Button onClick={onClose} className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Continue Shopping
            </Button>
          </SheetClose>
        </motion.div>
      );
    }

    return (
      <div className="p-6">
        <AnimatePresence>
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
              className="border-b last:border-b-0"
            >
              <CartItemCard
                item={item}
                onRemove={handleRemoveFromCart}
                onUpdateQuantity={updateQuantity}
                onSaveForLater={handleSaveForLater}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  };

  const renderSavedItems = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4 p-4 border rounded-lg">
              <div className="bg-muted animate-pulse h-24 w-24 rounded-md" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-muted rounded w-1/4 animate-pulse" />
                <div className="h-8 w-24 bg-muted rounded-md animate-pulse mt-2" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (!savedItems || savedItems.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <Heart className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No saved items</h3>
          <p className="text-muted-foreground text-center mb-6 max-w-[280px]">
            You don't have any saved items yet.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setActiveTab('cart')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <AnimatePresence>
          {savedItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
              className="border-b last:border-b-0"
            >
              <CartItemCard
                item={item}
                onRemove={handleRemoveSavedItem}
                onMoveToCart={handleMoveToCart}
                isSavedItem={true}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">
              {activeTab === 'cart' ? 'Your Cart' : 'Saved Items'}
            </SheetTitle>
            <button 
              onClick={handleClose}
              className="rounded-full p-1.5 hover:bg-accent transition-colors"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b -mx-6 px-6 mt-4">
            <button
              className={`flex-1 py-3 font-medium text-sm ${activeTab === 'cart' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('cart')}
            >
              Cart {hasItems && `(${cartItems.reduce((acc, item) => acc + (isCartItem(item) ? item.quantity : 0), 0)})`}
            </button>
            <button
              className={`flex-1 py-3 font-medium text-sm ${activeTab === 'saved' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('saved')}
            >
              Saved {hasSavedItems && `(${savedItems.length})`}
            </button>
          </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'cart' ? (
            <>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex gap-4 p-4 border rounded-lg">
                      <div className="bg-muted animate-pulse h-24 w-24 rounded-md" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                        <div className="h-3 bg-muted rounded w-1/4 animate-pulse" />
                        <div className="flex items-center gap-2 pt-2">
                          <div className="h-8 w-8 bg-muted rounded-md animate-pulse" />
                          <div className="h-8 w-8 bg-muted rounded-md animate-pulse" />
                          <div className="h-8 w-8 bg-muted rounded-md animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : !hasItems ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground text-center mb-6 max-w-[280px]">
                    Looks like you haven't added any products to your cart yet.
                  </p>
                  <Button onClick={handleClose} className="gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onRemove={handleRemoveFromCart}
                      onUpdateQuantity={updateQuantity}
                      onSaveForLater={handleSaveForLater}
                    />
                  ))}
                </AnimatePresence>
              )}
            </>
          ) : (
            <div className="w-full">
              <AnimatePresence>
                {renderSavedItems()}
              </AnimatePresence>
            </div>
          )}
        </div>
            
        {activeTab === 'cart' && (
          <div className="border-t bg-muted/30">
            {/* Promo Code Section */}
            <div className="p-4 border-b">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Promo Code</span>
              </div>
              {!promoApplied ? (
                <div className="flex gap-2 mt-2">
                  <Input
                    type="text"
                    placeholder="Enter promo code"
                    className="flex-1 h-9 text-sm"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button 
                    size="sm" 
                    onClick={applyPromoCode}
                    disabled={!promoCode.trim() || isLoading}
                    className="h-9"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Apply'}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between mt-2 p-2 bg-green-50 rounded-md text-green-700 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>Promo code applied: {promoCode}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-green-700 hover:bg-green-100"
                    onClick={removePromoCode}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">GH₵{subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-GH₵{(subtotal * (discount / 100)).toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">
                  {subtotal >= 100 || subtotal === 0 ? 'Free' : 'GH₵10.00'}
                </span>
              </div>
              
              <div className="h-px bg-border my-1" />
              
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>GH₵{calculateTotal().toFixed(2)}</span>
              </div>
              
              <div className="pt-2">
                <Button 
                  className="w-full h-11 text-base font-medium"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={!hasItems || isCheckingOut}
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </Button>
                
                {hasItems && (
                  <div className="mt-3 flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-9 text-muted-foreground"
                      onClick={() => setActiveTab('saved')}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Saved Items
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-9 text-destructive hover:text-destructive/90"
                      onClick={clearCart}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear Cart
                    </Button>
                  </div>
                )}
              </div>
              
              <p className="text-xs text-muted-foreground text-center">
                or{' '}
                <button 
                  onClick={closeCart} 
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
