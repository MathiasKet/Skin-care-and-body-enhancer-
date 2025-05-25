import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from "react-helmet";

const ShippingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState<null | "not-found" | "found">(null);
  
  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    
    setIsTracking(true);
    
    // In a real implementation, this would be an API call to check the order status
    setTimeout(() => {
      // For demo purposes, we'll just check if it starts with "ORD-"
      if (trackingNumber.startsWith("ORD-")) {
        setTrackingResult("found");
      } else {
        setTrackingResult("not-found");
      }
      setIsTracking(false);
    }, 1500);
  };
  
  return (
    <>
      <Helmet>
        <title>Shipping & Delivery - Body Enhance & Skincare Hub</title>
        <meta name="description" content="Learn about our shipping policies, delivery times, and how to track your order. We deliver to all regions in Ghana with free shipping on orders above GH₵200." />
      </Helmet>
      
      <div className="bg-neutral py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary font-heading mb-4">Shipping & Delivery</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We deliver your skincare products safely and quickly to your doorstep anywhere in Ghana</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="shipping-info" className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
            <TabsTrigger value="shipping-info">Shipping Information</TabsTrigger>
            <TabsTrigger value="track-order">Track Your Order</TabsTrigger>
            <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="shipping-info" className="space-y-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-primary">Delivery Areas & Times</h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  We deliver to all regions of Ghana through our trusted logistics partners. Delivery times vary depending on your location:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-neutral rounded-lg p-5">
                    <h3 className="text-lg font-bold text-primary mb-3">Greater Accra Region</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <i className="fas fa-clock text-primary mt-1 mr-2"></i>
                        <span><strong>Delivery Time:</strong> 1-2 business days</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-money-bill-wave text-primary mt-1 mr-2"></i>
                        <span><strong>Shipping Fee:</strong> GH₵15</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-info-circle text-primary mt-1 mr-2"></i>
                        <span><strong>Same-Day Delivery:</strong> Available for orders placed before 10 AM (additional GH₵20)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-neutral rounded-lg p-5">
                    <h3 className="text-lg font-bold text-primary mb-3">Ashanti Region</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <i className="fas fa-clock text-primary mt-1 mr-2"></i>
                        <span><strong>Delivery Time:</strong> 2-3 business days</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-money-bill-wave text-primary mt-1 mr-2"></i>
                        <span><strong>Shipping Fee:</strong> GH₵20</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-info-circle text-primary mt-1 mr-2"></i>
                        <span><strong>Express Delivery:</strong> Available (1-2 days) for additional GH₵15</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-neutral rounded-lg p-5">
                    <h3 className="text-lg font-bold text-primary mb-3">Other Regional Capitals</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <i className="fas fa-clock text-primary mt-1 mr-2"></i>
                        <span><strong>Delivery Time:</strong> 3-4 business days</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-money-bill-wave text-primary mt-1 mr-2"></i>
                        <span><strong>Shipping Fee:</strong> GH₵25</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-neutral rounded-lg p-5">
                    <h3 className="text-lg font-bold text-primary mb-3">Other Locations</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <i className="fas fa-clock text-primary mt-1 mr-2"></i>
                        <span><strong>Delivery Time:</strong> 4-5 business days</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-money-bill-wave text-primary mt-1 mr-2"></i>
                        <span><strong>Shipping Fee:</strong> GH₵30</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-8">
                  <p className="text-green-800 font-medium">
                    <i className="fas fa-gift mr-2"></i> 
                    FREE DELIVERY on all orders above GH₵200!
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-primary">Shipping Policies</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">Order Processing</h3>
                    <p className="text-gray-700">
                      All orders are processed within 24 hours of being placed (excluding weekends and public holidays). You will receive an order confirmation email once your order has been processed.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">Delivery Partners</h3>
                    <p className="text-gray-700">
                      We work with trusted logistics partners including Ghana Post EMS, Jumia Express, and local courier services to ensure your products arrive safely and on time.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">Package Handling</h3>
                    <p className="text-gray-700">
                      All products are carefully packaged to prevent damage during transit. Fragile items receive extra protection, and temperature-sensitive products are packed with appropriate insulation during hot weather.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">Delivery Confirmation</h3>
                    <p className="text-gray-700">
                      Our delivery personnel will contact you via phone when they are nearby. Please ensure your contact information is accurate during checkout.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">Failed Delivery Attempts</h3>
                    <p className="text-gray-700">
                      If you're not available to receive your package, our courier will make two additional delivery attempts. After three failed attempts, the package will be returned to our warehouse, and you'll need to contact our customer service to arrange redelivery (additional fees may apply).
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-primary">Payment Methods</h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  We offer several convenient payment options for your orders:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <i className="fas fa-mobile-alt text-yellow-500 text-2xl mr-3"></i>
                      <h3 className="text-lg font-bold">Mobile Money</h3>
                    </div>
                    <p className="text-gray-700 text-sm">
                      We accept payments via MTN Mobile Money, Vodafone Cash, and AirtelTigo Money. Payment instructions will be provided after checkout.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <i className="fas fa-credit-card text-blue-500 text-2xl mr-3"></i>
                      <h3 className="text-lg font-bold">Credit/Debit Cards</h3>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Secure online payments with Visa, Mastercard, and other major cards through our payment gateway.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <i className="fas fa-university text-green-600 text-2xl mr-3"></i>
                      <h3 className="text-lg font-bold">Bank Transfer</h3>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Direct bank transfers to our company account. Order processing begins after payment confirmation.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <i className="fas fa-money-bill-wave text-green-500 text-2xl mr-3"></i>
                      <h3 className="text-lg font-bold">Cash on Delivery</h3>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Available only in Greater Accra Region. Pay in cash when your order is delivered to your doorstep.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="track-order" className="space-y-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-primary">Track Your Order</h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Enter your order number to check the status of your delivery. Your order number can be found in your order confirmation email (e.g., ORD-1234567890).
                </p>
                
                <form onSubmit={handleTrackOrder} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="text"
                      placeholder="Enter your order number (e.g., ORD-1234567890)"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="flex-grow"
                    />
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary-dark text-white whitespace-nowrap"
                      disabled={isTracking}
                    >
                      {isTracking ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Tracking...
                        </>
                      ) : (
                        "Track Order"
                      )}
                    </Button>
                  </div>
                </form>
                
                {trackingResult === "found" && (
                  <div className="mt-8 border rounded-lg overflow-hidden">
                    <div className="bg-primary text-white p-4">
                      <h3 className="font-bold text-lg">Order ORD-{trackingNumber.substring(4)}</h3>
                      <p className="text-sm">Estimated delivery: June 15, 2023</p>
                    </div>
                    
                    <div className="p-4">
                      <div className="relative">
                        <div className="absolute left-5 top-0 h-full w-1 bg-primary-light"></div>
                        
                        <div className="relative flex items-start mb-6">
                          <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 z-10">
                            <i className="fas fa-check"></i>
                          </div>
                          <div>
                            <h4 className="font-bold">Order Confirmed</h4>
                            <p className="text-sm text-gray-500">June 12, 2023 - 10:30 AM</p>
                            <p className="text-sm text-gray-700">Your order has been received and confirmed</p>
                          </div>
                        </div>
                        
                        <div className="relative flex items-start mb-6">
                          <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 z-10">
                            <i className="fas fa-check"></i>
                          </div>
                          <div>
                            <h4 className="font-bold">Processing</h4>
                            <p className="text-sm text-gray-500">June 12, 2023 - 2:45 PM</p>
                            <p className="text-sm text-gray-700">Your order is being prepared for shipping</p>
                          </div>
                        </div>
                        
                        <div className="relative flex items-start mb-6">
                          <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 z-10">
                            <i className="fas fa-box"></i>
                          </div>
                          <div>
                            <h4 className="font-bold">Shipped</h4>
                            <p className="text-sm text-gray-500">June 13, 2023 - 9:15 AM</p>
                            <p className="text-sm text-gray-700">Your order has been handed to our delivery partner</p>
                          </div>
                        </div>
                        
                        <div className="relative flex items-start">
                          <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-500 mr-4 z-10">
                            <i className="fas fa-home"></i>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-500">Delivered</h4>
                            <p className="text-sm text-gray-500">Estimated: June 15, 2023</p>
                            <p className="text-sm text-gray-700">Your package is on the way</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {trackingResult === "not-found" && (
                  <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <i className="fas fa-exclamation-circle text-red-500"></i>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Order not found</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>We couldn't find an order with the number "{trackingNumber}". Please check that you've entered the correct order number and try again.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <i className="fas fa-info-circle text-blue-500"></i>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Need help with your order?</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>If you're having trouble tracking your order or have any questions, please contact our customer support team:</p>
                        <ul className="mt-2 space-y-1">
                          <li><i className="fas fa-phone-alt mr-2"></i> +233 (0) 302 123 456</li>
                          <li><i className="fas fa-envelope mr-2"></i> orders@bodyenhancehub.com</li>
                          <li><i className="fab fa-whatsapp mr-2"></i> WhatsApp: +233 (0) 50 123 4567</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="faq" className="space-y-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-primary">Frequently Asked Questions</h2>
              </div>
              
              <div className="p-6">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="item-1" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-primary font-medium">How long will it take to receive my order?</AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      <p>Delivery times vary based on your location in Ghana:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Greater Accra: 1-2 business days</li>
                        <li>Ashanti Region: 2-3 business days</li>
                        <li>Other Regional Capitals: 3-4 business days</li>
                        <li>Other Locations: 4-5 business days</li>
                      </ul>
                      <p className="mt-2">Please note that these are estimated delivery times and may vary depending on factors such as weather conditions, public holidays, or unforeseen circumstances.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-primary font-medium">Do you offer free shipping?</AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      <p>Yes! We offer free shipping on all orders above GH₵200. For orders below this amount, shipping fees apply based on your location.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-primary font-medium">How can I track my order?</AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      <p>Once your order ships, you'll receive a tracking number via email. You can use this number to track your order on our website's "Track Order" page. Alternatively, you can contact our customer service team with your order number for updates.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-primary font-medium">What if I'm not home when my order arrives?</AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      <p>Our delivery personnel will call you before arriving. If you're not available, they can leave the package with a neighbor or security guard (with your permission), or they'll arrange another delivery attempt. After three failed delivery attempts, the package will be returned to our warehouse.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-primary font-medium">Do you deliver to other countries outside Ghana?</AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      <p>Currently, we only deliver within Ghana. However, we're working on expanding our shipping options to other West African countries in the near future. Sign up for our newsletter to be notified when international shipping becomes available.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-primary font-medium">What happens if my products arrive damaged?</AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      <p>In the rare event that your products arrive damaged, please take photos of the damaged items and packaging, and contact our customer service team within 48 hours of delivery. We'll arrange for a replacement to be sent to you at no additional cost.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-7" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-primary font-medium">Can I change my delivery address after placing an order?</AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      <p>You can request to change your delivery address if your order hasn't been shipped yet. Please contact our customer service team as soon as possible with your order number and the new delivery address. Once an order has been shipped, we cannot change the delivery address.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-8" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-primary font-medium">Do you offer expedited shipping?</AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      <p>Yes, we offer expedited shipping options:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Same-Day Delivery: Available in Greater Accra for orders placed before 10 AM (additional GH₵20)</li>
                        <li>Express Delivery: Available for Ashanti Region (1-2 days) for an additional GH₵15</li>
                      </ul>
                      <p className="mt-2">Please select your preferred shipping method at checkout.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="bg-primary text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Need More Help?</h2>
              <p>Our customer support team is available to assist you</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a href="tel:+233302123456" className="bg-white text-primary hover:bg-secondary hover:text-white py-2 px-6 rounded-full transition duration-300 inline-flex items-center">
                <i className="fas fa-phone-alt mr-2"></i> Call Us
              </a>
              <a href="https://wa.me/233501234567" className="bg-white text-primary hover:bg-secondary hover:text-white py-2 px-6 rounded-full transition duration-300 inline-flex items-center">
                <i className="fab fa-whatsapp mr-2"></i> WhatsApp
              </a>
              <a href="mailto:hello@bodyenhancehub.com" className="bg-white text-primary hover:bg-secondary hover:text-white py-2 px-6 rounded-full transition duration-300 inline-flex items-center">
                <i className="fas fa-envelope mr-2"></i> Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPage;
