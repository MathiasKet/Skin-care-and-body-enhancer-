import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-12 md:py-16 bg-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Join Our Beauty Community
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Subscribe to our newsletter for exclusive skincare tips, special offers, and early access to new products
          </p>

          <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-white/30"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <Button 
                type="submit"
                className="bg-accent hover:bg-accent/90 text-white font-medium py-3 px-6 rounded-full transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
            <p className="text-white/60 text-sm mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from us.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
