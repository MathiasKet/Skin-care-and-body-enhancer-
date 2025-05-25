import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CartSummary } from "@/components/cart/CartSummary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, Check, CreditCard, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Helmet } from "react-helmet";

const Checkout = () => {
  const [location, setLocation] = useLocation();
  const { sessionId, isInitialized, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    momoProvider: "mtn",
    momoNumber: "",
    notes: "",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: [`/api/cart?sessionId=${sessionId}`],
    enabled: isInitialized && !!sessionId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.region
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Mobile Money validation
    if (paymentMethod === "momo" && !formData.momoNumber) {
      toast({
        title: "Missing Mobile Money Number",
        description: "Please enter your mobile money number.",
        variant: "destructive",
      });
      return;
    }

    // Process payment (simulated)
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      
      // Clear cart and redirect to success page
      clearCart();
      
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. Your order is being processed.",
      });
      
      // In a real app, we would redirect to an order confirmation page
      setLocation("/");
    }, 2000);
  };

  // Check if the cart is empty
  const isCartEmpty = !isLoading && (!data?.items || data.items.length === 0);

  // Redirect to cart if cart is empty
  if (isCartEmpty) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Empty Cart</AlertTitle>
            <AlertDescription>
              Your cart is empty. Please add some products before proceeding to checkout.
              <div className="mt-4">
                <Button onClick={() => setLocation("/categories/facial-skincare")}>
                  Continue Shopping
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout - Body Enhance & Skincare Hub</title>
        <meta name="description" content="Complete your purchase of premium skincare products. Secure checkout with multiple payment options." />
      </Helmet>

      <div className="bg-neutral py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Checkout</h1>

            {error ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Failed to load your cart. Please try again later.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-medium mb-6">Shipping Information</h2>

                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Delivery Address *</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City/Town *</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="region">Region *</Label>
                          <Select
                            value={formData.region}
                            onValueChange={(value) => handleSelectChange("region", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a region" />
                            </SelectTrigger>
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
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <Label htmlFor="notes">Order Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          placeholder="Special delivery instructions or additional information"
                          value={formData.notes}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-6">
                        <h2 className="text-xl font-medium mb-4">Payment Method</h2>

                        <div className="space-y-4">
                          <div 
                            className={`border rounded-lg p-4 cursor-pointer ${
                              paymentMethod === "momo" ? "border-primary bg-primary/5" : "border-gray-200"
                            }`}
                            onClick={() => setPaymentMethod("momo")}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                                  paymentMethod === "momo" ? "border-primary" : "border-gray-300"
                                }`}>
                                  {paymentMethod === "momo" && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                                </div>
                                <div>
                                  <h3 className="font-medium">Mobile Money</h3>
                                  <p className="text-sm text-gray-600">Pay with MTN, Vodafone, or AirtelTigo Mobile Money</p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-white font-bold">
                                  M
                                </div>
                              </div>
                            </div>

                            {paymentMethod === "momo" && (
                              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="momoProvider">Mobile Money Provider</Label>
                                  <Select
                                    value={formData.momoProvider}
                                    onValueChange={(value) => handleSelectChange("momoProvider", value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select provider" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                                      <SelectItem value="vodafone">Vodafone Cash</SelectItem>
                                      <SelectItem value="airteltigo">AirtelTigo Money</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor="momoNumber">Mobile Money Number</Label>
                                  <Input
                                    id="momoNumber"
                                    name="momoNumber"
                                    value={formData.momoNumber}
                                    onChange={handleChange}
                                    placeholder="e.g. 0241234567"
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          <div 
                            className={`border rounded-lg p-4 cursor-pointer ${
                              paymentMethod === "card" ? "border-primary bg-primary/5" : "border-gray-200"
                            }`}
                            onClick={() => setPaymentMethod("card")}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                                  paymentMethod === "card" ? "border-primary" : "border-gray-300"
                                }`}>
                                  {paymentMethod === "card" && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                                </div>
                                <div>
                                  <h3 className="font-medium">Credit/Debit Card</h3>
                                  <p className="text-sm text-gray-600">Pay with Visa, Mastercard, or other cards</p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <CreditCard className="h-6 w-6 text-gray-400" />
                              </div>
                            </div>

                            {paymentMethod === "card" && (
                              <div className="mt-4 border border-gray-200 rounded p-4 bg-gray-50">
                                <p className="text-center text-gray-600">
                                  Credit card payment is not available in this demo. Please use Mobile Money option.
                                </p>
                              </div>
                            )}
                          </div>

                          <div 
                            className={`border rounded-lg p-4 cursor-pointer ${
                              paymentMethod === "cash" ? "border-primary bg-primary/5" : "border-gray-200"
                            }`}
                            onClick={() => setPaymentMethod("cash")}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                                  paymentMethod === "cash" ? "border-primary" : "border-gray-300"
                                }`}>
                                  {paymentMethod === "cash" && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                                </div>
                                <div>
                                  <h3 className="font-medium">Cash on Delivery</h3>
                                  <p className="text-sm text-gray-600">Pay when your order is delivered</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <Button
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-full"
                          disabled={isProcessing}
                        >
                          {isProcessing ? "Processing..." : "Place Order"}
                        </Button>
                        
                        <div className="flex items-center justify-center mt-4 text-gray-600 text-sm">
                          <ShieldCheck className="h-4 w-4 mr-2" />
                          <span>Your payment information is secure and encrypted</span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="w-full md:w-80">
                  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                    {isLoading ? (
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex justify-between">
                          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="border-t border-gray-100 my-4"></div>
                        <div className="flex justify-between font-bold">
                          <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-20 h-5 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ) : (
                      <CartSummary items={data?.items || []} isCheckout />
                    )}
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6">
                    <Accordion type="single" collapsible defaultValue="delivery">
                      <AccordionItem value="delivery">
                        <AccordionTrigger>Delivery Information</AccordionTrigger>
                        <AccordionContent>
                          <div className="text-sm text-gray-600 space-y-2">
                            <p><span className="font-medium">Greater Accra:</span> 1-2 business days</p>
                            <p><span className="font-medium">Ashanti Region:</span> 2-3 business days</p>
                            <p><span className="font-medium">Other regions:</span> 3-5 business days</p>
                            <p className="text-primary font-medium">Free delivery on orders above GH₵200</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="returns">
                        <AccordionTrigger>Returns & Refunds</AccordionTrigger>
                        <AccordionContent>
                          <div className="text-sm text-gray-600 space-y-2">
                            <p>We want you to be completely satisfied with your purchase. If you're not happy with your order, you can return it within 7 days.</p>
                            <p>Please note that products must be unused and in their original packaging.</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="secure">
                        <AccordionTrigger>Secure Shopping</AccordionTrigger>
                        <AccordionContent>
                          <div className="text-sm text-gray-600 space-y-2">
                            <p>Your personal information is encrypted and secure. We never store your payment details.</p>
                            <div className="flex items-center mt-2">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              <span>Verified and secure checkout</span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
