import { useState } from "react";
import { Link } from "wouter";
import { Trash, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

interface CartItemProps {
  item: {
    id: number;
    quantity: number;
    product: {
      id: number;
      name: string;
      slug: string;
      price: number;
      salePrice: number | null;
      imageUrl: string;
      description: string;
    };
  };
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateCartItemQuantity, removeCartItem } = useCart();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 99) return;
    
    setIsUpdating(true);
    await updateCartItemQuantity(item.id, newQuantity);
    setIsUpdating(false);
    
    toast({
      title: "Cart updated",
      description: `${item.product.name} quantity updated to ${newQuantity}`,
    });
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    await removeCartItem(item.id);
    setIsRemoving(false);
    
    toast({
      title: "Item removed",
      description: `${item.product.name} has been removed from your cart`,
    });
  };

  const price = item.product.salePrice || item.product.price;
  const itemTotal = price * item.quantity;

  return (
    <div className="border-b border-gray-100 py-6">
      <div className="flex gap-4">
        {/* Product Image */}
        <Link href={`/products/${item.product.slug}`}>
          <a className="flex-shrink-0">
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded-md"
            />
          </a>
        </Link>

        {/* Product Info */}
        <div className="flex-1">
          <Link href={`/products/${item.product.slug}`}>
            <a className="font-medium text-lg hover:text-primary">{item.product.name}</a>
          </Link>
          <p className="text-gray-500 text-sm mb-2">
            {item.product.description.length > 60
              ? item.product.description.substring(0, 60) + "..."
              : item.product.description}
          </p>
          
          {/* Price */}
          <div className="flex items-center">
            <span className="font-medium">
              {formatPrice(item.product.salePrice || item.product.price)}
            </span>
            {item.product.salePrice && (
              <span className="text-gray-400 text-sm line-through ml-2">
                {formatPrice(item.product.price)}
              </span>
            )}
          </div>
        </div>

        {/* Quantity and Actions */}
        <div className="flex flex-col items-end justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-200 rounded-full">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1 || isUpdating}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Item Total */}
          <span className="font-semibold">{formatPrice(itemTotal)}</span>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-0 h-auto"
            onClick={handleRemove}
            disabled={isRemoving}
          >
            <Trash className="h-4 w-4 mr-1" />
            <span className="text-xs">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
