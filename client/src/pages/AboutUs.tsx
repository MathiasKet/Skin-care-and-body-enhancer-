import { Helmet } from "react-helmet";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Body Enhance & Skincare Hub</title>
        <meta name="description" content="Learn about Body Enhance & Skincare Hub's mission to provide premium, authentic skincare products that understand and work with African skin in Ghana." />
      </Helmet>

      <div className="bg-neutral py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-center">About Us</h1>

            <div className="bg-white p-8 md:p-10 rounded-xl shadow-md mb-12">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-6">
                Founded with a passion for celebrating and enhancing the natural beauty of Ghanaian women and men, Body Enhance & Skincare Hub was born from a simple belief: everyone deserves access to premium, authentic skincare products that understand and work with African skin.
              </p>
              <p className="text-gray-700 mb-6">
                Our founder experienced firsthand the challenge of finding effective skincare products in Ghana that weren't just imports not suited for our climate and skin types. After years of research and connecting with trusted suppliers worldwide, Body Enhance & Skincare Hub was created to bridge this gap.
              </p>
              <p className="text-gray-700">
                Today, we're proud to serve thousands of customers across Ghana, providing not just products, but education, consultation, and ongoing support for your skincare journey.
              </p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-neutral rounded-lg p-6">
                  <h3 className="text-xl font-serif font-semibold mb-4">Our Vision</h3>
                  <p className="text-gray-700">
                    To become the most trusted destination for skincare and body enhancement solutions in West Africa, empowering everyone to feel confident in their natural beauty.
                  </p>
                </div>
                <div className="bg-neutral rounded-lg p-6">
                  <h3 className="text-xl font-serif font-semibold mb-4">Our Promise</h3>
                  <p className="text-gray-700">
                    We guarantee 100% authentic products, expert guidance, and a commitment to understanding the unique needs of Ghanaian skin.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-xl shadow-md mb-12">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                To make premium, authentic skincare and body enhancement products accessible to every Ghanaian while providing expert guidance and support for their beauty journey.
              </p>

              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 mt-10">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex">
                  <div className="bg-primary/10 p-4 rounded-full h-16 w-16 flex items-center justify-center mr-4">
                    <span className="text-primary text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Authenticity</h3>
                    <p className="text-gray-700">Only genuine products from verified suppliers</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="bg-primary/10 p-4 rounded-full h-16 w-16 flex items-center justify-center mr-4">
                    <span className="text-primary text-2xl">📚</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Education</h3>
                    <p className="text-gray-700">Empowering customers with skincare knowledge</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="bg-primary/10 p-4 rounded-full h-16 w-16 flex items-center justify-center mr-4">
                    <span className="text-primary text-2xl">🌍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Accessibility</h3>
                    <p className="text-gray-700">Making premium beauty affordable and available</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="bg-primary/10 p-4 rounded-full h-16 w-16 flex items-center justify-center mr-4">
                    <span className="text-primary text-2xl">🤝</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Community</h3>
                    <p className="text-gray-700">Supporting Ghanaian beauty standards and preferences</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="bg-primary/10 p-4 rounded-full h-16 w-16 flex items-center justify-center mr-4">
                    <span className="text-primary text-2xl">⭐</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Excellence</h3>
                    <p className="text-gray-700">Exceptional customer service and product quality</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-xl shadow-md">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">Meet Our Team</h2>
              <p className="text-gray-700 mb-10">
                Our team consists of passionate skincare experts, consultants, and beauty enthusiasts who are dedicated to helping you achieve your skincare goals. With backgrounds in dermatology, cosmetic science, and beauty therapy, our team brings a wealth of knowledge and experience to serve you better.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-5xl">
                      AO
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">Adwoa Owusu</h3>
                  <p className="text-gray-600">Founder & CEO</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-5xl">
                      KM
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">Kwame Mensah</h3>
                  <p className="text-gray-600">Head of Product Development</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-5xl">
                      FA
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">Fatima Adu</h3>
                  <p className="text-gray-600">Lead Skincare Consultant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
