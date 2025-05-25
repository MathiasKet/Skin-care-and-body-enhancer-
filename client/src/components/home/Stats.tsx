const Stats = () => {
  const stats = [
    { value: "10,000+", label: "Products Delivered" },
    { value: "5,000+", label: "Happy Customers" },
    { value: "50+", label: "Premium Brands" },
    { value: "99%", label: "Customer Satisfaction" },
    { value: "3", label: "Years of Trusted Service" }
  ];
  
  return (
    <section className="py-10 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold mb-1 text-secondary">{stat.value}</div>
              <p className="text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
