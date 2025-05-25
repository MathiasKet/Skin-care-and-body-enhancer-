import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface Testimonial {
  id: number;
  rating: number;
  text: string;
  customerName: string;
  location: string;
  product: string;
  initials: string;
}

const Testimonials = () => {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });
  
  // Fallback testimonials
  const fallbackTestimonials = [
    {
      id: 1,
      rating: 5,
      text: "I was skeptical about ordering skincare online, but Body Enhance exceeded my expectations! The vitamin C serum I ordered has completely transformed my skin. My dark spots are fading and my skin glows like never before. Delivery to Kumasi was super fast too!",
      customerName: "Akosua M.",
      location: "Kumasi",
      product: "Vitamin C Brightening Serum",
      initials: "AM"
    },
    {
      id: 2,
      rating: 5,
      text: "As a man, I was hesitant to invest in skincare products but the Men's Complete Facial Kit has changed my perspective completely. My skin feels fresh, looks clearer, and the dark patches around my jawline have significantly reduced. The products are perfect for Ghana's humid climate.",
      customerName: "Kwame O.",
      location: "Accra",
      product: "Men's Complete Facial Kit",
      initials: "KO"
    },
    {
      id: 3,
      rating: 4.5,
      text: "The free consultation service was incredibly helpful! The expert recommended products specifically for my skin concerns during harmattan season. The Ghanaian Shea Body Butter is now my holy grail product - no more dry, ashy skin even in the driest weather. Fast delivery to Tamale too!",
      customerName: "Fatima A.",
      location: "Tamale",
      product: "Ghanaian Shea Body Butter",
      initials: "FA"
    }
  ];
  
  const displayTestimonials = testimonials || fallbackTestimonials;
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    
    return stars;
  };
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-heading text-primary mb-2">What Our Customers Say</h2>
          <p className="text-gray-600">Real stories from satisfied customers across Ghana</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-neutral rounded-lg p-6 shadow-md">
                <Skeleton className="h-6 w-32 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex items-center">
                  <Skeleton className="h-12 w-12 rounded-full mr-3" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-16 mb-1" />
                    <Skeleton className="h-3 w-36" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            displayTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-neutral rounded-lg p-6 shadow-md">
                <div className="text-yellow-400 text-lg mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-primary font-bold mr-3">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.customerName}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                    <p className="text-xs text-accent">{testimonial.product} | Verified Purchase</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
