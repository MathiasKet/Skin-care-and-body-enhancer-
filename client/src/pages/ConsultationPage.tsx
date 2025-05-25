import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const consultationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  skinType: z.string().optional(),
  skinConcerns: z.array(z.string()).optional(),
  additionalInfo: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
});

type FormValues = z.infer<typeof consultationFormSchema>;

const skinConcernOptions = [
  { id: "acne", label: "Acne & Blemishes" },
  { id: "dark-spots", label: "Dark Spots" },
  { id: "hyperpigmentation", label: "Hyperpigmentation" },
  { id: "dryness", label: "Extreme Dryness" },
  { id: "oiliness", label: "Excessive Oiliness" },
  { id: "aging", label: "Signs of Aging" },
  { id: "uneven-tone", label: "Uneven Skin Tone" },
  { id: "texture", label: "Rough Texture" },
  { id: "sensitivity", label: "Sensitivity & Irritation" },
  { id: "razor-bumps", label: "Razor Bumps (Men)" },
  { id: "harmattan", label: "Harmattan-related Dryness" },
  { id: "pores", label: "Enlarged Pores" },
];

const ConsultationPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      skinType: undefined,
      skinConcerns: [],
      additionalInfo: "",
      preferredDate: "",
      preferredTime: "",
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/consultations", data);
      
      setIsSuccess(true);
      form.reset();
      
      toast({
        title: "Consultation Request Submitted",
        description: "We'll contact you shortly to confirm your appointment.",
      });
    } catch (error) {
      console.error("Failed to submit consultation request:", error);
      
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Free Skincare Consultation - Body Enhance & Skincare Hub</title>
        <meta name="description" content="Get your FREE personalized skincare consultation with our experts. We'll analyze your skin needs and create a custom routine that works for you." />
      </Helmet>
      
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold font-heading mb-4">Get Your FREE Personalized Skincare Consultation</h1>
            <p className="text-xl mb-0">
              Not sure which products are right for your skin? Our certified skincare consultants are here to help!
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            {isSuccess ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-check text-3xl text-green-500"></i>
                </div>
                <h2 className="text-2xl font-bold text-primary mb-4">Consultation Request Received!</h2>
                <p className="text-gray-700 mb-6">
                  Thank you for booking a consultation with us. One of our skincare experts will contact you within 24 hours to confirm your appointment and provide further details.
                </p>
                <p className="text-gray-700 mb-6">
                  In the meantime, feel free to browse our products or check out our skincare blog for tips and advice.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild className="btn-primary">
                    <a href="/shop">Browse Products</a>
                  </Button>
                  <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary-light hover:text-white">
                    <a href="/">Return Home</a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold text-primary">Book Your Free Consultation</h2>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you to confirm your appointment.</p>
                </div>
                
                <div className="p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Your email address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Skin Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="skinType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Skin Type</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select your skin type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="dry">Dry</SelectItem>
                                    <SelectItem value="oily">Oily</SelectItem>
                                    <SelectItem value="combination">Combination</SelectItem>
                                    <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="sensitive">Sensitive</SelectItem>
                                    <SelectItem value="not-sure">Not Sure</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  If you're not sure, our consultant will help determine your skin type.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="mt-6">
                          <FormField
                            control={form.control}
                            name="skinConcerns"
                            render={() => (
                              <FormItem>
                                <div className="mb-2">
                                  <FormLabel>Skin Concerns (Select all that apply)</FormLabel>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {skinConcernOptions.map((option) => (
                                    <FormField
                                      key={option.id}
                                      control={form.control}
                                      name="skinConcerns"
                                      render={({ field }) => {
                                        return (
                                          <FormItem
                                            key={option.id}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                          >
                                            <FormControl>
                                              <Checkbox
                                                checked={field.value?.includes(option.id)}
                                                onCheckedChange={(checked) => {
                                                  return checked
                                                    ? field.onChange([...field.value || [], option.id])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                          (value) => value !== option.id
                                                        )
                                                      )
                                                }}
                                              />
                                            </FormControl>
                                            <FormLabel className="font-normal cursor-pointer">
                                              {option.label}
                                            </FormLabel>
                                          </FormItem>
                                        )
                                      }}
                                    />
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="mt-6">
                          <FormField
                            control={form.control}
                            name="additionalInfo"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Additional Information</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Tell us more about your skincare routine, products you're using, and specific concerns you'd like to address"
                                    className="min-h-[100px]"
                                    {...field}
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
                        <h3 className="text-lg font-medium mb-4">Preferred Appointment Time</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="preferredDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="preferredTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Time</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a time" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="morning">Morning (9am - 12pm)</SelectItem>
                                    <SelectItem value="afternoon">Afternoon (12pm - 3pm)</SelectItem>
                                    <SelectItem value="evening">Evening (3pm - 6pm)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary-dark text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <i className="fas fa-spinner fa-spin mr-2"></i>
                            Submitting...
                          </>
                        ) : (
                          "Book Your FREE Consultation"
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            )}
          </div>
          
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <img 
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Skincare consultation session" 
                className="w-full h-auto"
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
              <h2 className="text-2xl font-bold text-primary mb-4">What You'll Get</h2>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-0.5">
                    <i className="fas fa-clipboard-list"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Detailed Skin Analysis</h3>
                    <p className="text-gray-600">Our experts will analyze your skin type, concerns, and goals to understand your unique needs.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-0.5">
                    <i className="fas fa-flask"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Personalized Product Recommendations</h3>
                    <p className="text-gray-600">Get tailored product suggestions that work specifically for your skin and concerns.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-0.5">
                    <i className="fas fa-map-signs"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Step-by-Step Routine Guide</h3>
                    <p className="text-gray-600">We'll create a simple, effective skincare routine that fits your lifestyle and budget.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-0.5">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Ongoing Support via WhatsApp</h3>
                    <p className="text-gray-600">Questions after your consultation? Our experts are just a message away.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-0.5">
                    <i className="fas fa-tag"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Exclusive Consultation Discounts</h3>
                    <p className="text-gray-600">Receive special discounts on products recommended during your consultation.</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 p-4 bg-neutral rounded-lg">
                <h3 className="font-bold text-gray-800 flex items-center">
                  <i className="fas fa-info-circle text-primary mr-2"></i>
                  How It Works
                </h3>
                <ol className="mt-2 space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                    <span>Fill out and submit the consultation form</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                    <span>We'll contact you to confirm your appointment (virtual or in-store)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                    <span>Meet with our skincare expert for your personalized consultation</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
                    <span>Receive your custom skincare plan and start your journey to better skin</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-neutral py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary font-heading text-center mb-10">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-yellow-400 text-lg mb-4">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="text-gray-700 mb-4">"The consultation service was incredibly helpful! The expert recommended products specifically for my skin concerns during harmattan season. My skin has never looked better!"</p>
              <div className="flex items-center">
                <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-primary font-bold mr-3">FA</div>
                <div>
                  <p className="font-medium">Fatima A.</p>
                  <p className="text-sm text-gray-500">Tamale</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-yellow-400 text-lg mb-4">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="text-gray-700 mb-4">"As someone who had no idea where to start with skincare, this consultation was a game-changer. I finally understand what my skin needs and have a simple routine that works."</p>
              <div className="flex items-center">
                <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-primary font-bold mr-3">KO</div>
                <div>
                  <p className="font-medium">Kwame O.</p>
                  <p className="text-sm text-gray-500">Accra</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-yellow-400 text-lg mb-4">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <p className="text-gray-700 mb-4">"I was struggling with hyperpigmentation for years. After my consultation and following the recommended routine for 2 months, I've seen amazing improvements. Worth every cedi!"</p>
              <div className="flex items-center">
                <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-primary font-bold mr-3">AM</div>
                <div>
                  <p className="font-medium">Akosua M.</p>
                  <p className="text-sm text-gray-500">Kumasi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultationPage;
