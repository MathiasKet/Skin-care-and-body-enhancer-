import { Link } from "wouter";

const ConsultationCTA = () => {
  return (
    <section className="py-12 md:py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Not Sure Which Products Are Right For You?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Get your FREE personalized skincare consultation with our certified experts who understand Ghanaian skin
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="font-medium text-xl mb-2">Detailed Analysis</h3>
              <p className="text-white/70">
                Complete our comprehensive skin assessment questionnaire
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-medium text-xl mb-2">Expert Advice</h3>
              <p className="text-white/70">
                Receive personalized product recommendations from our specialists
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-medium text-xl mb-2">Ongoing Support</h3>
              <p className="text-white/70">
                Get continuous guidance via WhatsApp as your skin transforms
              </p>
            </div>
          </div>

          <Link href="/consultation">
            <a className="inline-block bg-white hover:bg-gray-100 text-primary font-medium py-3 px-8 rounded-full shadow-lg transition">
              Book Your Free Consultation
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ConsultationCTA;
