import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Meta tags for SEO
document.title = "Body Enhance & Skincare Hub - Ghana's #1 Skincare Destination";

// Add meta description for SEO
const metaDescription = document.createElement("meta");
metaDescription.name = "description";
metaDescription.content = "Discover authentic, high-quality skincare and body enhancement products curated for Ghanaian skin. From Accra to Kumasi, we deliver premium skincare products to your doorstep.";
document.head.appendChild(metaDescription);

// Add keywords meta tag
const metaKeywords = document.createElement("meta");
metaKeywords.name = "keywords";
metaKeywords.content = "skincare Ghana, body enhancement Ghana, Ghanaian beauty products, African skincare, online beauty store Ghana";
document.head.appendChild(metaKeywords);

// Open Graph tags for better social media sharing
const ogTitle = document.createElement("meta");
ogTitle.property = "og:title";
ogTitle.content = "Body Enhance & Skincare Hub - Ghana's #1 Skincare Destination";
document.head.appendChild(ogTitle);

const ogDescription = document.createElement("meta");
ogDescription.property = "og:description";
ogDescription.content = "Premium skincare and body enhancement products for Ghanaian skin. Free delivery nationwide.";
document.head.appendChild(ogDescription);

const ogType = document.createElement("meta");
ogType.property = "og:type";
ogType.content = "website";
document.head.appendChild(ogType);

// Render the app
createRoot(document.getElementById("root")!).render(<App />);
