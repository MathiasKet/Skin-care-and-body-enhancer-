import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import { CartProvider } from "./components/cart/CartProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { queryClient } from "./lib/queryClient";

// Add Font Awesome
const fontAwesomeScript = document.createElement("script");
fontAwesomeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js";
fontAwesomeScript.defer = true;
if (!document.head.querySelector('script[src*="font-awesome"]')) {
  document.head.appendChild(fontAwesomeScript);
}

// Get the root element
const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
} else {
  console.error("Root element not found!");
}
