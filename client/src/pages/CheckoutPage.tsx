import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/components/cart/CartProvider";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Helmet } from "react-helmet";

const formSchema = z.object({
  customerName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  customerEmail: z.string().email({ message: "Invalid email address" }),
  customerPhone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  shippingAddress: z.string().min(5, { message: "Address must be at least 5 characters" }),
  shippingCity: z.string().min(2, { message: "City must be at least 2 characters" }),
  shippingRegion: z.string().min(2, { message: "Region must be at least 2 characters" }),
  paymentMethod: z.enum(["momo-mtn", "momo-vodafone", "momo-airteltigo", "bank-transfer", "card", "cash-on-delivery"]),
  notes: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const CheckoutPage = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Shipping fee calculation
  const shippingFee = subtotal >= 200 ? 0 : 15;
  const total = subtotal + shippingFee;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      shippingAddress: "",
      shippingCity: "",
      shippingRegion: "",
      paymentMethod: "momo-mtn",
      notes: ""
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create order object
      const order = {
        orderNumber: `ORD-${Date.now()}`,
        total,
        shippingFee,
        discount: 0,
        status: "pending",
        paymentStatus: "pending",
        ...data
      };
      
      // Create order items
      const items = cartItems.map(item => ({
        productId: item.id,
        productName: item.name,
        productPrice: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity
      }));
      
      // Submit order to API
      await apiRequest("POST", "/api/orders", { order, items });
      
      // Clear cart
      clearCart();
      
      // Show success message
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your order. We will process it shortly."
      });
      
      // Redirect to thank you page (or home page for now)
      navigate("/");
    } catch (error) {
      console.error("Failed to place order:", error);
      toast({
        title: "Failed to place order",
        description: "An error occurred while placing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <i className="fas fa-shopping-cart text-5xl text-gray-300 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">You need to add items to your cart before checking out.</p>
          <Button 
            onClick={() => navigate("/shop")}
            className="btn-primary"
          >
            <i className="fas fa-shopping-bag mr-2"></i>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Checkout - Body Enhance & Skincare Hub</title>
        <meta name="description" content="Complete your purchase securely with multiple payment options. Free delivery on orders above GH₵200." />
      </Helmet>
      
      <div className="bg-neutral py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary font-heading">Checkout</h1>
          <nav className="text-sm breadcrumbs">
            <ul className="flex">
              <li><a href="/" className="text-gray-500 hover:text-primary">Home</a></li>
              <li><span className="mx-2">/</span></li>
              <li><a href="/cart" className="text-gray-500 hover:text-primary">Cart</a></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-primary font-medium">Checkout</li>
            </ul>
          </nav>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">Shipping Information</h2>
              </div>
              
              <div className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="customerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="customerEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="customerPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="shippingRegion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Region</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your region" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="greater-accra">Greater Accra</SelectItem>
                                <SelectItem value="ashanti">Ashanti</SelectItem>
                                <SelectItem value="western">Western</SelectItem>
                                <SelectItem value="eastern">Eastern</SelectItem>
                                <SelectItem value="central">Central</SelectItem>
                                <SelectItem value="volta">Volta</SelectItem>
                                <SelectItem value="northern">Northern</SelectItem>
                                <SelectItem value="upper-east">Upper East</SelectItem>
                                <SelectItem value="upper-west">Upper West</SelectItem>
                                <SelectItem value="bono">Bono</SelectItem>
                                <SelectItem value="bono-east">Bono East</SelectItem>
                                <SelectItem value="ahafo">Ahafo</SelectItem>
                                <SelectItem value="savannah">Savannah</SelectItem>
                                <SelectItem value="north-east">North East</SelectItem>
                                <SelectItem value="oti">Oti</SelectItem>
                                <SelectItem value="western-north">Western North</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="shippingCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your city" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="col-span-1 md:col-span-2">
                        <FormField
                          control={form.control}
                          name="shippingAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Address</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter your complete address" 
                                  {...field} 
                                  className="min-h-[80px]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                      
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="momo-mtn" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    <span className="flex items-center">
                                      <i className="fas fa-mobile-alt text-yellow-500 mr-2"></i>
                                      MTN Mobile Money
                                    </span>
                                  </FormLabel>
                                </FormItem>
                                
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="momo-vodafone" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    <span className="flex items-center">
                                      <i className="fas fa-mobile-alt text-red-500 mr-2"></i>
                                      Vodafone Cash
                                    </span>
                                  </FormLabel>
                                </FormItem>
                                
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="momo-airteltigo" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    <span className="flex items-center">
                                      <i className="fas fa-mobile-alt text-blue-500 mr-2"></i>
                                      AirtelTigo Money
                                    </span>
                                  </FormLabel>
                                </FormItem>
                                
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="bank-transfer" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    <span className="flex items-center">
                                      <i className="fas fa-university mr-2"></i>
                                      Bank Transfer
                                    </span>
                                  </FormLabel>
                                </FormItem>
                                
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="card" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    <span className="flex items-center">
                                      <i className="fas fa-credit-card mr-2"></i>
                                      Credit/Debit Card
                                    </span>
                                  </FormLabel>
                                </FormItem>
                                
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="cash-on-delivery" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    <span className="flex items-center">
                                      <i className="fas fa-money-bill-wave mr-2"></i>
                                      Cash on Delivery (Accra only)
                                    </span>
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div>
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Order Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any special instructions for delivery?" 
                                {...field} 
                                className="min-h-[80px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
              </div>
              
              <div className="p-4">
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-3 flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">GH₵{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>GH₵{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? 'Free' : `GH₵${shippingFee.toFixed(2)}`}</span>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg border-t border-dashed pt-2 mt-2">
                    <span>Total</span>
                    <span>GH₵{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-neutral">
                <Button 
                  type="submit"
                  onClick={form.handleSubmit(onSubmit)}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-full transition duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Processing...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </Button>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">By placing your order, you agree to our</p>
                  <div className="flex justify-center space-x-2 text-sm mt-1">
                    <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
                    <span>and</span>
                    <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">Secure Checkout</h2>
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <i className="fas fa-lock text-green-500 mr-2"></i>
                  <p className="text-sm">Your payment information is secure</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm">Payment Methods:</p>
                  <div className="flex space-x-2">
                    <i className="fab fa-cc-visa text-blue-700"></i>
                    <i className="fab fa-cc-mastercard text-red-500"></i>
                    <i className="fab fa-cc-paypal text-blue-500"></i>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">Need Help?</h2>
              </div>
              
              <div className="p-4">
                <p className="text-sm mb-3">Have questions about your order?</p>
                <div className="flex items-center mb-2">
                  <i className="fas fa-phone-alt text-primary mr-2"></i>
                  <span>+233 (0) 302 123 456</span>
                </div>
                <div className="flex items-center mb-2">
                  <i className="fas fa-envelope text-primary mr-2"></i>
                  <span>hello@bodyenhancehub.com</span>
                </div>
                <div className="flex items-center">
                  <i className="fab fa-whatsapp text-green-500 mr-2"></i>
                  <span>WhatsApp Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
