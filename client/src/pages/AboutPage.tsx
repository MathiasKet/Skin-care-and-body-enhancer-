import { Helmet } from "react-helmet";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Body Enhance & Skincare Hub</title>
        <meta name="description" content="Learn about our mission to provide premium, authentic skincare products that celebrate and enhance the natural beauty of Ghanaian women and men." />
      </Helmet>
      
      <div className="bg-neutral py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-primary font-heading mb-4">Our Story</h1>
            <p className="text-gray-600 mb-8">Founded with a passion for celebrating and enhancing the natural beauty of Ghanaian women and men</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800" 
              alt="Founder working on skincare formulations" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-primary font-heading mb-4">Our Beginning</h2>
            <p className="text-gray-700 mb-4">
              Body Enhance & Skincare Hub was born from a simple belief: everyone deserves access to premium, authentic skincare products that understand and work with African skin.
            </p>
            <p className="text-gray-700 mb-4">
              Our founder experienced firsthand the challenge of finding effective skincare products in Ghana that weren't just imports not suited for our climate and skin types. After years of research and connecting with trusted suppliers worldwide, Body Enhance & Skincare Hub was created to bridge this gap.
            </p>
            <p className="text-gray-700">
              Today, we're proud to serve thousands of customers across Ghana, providing not just products, but education, consultation, and ongoing support for your skincare journey.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold text-primary font-heading text-center mb-8">Our Mission</h2>
          <p className="text-xl text-center max-w-3xl mx-auto">
            "To make premium, authentic skincare and body enhancement products accessible to every Ghanaian while providing expert guidance and support for their beauty journey."
          </p>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary font-heading text-center mb-10">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check-circle text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Authenticity</h3>
              <p className="text-gray-600">Only genuine products from verified suppliers. We never compromise on quality or sell counterfeits.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-book-open text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Education</h3>
              <p className="text-gray-600">Empowering customers with skincare knowledge to make informed decisions about their beauty routines.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-hand-holding-heart text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Accessibility</h3>
              <p className="text-gray-600">Making premium beauty affordable and available to everyone across Ghana, not just in major cities.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-gray-600">Supporting Ghanaian beauty standards and preferences, celebrating our unique needs and cultures.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-star text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600">Exceptional customer service and product quality in everything we do, from website to delivery.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-leaf text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainability</h3>
              <p className="text-gray-600">Committed to environmentally friendly practices and supporting local ingredient sourcing when possible.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-primary text-white p-8 rounded-lg mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-heading mb-6 text-center">Our Commitment to Quality</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Product Sourcing</h3>
                <p className="mb-4">
                  We carefully select each brand and product we carry, ensuring they meet our strict quality standards and are suitable for Ghanaian skin types and our climate.
                </p>
                <p>
                  All products undergo thorough testing and verification before being added to our inventory. We work directly with manufacturers and authorized distributors to guarantee authenticity.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Customer Experience</h3>
                <p className="mb-4">
                  From browsing our website to receiving your package, we strive to make every interaction seamless and enjoyable. Our team is trained to provide expert advice and support.
                </p>
                <p>
                  We believe skincare is personal, which is why we offer free consultations to help you find the perfect products for your unique needs.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary font-heading text-center mb-10">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
                alt="Founder" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold mb-1">Abena Mensah</h3>
                <p className="text-accent mb-3">Founder & CEO</p>
                <p className="text-gray-600 text-sm">With 10+ years in the beauty industry, Abena's passion for skincare led her to create a brand that truly understands Ghanaian skin needs.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507152832244-10d45c7eda57?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
                alt="Lead Consultant" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold mb-1">Dr. Kwame Owusu</h3>
                <p className="text-accent mb-3">Lead Skincare Consultant</p>
                <p className="text-gray-600 text-sm">A certified dermatologist with special interest in African skin concerns, Dr. Owusu ensures all our recommendations are backed by science.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
                alt="Customer Experience Manager" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold mb-1">Ama Darko</h3>
                <p className="text-accent mb-3">Customer Experience Manager</p>
                <p className="text-gray-600 text-sm">Ama ensures every customer receives personalized care and support throughout their skincare journey with us.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-neutral rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-primary font-heading mb-6">Join Our Journey</h2>
          <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
            We're on a mission to transform skincare in Ghana. Whether you're just starting your skincare journey or looking to enhance your routine, we're here to help you achieve your beauty goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/shop" className="btn-primary">
              Shop Now
            </a>
            <a href="/consultation" className="btn-secondary">
              Book a Consultation
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
