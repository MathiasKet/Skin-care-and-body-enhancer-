import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertProductSchema, 
  insertCategorySchema, 
  insertCartSchema, 
  insertCartItemSchema,
  insertReviewSchema,
  insertUserSchema,
  insertBlogPostSchema
} from "@shared/schema";
import { nanoid } from "nanoid";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  const apiRouter = (path: string) => `/api${path}`;

  // =============== CATEGORIES ROUTES ===============
  // Get all categories
  app.get(apiRouter("/categories"), async (req: Request, res: Response) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Get category by slug
  app.get(apiRouter("/categories/:slug"), async (req: Request, res: Response) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Create category
  app.post(apiRouter("/categories"), async (req: Request, res: Response) => {
    try {
      const categoryData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: "Invalid category data" });
    }
  });

  // =============== PRODUCTS ROUTES ===============
  // Get all products
  app.get(apiRouter("/products"), async (req: Request, res: Response) => {
    try {
      const { category, featured, popular, bestSeller, limit } = req.query;
      
      let products = await storage.getAllProducts();
      
      // Apply filters
      if (category) {
        products = products.filter(p => p.categoryId === Number(category));
      }
      
      if (featured === 'true') {
        products = products.filter(p => p.isFeatured);
      }
      
      if (popular === 'true') {
        products = products.filter(p => p.isPopular);
      }
      
      if (bestSeller === 'true') {
        products = products.filter(p => p.isBestSeller);
      }
      
      // Apply limit
      if (limit) {
        products = products.slice(0, Number(limit));
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get product by slug
  app.get(apiRouter("/products/:slug"), async (req: Request, res: Response) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Create product
  app.post(apiRouter("/products"), async (req: Request, res: Response) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid product data" });
    }
  });

  // =============== CART ROUTES ===============
  // Get cart by session id
  app.get(apiRouter("/cart"), async (req: Request, res: Response) => {
    try {
      const sessionId = req.query.sessionId as string;
      
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID is required" });
      }
      
      const cart = await storage.getCartBySessionId(sessionId);
      
      if (!cart) {
        // Create a new cart if it doesn't exist
        const newCart = await storage.createCart({ sessionId, userId: null });
        return res.json({ cart: newCart, items: [] });
      }
      
      const cartItems = await storage.getCartItems(cart.id);
      const itemsWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return { ...item, product };
        })
      );
      
      res.json({ cart, items: itemsWithProducts });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  // Add item to cart
  app.post(apiRouter("/cart/items"), async (req: Request, res: Response) => {
    try {
      const { sessionId, productId, quantity } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID is required" });
      }
      
      let cart = await storage.getCartBySessionId(sessionId);
      
      if (!cart) {
        // Create a new cart if it doesn't exist
        cart = await storage.createCart({ sessionId, userId: null });
      }
      
      // Check if product exists
      const product = await storage.getProduct(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      // Check if item already in cart
      const existingItem = await storage.getCartItemByProductId(cart.id, productId);
      
      if (existingItem) {
        // Update quantity if item exists
        const updatedItem = await storage.updateCartItemQuantity(
          existingItem.id,
          existingItem.quantity + quantity
        );
        return res.json(updatedItem);
      }
      
      // Add new item
      const cartItem = await storage.addCartItem({
        cartId: cart.id,
        productId,
        quantity
      });
      
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  // Update cart item quantity
  app.patch(apiRouter("/cart/items/:id"), async (req: Request, res: Response) => {
    try {
      const { quantity } = req.body;
      const itemId = parseInt(req.params.id);
      
      if (isNaN(itemId) || quantity < 1) {
        return res.status(400).json({ message: "Invalid item ID or quantity" });
      }
      
      const updatedItem = await storage.updateCartItemQuantity(itemId, quantity);
      
      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  // Remove item from cart
  app.delete(apiRouter("/cart/items/:id"), async (req: Request, res: Response) => {
    try {
      const itemId = parseInt(req.params.id);
      
      if (isNaN(itemId)) {
        return res.status(400).json({ message: "Invalid item ID" });
      }
      
      await storage.removeCartItem(itemId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove item from cart" });
    }
  });

  // =============== REVIEWS ROUTES ===============
  // Get reviews for a product
  app.get(apiRouter("/products/:productId/reviews"), async (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.productId);
      
      if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const reviews = await storage.getReviewsByProductId(productId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  // Add a review
  app.post(apiRouter("/reviews"), async (req: Request, res: Response) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ message: "Invalid review data" });
    }
  });

  // =============== BLOG ROUTES ===============
  // Get all blog posts
  app.get(apiRouter("/blog"), async (req: Request, res: Response) => {
    try {
      const { limit } = req.query;
      
      let blogPosts = await storage.getAllBlogPosts();
      
      // Apply limit
      if (limit) {
        blogPosts = blogPosts.slice(0, Number(limit));
      }
      
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  // Get blog post by slug
  app.get(apiRouter("/blog/:slug"), async (req: Request, res: Response) => {
    try {
      const blogPost = await storage.getBlogPostBySlug(req.params.slug);
      
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(blogPost);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // =============== USER ROUTES ===============
  // Register a new user
  app.post(apiRouter("/users/register"), async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username or email already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(userData);
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  // Initialize with some demo data if in development
  if (process.env.NODE_ENV === 'development') {
    initializeData();
  }

  async function initializeData() {
    try {
      // Check if data already exists
      const existingCategories = await storage.getAllCategories();
      
      if (existingCategories.length === 0) {
        // Create categories
        const categoriesData = [
          {
            name: "Facial Skincare",
            slug: "facial-skincare",
            description: "Cleanse, tone, treat & protect your face",
            imageUrl: "https://pixabay.com/get/ge810261fcd683f9da0ca630b2692ca9e19e2263a6811f0f43bf3e350e7e2f736fe505e3f0333a869c308263e563c15600385bad51667cb6462c552d07fcc636d_1280.jpg"
          },
          {
            name: "Body Enhancement",
            slug: "body-enhancement",
            description: "Oils, creams & firming solutions",
            imageUrl: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
          },
          {
            name: "Specialized Treatments",
            slug: "specialized-treatments",
            description: "Target specific skin concerns",
            imageUrl: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
          },
          {
            name: "Men's Grooming",
            slug: "mens-grooming",
            description: "Face, body & beard care for men",
            imageUrl: "https://pixabay.com/get/gfb44e19601a0017f0f89b89dcea4efc0f3d9ffdb21262bb02f13e034fb3e37e527fea73d8894d7d7877e09283e82ad3c8529dc11a407bde6eb3450bfed58430a_1280.jpg"
          },
          {
            name: "Natural & Organic",
            slug: "natural-organic",
            description: "Traditional & chemical-free options",
            imageUrl: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
          }
        ];

        for (const categoryData of categoriesData) {
          await storage.createCategory(categoryData);
        }

        const categories = await storage.getAllCategories();

        // Create products
        const productsData = [
          {
            name: "Vitamin C Brightening Serum",
            slug: "vitamin-c-brightening-serum",
            description: "Fade dark spots & even skin tone with this powerful Vitamin C serum, specially formulated for Ghanaian skin.",
            price: 150,
            salePrice: 120,
            imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
            categoryId: categories.find(c => c.slug === "facial-skincare")?.id || 1,
            stock: 50,
            isFeatured: true,
            isPopular: false,
            isBestSeller: true,
            skinType: "All skin types, especially combination and oily",
            usage: "Apply 3-4 drops to clean skin morning and night, before moisturizer.",
            ingredients: "Water, Ascorbic Acid (Vitamin C), Tocopherol (Vitamin E), Ferulic Acid, Hyaluronic Acid, Glycerin",
            benefits: "Brightens dark spots, evens skin tone, boosts collagen production, protects against environmental damage",
            safetyInfo: "Perform a patch test before use. Discontinue if irritation occurs.",
            packageContents: "1 x 30ml Vitamin C Brightening Serum"
          },
          {
            name: "Shea Butter Body Cream",
            slug: "shea-butter-body-cream",
            description: "Deep hydration & nourishment for your skin with authentic Ghanaian shea butter.",
            price: 120,
            salePrice: null,
            imageUrl: "https://pixabay.com/get/gb17790cc52ed8fca905f17ea071eb099480117f6a0c551d9eb6f8d553956ebf5e390d8081caddd036acdc197e0ecd4ec8ac1cc6efbc0f470d58ee5472d809010_1280.jpg",
            categoryId: categories.find(c => c.slug === "body-enhancement")?.id || 2,
            stock: 100,
            isFeatured: true,
            isPopular: true,
            isBestSeller: false,
            skinType: "All skin types, especially dry and sensitive",
            usage: "Apply liberally to clean body skin and massage until absorbed. Use daily for best results.",
            ingredients: "Organic Shea Butter, Coconut Oil, Vitamin E, Aloe Vera Extract, Cocoa Butter, Essential Oils",
            benefits: "Deeply moisturizes, repairs dry skin, improves skin elasticity, soothes irritation",
            safetyInfo: "Avoid contact with eyes. Keep away from children.",
            packageContents: "1 x 250g Shea Butter Body Cream"
          },
          {
            name: "Dark Spot Corrector",
            slug: "dark-spot-corrector",
            description: "Fades hyperpigmentation & scars with this powerful targeted treatment.",
            price: 180,
            salePrice: 150,
            imageUrl: "https://pixabay.com/get/g86b81aada9ad930d4605b151fd9006a8bae204c091c4c234ebbf9e0f1f9cc24ae33b45781f7e3f3f9ef1f24eb205f5399f1d9917b80b7827c83980499851eb74_1280.jpg",
            categoryId: categories.find(c => c.slug === "specialized-treatments")?.id || 3,
            stock: 30,
            isFeatured: false,
            isPopular: true,
            isBestSeller: false,
            skinType: "All skin types, formulated for melanin-rich skin",
            usage: "Apply directly to dark spots twice daily. Use sunscreen during the day.",
            ingredients: "Niacinamide, Alpha Arbutin, Kojic Acid, Licorice Root Extract, Vitamin C, Hyaluronic Acid",
            benefits: "Targets hyperpigmentation, evens skin tone, reduces appearance of dark spots and scars",
            safetyInfo: "Perform a patch test before use. May increase sensitivity to sunlight.",
            packageContents: "1 x 50ml Dark Spot Corrector Treatment"
          },
          {
            name: "Men's Face Care Set",
            slug: "mens-face-care-set",
            description: "Complete skincare routine for men with products designed for African male skin.",
            price: 200,
            salePrice: 180,
            imageUrl: "https://pixabay.com/get/gecae9d4fc138ad164f37467e1516fc1f9cef8c2117111140a249eba9d3766ff1beafb51850c4586b314a9697cc3d9d62376d0a1c3f74fb1217d4458a97dce841_1280.jpg",
            categoryId: categories.find(c => c.slug === "mens-grooming")?.id || 4,
            stock: 25,
            isFeatured: false,
            isPopular: false,
            isBestSeller: true,
            skinType: "All skin types, formulated for men",
            usage: "Use cleanser morning and night, followed by toner and moisturizer.",
            ingredients: "Varies by product. All contain natural extracts and vitamins.",
            benefits: "Cleanses, hydrates, protects, and maintains healthy skin for men",
            safetyInfo: "Avoid contact with eyes. Discontinue if irritation occurs.",
            packageContents: "1 x Facial Cleanser, 1 x Toner, 1 x Moisturizer, 1 x After Shave Balm"
          }
        ];

        for (const productData of productsData) {
          await storage.createProduct(productData);
        }

        // Create reviews
        const reviewsData = [
          {
            productId: 1,
            userId: null,
            name: "Akosua M.",
            location: "Kumasi",
            rating: 5,
            comment: "I was skeptical about ordering skincare online, but Body Enhance exceeded my expectations! The vitamin C serum I ordered has completely transformed my skin. My dark spots are fading and my skin glows like never before. Delivery to Kumasi was super fast too!",
            verified: true
          },
          {
            productId: 4,
            userId: null,
            name: "Kwame D.",
            location: "Accra",
            rating: 5,
            comment: "As a man, I always thought skincare wasn't for me until I tried the Men's Face Care Set. My skin feels refreshed and the dark patches around my beard are clearing up. The products aren't heavy or greasy - perfect for our weather. Customer service was excellent too!",
            verified: true
          },
          {
            productId: 3,
            userId: null,
            name: "Gifty A.",
            location: "Takoradi",
            rating: 5,
            comment: "The free consultation changed everything for me! I struggled with acne for years, but their expert recommended the Dark Spot Corrector for my skin type. Three months in and my skin is almost completely clear. Worth every cedi! The product is perfect for our humid climate.",
            verified: true
          }
        ];

        for (const reviewData of reviewsData) {
          await storage.createReview(reviewData);
        }

        // Create blog posts
        const blogPostsData = [
          {
            title: "The Ultimate Skincare Routine for Ghana's Climate",
            slug: "skincare-routine-ghana-climate",
            excerpt: "Learn how to adapt your skincare routine to Ghana's humid climate and protect your skin from environmental stressors.",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.",
            imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
            category: "Skincare Tips"
          },
          {
            title: "Treating Dark Spots & Hyperpigmentation on African Skin",
            slug: "treating-dark-spots-hyperpigmentation",
            excerpt: "Discover effective ingredients and treatments to fade dark spots and even your skin tone without harsh chemicals.",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.",
            imageUrl: "https://images.unsplash.com/photo-1605980625600-88b46abafa8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
            category: "Skin Concerns"
          },
          {
            title: "5 Traditional Ghanaian Ingredients That Transform Your Skin",
            slug: "traditional-ghanaian-skincare-ingredients",
            excerpt: "Explore the power of shea butter, black soap, cocoa, and other local ingredients that have been used for generations.",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.",
            imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
            category: "Natural Remedies"
          }
        ];

        for (const blogPostData of blogPostsData) {
          await storage.createBlogPost(blogPostData);
        }
      }
    } catch (error) {
      console.error("Error initializing data:", error);
    }
  }

  const httpServer = createServer(app);
  return httpServer;
}
