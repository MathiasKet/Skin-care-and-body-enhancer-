import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import AboutPage from "@/pages/AboutPage";
import ConsultationPage from "@/pages/ConsultationPage";
import ShippingPage from "@/pages/ShippingPage";
import { CartSidebar } from "./components/cart/CartSidebar";
import { CartProvider } from "./components/cart/CartProvider";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/shop/:category" component={ShopPage} />
      <Route path="/product/:id" component={ProductPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/consultation" component={ConsultationPage} />
      <Route path="/shipping" component={ShippingPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Header />
          <main>
            <Router />
          </main>
          <Footer />
          <CartSidebar />
          <Toaster />
          <a href="https://wa.me/233302123456" className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition z-50">
            <i className="fab fa-whatsapp text-2xl"></i>
          </a>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
