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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileCheck, 
  MessageSquare, 
  PhoneCall, 
  User 
} from "lucide-react";

const Consultation = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consultationType, setConsultationType] = useState("online");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skinType: "",
    skinConcerns: "",
    currentProducts: "",
    allergies: "",
    preferredTime: "",
    message: "",
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
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.skinType ||
      !formData.skinConcerns
    ) {
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
        title: "Consultation Requested!",
        description: "We've received your request and will contact you shortly to confirm your consultation.",
      });
      
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        skinType: "",
        skinConcerns: "",
        currentProducts: "",
        allergies: "",
        preferredTime: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Free Skincare Consultation - Body Enhance & Skincare Hub</title>
        <meta name="description" content="Get your FREE personalized skincare consultation with our certified experts who understand Ghanaian skin. Book an online or in-person session today." />
      </Helmet>

      <div className="bg-neutral py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Get Your FREE Personalized Skincare Consultation
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Not sure which products are right for your skin? Our certified skincare consultants are here to help!
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                    <FileCheck className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-serif">Detailed Analysis</CardTitle>
                  <CardDescription>
                    Complete our comprehensive skin assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Our experts will analyze your skin type, concerns, and goals to create a personalized skincare routine.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-serif">Expert Advice</CardTitle>
                  <CardDescription>
                    Receive tailored product recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Get personalized recommendations from specialists who understand Ghanaian skin and our unique climate.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                    <PhoneCall className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-serif">Ongoing Support</CardTitle>
                  <CardDescription>
                    Stay connected as your skin transforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Receive continuous guidance via WhatsApp with our experts to track your progress and adjust your routine.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <Tabs defaultValue="online" onValueChange={setConsultationType}>
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="online">Online Consultation</TabsTrigger>
                  <TabsTrigger value="inperson">In-Person Consultation</TabsTrigger>
                </TabsList>

                <TabsContent value="online">
                  <div className="mb-6">
                    <h2 className="text-2xl font-serif font-bold mb-2">Online Consultation</h2>
                    <p className="text-gray-600">
                      Fill out the form below, and our skincare experts will contact you to schedule a WhatsApp or video call consultation at your preferred time.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="inperson">
                  <div className="mb-6">
                    <h2 className="text-2xl font-serif font-bold mb-2">In-Person Consultation</h2>
                    <p className="text-gray-600">
                      Visit our store in Accra for a face-to-face consultation with our skincare experts. Fill out the form below to book your appointment.
                    </p>
                    <p className="text-gray-600 mt-2">
                      <strong>Address:</strong> 123 Osu Road, Accra, Ghana
                    </p>
                  </div>
                </TabsContent>

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
                      <Label htmlFor="preferredTime">Preferred Time for Consultation</Label>
                      <Select
                        value={formData.preferredTime}
                        onValueChange={(value) => handleSelectChange("preferredTime", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your preferred time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9am - 12pm)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12pm - 4pm)</SelectItem>
                          <SelectItem value="evening">Evening (4pm - 7pm)</SelectItem>
                          <SelectItem value="weekend">Weekend Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skinType">Skin Type *</Label>
                      <Select
                        value={formData.skinType}
                        onValueChange={(value) => handleSelectChange("skinType", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your skin type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oily">Oily</SelectItem>
                          <SelectItem value="dry">Dry</SelectItem>
                          <SelectItem value="combination">Combination</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="sensitive">Sensitive</SelectItem>
                          <SelectItem value="not-sure">Not Sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skinConcerns">Main Skin Concerns *</Label>
                      <Textarea
                        id="skinConcerns"
                        name="skinConcerns"
                        placeholder="e.g., dark spots, acne, dryness, etc."
                        value={formData.skinConcerns}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentProducts">Current Skincare Products (if any)</Label>
                      <Textarea
                        id="currentProducts"
                        name="currentProducts"
                        placeholder="List the skincare products you're currently using"
                        value={formData.currentProducts}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Known Allergies or Sensitivities</Label>
                      <Textarea
                        id="allergies"
                        name="allergies"
                        placeholder="Any ingredients or products you're allergic to"
                        value={formData.allergies}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-8">
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Any other information you'd like us to know"
                      value={formData.message}
                      onChange={handleChange}
                      className="h-24"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Book Your Free Consultation"}
                  </Button>
                </form>
              </Tabs>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-serif font-bold mb-6 text-center">
                What Our Customers Say About Our Consultations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex text-accent mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "The free consultation changed everything for me! I struggled with acne for years, but their expert recommended the perfect products for my skin type. Three months in and my skin is almost completely clear."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Gifty A.</h4>
                      <p className="text-gray-500 text-sm">Takoradi</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex text-accent mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "I was spending so much money on products that didn't work for me. The consultant really listened to my concerns and recommended affordable products that actually delivered results. The ongoing WhatsApp support is amazing!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Kwame D.</h4>
                      <p className="text-gray-500 text-sm">Accra</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex text-accent mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "As someone with sensitive skin, I was always afraid to try new products. My in-person consultation was so thorough - they even did a patch test to ensure the products wouldn't irritate my skin. Truly professional service!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Akosua M.</h4>
                      <p className="text-gray-500 text-sm">Kumasi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Consultation;
