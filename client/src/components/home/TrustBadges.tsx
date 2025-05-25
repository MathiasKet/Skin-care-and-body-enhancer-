const TrustBadges = () => {
  const badges = [
    { icon: "fa-truck", text: "Free Delivery Nationwide" },
    { icon: "fa-check-circle", text: "100% Authentic Products" },
    { icon: "fa-comments", text: "Expert Skincare Consultation" },
    { icon: "fa-lock", text: "Secure Payment Options" },
    { icon: "fa-star", text: "5000+ Happy Customers" },
  ];
  
  return (
    <section className="bg-white py-6 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center justify-center text-center">
              <div>
                <div className="text-primary text-2xl mb-1"><i className={`fas ${badge.icon}`}></i></div>
                <p className="text-sm font-medium">{badge.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
