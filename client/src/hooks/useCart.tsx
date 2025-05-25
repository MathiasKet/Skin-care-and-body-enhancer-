import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { getStorageItem, setStorageItem } from "@/lib/utils";

interface CartContextType {
  sessionId: string;
  cartItemsCount: number;
  isInitialized: boolean;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateCartItemQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeCartItem: (itemId: number) => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [sessionId, setSessionId] = useState<string>("");
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize session ID from localStorage or create a new one
    const storedSessionId = getStorageItem<string>("cart_session_id", "");
    
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      // Generate a random session ID
      const newSessionId = Math.random().toString(36).substring(2, 15);
      setSessionId(newSessionId);
      setStorageItem("cart_session_id", newSessionId);
    }
    
    setIsInitialized(true);
  }, []);

  // Fetch cart data whenever sessionId changes
  useEffect(() => {
    if (!sessionId) return;
    
    const fetchCart = async () => {
      try {
        const response = await fetch(`/api/cart?sessionId=${sessionId}`, {
          credentials: "include",
        });
        
        if (response.ok) {
          const data = await response.json();
          const itemCount = data.items?.reduce((count: number, item: any) => count + item.quantity, 0) || 0;
          setCartItemsCount(itemCount);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    
    fetchCart();
  }, [sessionId]);

  const addToCart = useCallback(async (productId: number, quantity: number) => {
    if (!sessionId) return;
    
    try {
      await apiRequest("POST", "/api/cart/items", {
        sessionId,
        productId,
        quantity,
      });
      
      // Invalidate cart query to trigger refetch
      queryClient.invalidateQueries({
        queryKey: [`/api/cart?sessionId=${sessionId}`],
      });
      
      // Update cart count immediately for better UX
      setCartItemsCount(prev => prev + quantity);
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }, [sessionId]);

  const updateCartItemQuantity = useCallback(async (itemId: number, quantity: number) => {
    if (!sessionId) return;
    
    try {
      const response = await apiRequest("PATCH", `/api/cart/items/${itemId}`, {
        quantity,
      });
      
      // Invalidate cart query to trigger refetch
      queryClient.invalidateQueries({
        queryKey: [`/api/cart?sessionId=${sessionId}`],
      });
      
      // Get the previous item from cache to calculate the difference
      const previousData = queryClient.getQueryData([`/api/cart?sessionId=${sessionId}`]) as any;
      if (previousData?.items) {
        const previousItem = previousData.items.find((item: any) => item.id === itemId);
        if (previousItem) {
          const diff = quantity - previousItem.quantity;
          setCartItemsCount(prev => prev + diff);
        }
      }
      
      return response;
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  }, [sessionId]);

  const removeCartItem = useCallback(async (itemId: number) => {
    if (!sessionId) return;
    
    try {
      // Get the item quantity before removing
      const previousData = queryClient.getQueryData([`/api/cart?sessionId=${sessionId}`]) as any;
      let itemQuantity = 0;
      
      if (previousData?.items) {
        const item = previousData.items.find((item: any) => item.id === itemId);
        if (item) {
          itemQuantity = item.quantity;
        }
      }
      
      await apiRequest("DELETE", `/api/cart/items/${itemId}`, undefined);
      
      // Invalidate cart query to trigger refetch
      queryClient.invalidateQueries({
        queryKey: [`/api/cart?sessionId=${sessionId}`],
      });
      
      // Update cart count
      setCartItemsCount(prev => prev - itemQuantity);
    } catch (error) {
      console.error("Error removing cart item:", error);
      throw error;
    }
  }, [sessionId]);

  const clearCart = useCallback(() => {
    // For this demo, we'll just generate a new session ID to "clear" the cart
    const newSessionId = Math.random().toString(36).substring(2, 15);
    setSessionId(newSessionId);
    setStorageItem("cart_session_id", newSessionId);
    setCartItemsCount(0);
  }, []);

  const value = {
    sessionId,
    cartItemsCount,
    isInitialized,
    addToCart,
    updateCartItemQuantity,
    removeCartItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Wrap this provider around your App component in main.tsx
export default useCart;
