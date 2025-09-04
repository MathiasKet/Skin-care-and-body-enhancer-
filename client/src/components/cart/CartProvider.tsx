import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  sku?: string;
  brand?: string;
  slug?: string;
}

export interface SavedItem extends Omit<CartItem, 'quantity'> {
  savedAt: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  savedItems: SavedItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  saveForLater: (id: number) => void;
  moveToCart: (item: SavedItem) => void;
  removeSavedItem: (id: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Load cart and saved items from localStorage on initial render
  useEffect(() => {
    const loadFromLocalStorage = () => {
      try {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
        
        const savedForLater = localStorage.getItem("savedItems");
        if (savedForLater) {
          setSavedItems(JSON.parse(savedForLater));
        }
      } catch (error) {
        console.error("Failed to load cart/saved items from localStorage:", error);
        // Reset to empty arrays if there's an error
        setCartItems([]);
        setSavedItems([]);
      }
    };
    
    loadFromLocalStorage();
  }, []);
  
  // Save cart and saved items to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      localStorage.setItem("savedItems", JSON.stringify(savedItems));
    } catch (error) {
      console.error("Failed to save cart/saved items to localStorage:", error);
    }
  }, [cartItems, savedItems]);
  
  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + quantity } 
            : i
        );
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
    
    // Remove from saved items if it was there
    setSavedItems(prev => prev.filter(i => i.id !== item.id));
    
    openCart();
  };
  
  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const saveForLater = (id: number) => {
    const itemToSave = cartItems.find(item => item.id === id);
    if (!itemToSave) return;

    setCartItems(prev => prev.filter(item => item.id !== id));
    
    // Don't add duplicate saved items
    setSavedItems(prev => {
      const alreadyExists = prev.some(item => item.id === id);
      if (alreadyExists) return prev;
      
      const { quantity, ...savedItem } = itemToSave;
      return [...prev, { ...savedItem, savedAt: new Date().toISOString() }];
    });
  };

  const moveToCart = (savedItem: SavedItem) => {
    setSavedItems(prev => prev.filter(item => item.id !== savedItem.id));
    addToCart(savedItem, 1);
  };

  const removeSavedItem = (id: number) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };
  
  const openCart = () => {
    setIsCartOpen(true);
  };
  
  const closeCart = () => {
    setIsCartOpen(false);
  };
  
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
  const itemCount = cartItems.reduce(
    (total, item) => total + item.quantity, 
    0
  );
  
  return (
    <CartContext.Provider value={{
      cartItems,
      savedItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      saveForLater,
      moveToCart,
      removeSavedItem,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      subtotal,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
