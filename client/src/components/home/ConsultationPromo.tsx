import { Link } from "wouter";

const ConsultationPromo = () => {
  return (
    <section className="py-12 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold font-heading mb-4">Free Personalized Skincare Consultation</h2>
            <p className="mb-6">Not sure which products are right for your skin? Our certified skincare consultants are here to help! Book a free consultation and get a custom routine that works for your skin and budget.</p>
            <ul className="mb-8 space-y-2">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-secondary mt-1 mr-2"></i>
                <span>Detailed skin analysis questionnaire</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-secondary mt-1 mr-2"></i>
                <span>Personalized product recommendations</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-secondary mt-1 mr-2"></i>
                <span>Step-by-step routine guide</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-secondary mt-1 mr-2"></i>
                <span>Ongoing support via WhatsApp</span>
              </li>
            </ul>
            <Link href="/consultation">
              <a className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-flex items-center">
                <span>Book Your FREE Consultation</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Skincare consultation session" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationPromo;
