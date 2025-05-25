const TrustIndicators = () => {
  const indicators = [
    {
      icon: "🚚",
      text: "Free Delivery Nationwide",
    },
    {
      icon: "✅",
      text: "100% Authentic Products",
    },
    {
      icon: "💬",
      text: "Expert Skincare Consultation",
    },
    {
      icon: "🔒",
      text: "Secure Payment Options",
    },
    {
      icon: "⭐",
      text: "5000+ Happy Customers",
    },
  ];

  return (
    <section className="bg-white py-6 shadow-md">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {indicators.map((indicator, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <span className="text-2xl mb-2">{indicator.icon}</span>
              <p className="text-sm font-medium">{indicator.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
