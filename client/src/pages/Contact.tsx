import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Body Enhance & Skincare Hub</title>
        <meta name="description" content="Contact Body Enhance & Skincare Hub for any questions, concerns, or to learn more about our premium skincare products for Ghanaian skin." />
      </Helmet>

      <div className="bg-neutral py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about our products or need skincare advice? We're here to help! Reach out to our team using any of the methods below.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-medium mb-2">Visit Our Store</h2>
                <p className="text-gray-600">
                  123 Osu Road<br />
                  Accra, Ghana
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-medium mb-2">Email Us</h2>
                <p className="text-gray-600">
                  info@bodyenhancehub.com<br />
                  support@bodyenhancehub.com
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-medium mb-2">Call Us</h2>
                <p className="text-gray-600">
                  +233 20 123 4567<br />
                  +233 30 123 4567
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
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
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select value={formData.subject} onValueChange={handleSelectChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product-inquiry">Product Inquiry</SelectItem>
                          <SelectItem value="order-status">Order Status</SelectItem>
                          <SelectItem value="skincare-advice">Skincare Advice</SelectItem>
                          <SelectItem value="returns">Returns & Refunds</SelectItem>
                          <SelectItem value="wholesale">Wholesale Inquiries</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="h-32"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                  <h2 className="text-2xl font-serif font-bold mb-6">Store Hours</h2>
                  <div className="flex items-start mb-4">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Monday - Friday</p>
                      <p className="text-gray-600">9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start mb-4">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Saturday</p>
                      <p className="text-gray-600">10:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Sunday</p>
                      <p className="text-gray-600">Closed</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-8">
                  <h2 className="text-2xl font-serif font-bold mb-6">Follow Us</h2>
                  <p className="text-gray-600 mb-4">
                    Stay connected with us on social media for the latest product updates, skincare tips, and special offers.
                  </p>
                  <div className="flex space-x-4">
                    <a href="https://facebook.com" className="bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full transition" aria-label="Facebook">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                      </svg>
                    </a>
                    <a href="https://instagram.com" className="bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full transition" aria-label="Instagram">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="https://twitter.com" className="bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full transition" aria-label="Twitter">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="https://youtube.com" className="bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full transition" aria-label="YouTube">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-serif font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">What are your shipping rates?</h3>
                  <p className="text-gray-600 mb-4">
                    Orders above GH₵200 qualify for free delivery nationwide. For orders below GH₵200, delivery costs range from GH₵15-25 depending on your location.
                  </p>
                  
                  <h3 className="font-medium text-lg mb-2">How long does delivery take?</h3>
                  <p className="text-gray-600 mb-4">
                    Delivery times vary by location: Greater Accra (1-2 business days), Ashanti Region (2-3 business days), and other regions (3-5 business days).
                  </p>
                  
                  <h3 className="font-medium text-lg mb-2">Do you offer international shipping?</h3>
                  <p className="text-gray-600">
                    Currently, we only ship within Ghana. We're working on expanding our delivery network to other West African countries soon.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">What is your return policy?</h3>
                  <p className="text-gray-600 mb-4">
                    We accept returns within 7 days of delivery if products are unused and in original packaging. Please contact our customer service team to initiate a return.
                  </p>
                  
                  <h3 className="font-medium text-lg mb-2">How can I track my order?</h3>
                  <p className="text-gray-600 mb-4">
                    Once your order ships, you'll receive a tracking number via email and SMS that you can use to track your delivery status.
                  </p>
                  
                  <h3 className="font-medium text-lg mb-2">Do you offer wholesale options?</h3>
                  <p className="text-gray-600">
                    Yes, we offer wholesale pricing for retailers. Please contact us at wholesale@bodyenhancehub.com for more information about our wholesale program.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
