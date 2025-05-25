import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema,
  insertConsultationSchema,
  insertReviewSchema,
  insertOrderSchema,
  insertOrderItemSchema,
  insertNewsletterSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - all prefixed with /api
  const apiRouter = express.Router();
  
  // Categories
  apiRouter.get("/categories", async (req: Request, res: Response) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });
  
  // Brands
  apiRouter.get("/brands", async (req: Request, res: Response) => {
    const brands = await storage.getBrands();
    res.json(brands);
  });
  
  // Skin Concerns
  apiRouter.get("/skin-concerns", async (req: Request, res: Response) => {
    const concerns = await storage.getSkinConcerns();
    res.json(concerns);
  });
  
  // Skin Types
  apiRouter.get("/skin-types", async (req: Request, res: Response) => {
    const types = await storage.getSkinTypes();
    res.json(types);
  });
  
  // Products
  apiRouter.get("/products", async (req: Request, res: Response) => {
    const filters = req.query;
    const products = await storage.getProducts(filters);
    res.json(products);
  });
  
  apiRouter.get("/products/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    
    const product = await storage.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json(product);
  });
  
  apiRouter.get("/products/bestsellers", async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 4;
    const products = await storage.getBestSellerProducts(limit);
    res.json(products);
  });
  
  apiRouter.get("/products/new-arrivals", async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 4;
    const products = await storage.getNewArrivalProducts(limit);
    res.json(products);
  });
  
  apiRouter.get("/products/related/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 4;
    const products = await storage.getRelatedProducts(id, limit);
    res.json(products);
  });
  
  // Reviews
  apiRouter.get("/products/:id/reviews", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    
    const reviews = await storage.getReviewsByProductId(id);
    res.json(reviews);
  });
  
  apiRouter.post("/reviews", async (req: Request, res: Response) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });
  
  // Testimonials
  apiRouter.get("/testimonials", async (req: Request, res: Response) => {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  });
  
  // Consultations
  apiRouter.post("/consultations", async (req: Request, res: Response) => {
    try {
      const validatedData = insertConsultationSchema.parse(req.body);
      const consultation = await storage.createConsultation(validatedData);
      res.status(201).json(consultation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid consultation data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create consultation" });
    }
  });
  
  // Orders
  apiRouter.post("/orders", async (req: Request, res: Response) => {
    try {
      const { order, items } = req.body;
      
      // Validate order data
      const validatedOrder = insertOrderSchema.parse(order);
      
      // Validate order items
      const validatedItems = z.array(insertOrderItemSchema).parse(items);
      
      // Create order with items
      const createdOrder = await storage.createOrder(validatedOrder, validatedItems);
      
      res.status(201).json(createdOrder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });
  
  // Newsletter subscription
  apiRouter.post("/newsletter", async (req: Request, res: Response) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const newsletter = await storage.subscribeToNewsletter(validatedData.email);
      res.status(201).json(newsletter);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid email", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });
  
  // Mount the API router
  app.use("/api", apiRouter);
  
  const httpServer = createServer(app);
  return httpServer;
}
