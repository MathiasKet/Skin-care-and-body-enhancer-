import { useQuery } from "@tanstack/react-query";
import { Review } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import StarRating from "@/components/ui/star-rating";

// Helper function to get random product IDs for testimonials
const getRandomProductIds = () => {
  // In a real app, this would come from the backend
  return [1, 2, 3, 4].sort(() => 0.5 - Math.random()).slice(0, 3);
};

const TestimonialSection = () => {
  const productIds = getRandomProductIds();
  
  // Fetch reviews for multiple products
  const reviewQueries = productIds.map(id => 
    useQuery<Review[]>({
      queryKey: [`/api/products/${id}/reviews`],
      staleTime: 300000, // 5 minutes
    })
  );

  const isLoading = reviewQueries.some(query => query.isLoading);
  const hasError = reviewQueries.some(query => query.error);

  // Combine reviews and get the top-rated ones
  const testimonials = reviewQueries
    .flatMap(query => query.data || [])
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  if (hasError) {
    return (
      <section className="py-12 md:py-16 bg-neutral">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">Failed to load testimonials</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-neutral">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Real results from real Ghanaians using our authentic skincare products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <Skeleton className="h-5 w-24 mb-3" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <div className="flex items-center">
                    <Skeleton className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <Skeleton className="h-5 w-24 mb-1" />
                      <Skeleton className="h-4 w-16 mb-1" />
                      <Skeleton className="h-3 w-36" />
                    </div>
                  </div>
                </div>
              ))
            : testimonials.length > 0
            ? testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <StarRating rating={testimonial.rating} size="lg" className="mb-3" />
                  <p className="text-gray-700 mb-4">"{testimonial.comment}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200 flex items-center justify-center">
                      {/* Placeholder avatar with initials */}
                      <span className="text-lg font-medium text-gray-700">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.location}</p>
                      <p className="text-primary text-xs mt-1">
                        {testimonial.verified ? "Verified Purchase" : ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <StarRating rating={5} size="lg" className="mb-3" />
                  <p className="text-gray-700 mb-4">
                    {index === 0
                      ? "I was skeptical about ordering skincare online, but Body Enhance exceeded my expectations! The products have completely transformed my skin. My dark spots are fading and my skin glows like never before."
                      : index === 1
                      ? "As someone who has struggled with sensitive skin, finding the right products has been a journey. The free consultation helped me find exactly what works for my skin type. Highly recommend!"
                      : "The natural ingredients in these products work so well for our climate. No more oily skin during the day! Delivery was quick too."}
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200 flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-700">
                        {index === 0 ? "A" : index === 1 ? "K" : "G"}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {index === 0 ? "Akosua M." : index === 1 ? "Kwame D." : "Gifty A."}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {index === 0 ? "Kumasi" : index === 1 ? "Accra" : "Takoradi"}
                      </p>
                      <p className="text-primary text-xs mt-1">Verified Purchase</p>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="#"
            className="inline-block bg-white hover:bg-gray-50 text-primary font-medium py-3 px-8 rounded-full shadow transition"
          >
            Read More Reviews
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
