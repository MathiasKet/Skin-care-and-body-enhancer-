import { 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  brands, type Brand, type InsertBrand,
  skinConcerns, type SkinConcern, type InsertSkinConcern,
  skinTypes, type SkinType, type InsertSkinType,
  products, type Product, type InsertProduct,
  reviews, type Review, type InsertReview,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem,
  testimonials, type Testimonial, type InsertTestimonial,
  consultations, type Consultation, type InsertConsultation,
  newsletters, type Newsletter, type InsertNewsletter
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Brand operations
  getBrands(): Promise<Brand[]>;
  getBrandBySlug(slug: string): Promise<Brand | undefined>;
  createBrand(brand: InsertBrand): Promise<Brand>;
  
  // Skin concern operations
  getSkinConcerns(): Promise<SkinConcern[]>;
  getSkinConcernBySlug(slug: string): Promise<SkinConcern | undefined>;
  createSkinConcern(concern: InsertSkinConcern): Promise<SkinConcern>;
  
  // Skin type operations
  getSkinTypes(): Promise<SkinType[]>;
  getSkinTypeBySlug(slug: string): Promise<SkinType | undefined>;
  createSkinType(type: InsertSkinType): Promise<SkinType>;
  
  // Product operations
  getProducts(filters?: any): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getBestSellerProducts(limit?: number): Promise<Product[]>;
  getNewArrivalProducts(limit?: number): Promise<Product[]>;
  getRelatedProducts(productId: number, limit?: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Review operations
  getReviewsByProductId(productId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Order operations
  getOrders(): Promise<Order[]>;
  getOrderById(id: number): Promise<Order | undefined>;
  getOrderByOrderNumber(orderNumber: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  
  // Order item operations
  getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]>;
  
  // Testimonial operations
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Consultation operations
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  
  // Newsletter operations
  subscribeToNewsletter(email: string): Promise<Newsletter>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private brands: Map<number, Brand>;
  private skinConcerns: Map<number, SkinConcern>;
  private skinTypes: Map<number, SkinType>;
  private products: Map<number, Product>;
  private reviews: Map<number, Review>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private testimonials: Map<number, Testimonial>;
  private consultations: Map<number, Consultation>;
  private newsletters: Map<number, Newsletter>;
  
  private userId: number;
  private categoryId: number;
  private brandId: number;
  private skinConcernId: number;
  private skinTypeId: number;
  private productId: number;
  private reviewId: number;
  private orderId: number;
  private orderItemId: number;
  private testimonialId: number;
  private consultationId: number;
  private newsletterId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.brands = new Map();
    this.skinConcerns = new Map();
    this.skinTypes = new Map();
    this.products = new Map();
    this.reviews = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.testimonials = new Map();
    this.consultations = new Map();
    this.newsletters = new Map();
    
    this.userId = 1;
    this.categoryId = 1;
    this.brandId = 1;
    this.skinConcernId = 1;
    this.skinTypeId = 1;
    this.productId = 1;
    this.reviewId = 1;
    this.orderId = 1;
    this.orderItemId = 1;
    this.testimonialId = 1;
    this.consultationId = 1;
    this.newsletterId = 1;
    
    // Initialize with seed data
    this.seedData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }
  
  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Brand operations
  async getBrands(): Promise<Brand[]> {
    return Array.from(this.brands.values());
  }
  
  async getBrandBySlug(slug: string): Promise<Brand | undefined> {
    return Array.from(this.brands.values()).find(
      (brand) => brand.slug === slug,
    );
  }
  
  async createBrand(insertBrand: InsertBrand): Promise<Brand> {
    const id = this.brandId++;
    const brand: Brand = { ...insertBrand, id };
    this.brands.set(id, brand);
    return brand;
  }
  
  // Skin concern operations
  async getSkinConcerns(): Promise<SkinConcern[]> {
    return Array.from(this.skinConcerns.values());
  }
  
  async getSkinConcernBySlug(slug: string): Promise<SkinConcern | undefined> {
    return Array.from(this.skinConcerns.values()).find(
      (concern) => concern.slug === slug,
    );
  }
  
  async createSkinConcern(insertConcern: InsertSkinConcern): Promise<SkinConcern> {
    const id = this.skinConcernId++;
    const concern: SkinConcern = { ...insertConcern, id };
    this.skinConcerns.set(id, concern);
    return concern;
  }
  
  // Skin type operations
  async getSkinTypes(): Promise<SkinType[]> {
    return Array.from(this.skinTypes.values());
  }
  
  async getSkinTypeBySlug(slug: string): Promise<SkinType | undefined> {
    return Array.from(this.skinTypes.values()).find(
      (type) => type.slug === slug,
    );
  }
  
  async createSkinType(insertType: InsertSkinType): Promise<SkinType> {
    const id = this.skinTypeId++;
    const type: SkinType = { ...insertType, id };
    this.skinTypes.set(id, type);
    return type;
  }
  
  // Product operations
  async getProducts(filters?: any): Promise<Product[]> {
    let products = Array.from(this.products.values());
    
    if (filters) {
      // Apply category filter
      if (filters.category) {
        products = products.filter(product => {
          const category = this.categories.get(product.categoryId || 0);
          return category?.slug === filters.category;
        });
      }
      
      // Apply search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        products = products.filter(product => 
          product.name.toLowerCase().includes(searchTerm) || 
          product.shortDescription?.toLowerCase().includes(searchTerm)
        );
      }
      
      // Apply price range filter
      if (filters.price && Array.isArray(filters.price) && filters.price.length === 2) {
        const [min, max] = filters.price;
        products = products.filter(product => product.price >= min && product.price <= max);
      }
      
      // Apply brand filter
      if (filters.brand && filters.brand.length > 0) {
        products = products.filter(product => {
          const brand = this.brands.get(product.brandId || 0);
          return brand && filters.brand.includes(brand.slug);
        });
      }
      
      // Apply sale filter
      if (filters.sale === true) {
        products = products.filter(product => product.originalPrice !== null);
      }
      
      // Apply new arrivals filter
      if (filters.new === true) {
        products = products.filter(product => product.isNew);
      }
      
      // Apply sorting
      if (filters.sort) {
        switch (filters.sort) {
          case 'price-low':
            products.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            products.sort((a, b) => b.price - a.price);
            break;
          case 'newest':
            products.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
            break;
          case 'best-selling':
            products.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
            break;
          // Default is 'featured'
          default:
            break;
        }
      }
    }
    
    return products;
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    const product = this.products.get(id);
    
    if (product) {
      // Enhance product with related data
      const category = product.categoryId ? this.categories.get(product.categoryId) : undefined;
      const brand = product.brandId ? this.brands.get(product.brandId) : undefined;
      const reviews = await this.getReviewsByProductId(id);
      
      return {
        ...product,
        category: category as any,
        brand: brand as any,
        reviews: reviews as any,
        skinTypes: ['Dry', 'Oily', 'Combination', 'Normal', 'Sensitive'] // Example data
      };
    }
    
    return undefined;
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }
  
  async getBestSellerProducts(limit: number = 4): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(product => product.isBestSeller)
      .slice(0, limit);
  }
  
  async getNewArrivalProducts(limit: number = 4): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(product => product.isNew)
      .slice(0, limit);
  }
  
  async getRelatedProducts(productId: number, limit: number = 4): Promise<Product[]> {
    const product = this.products.get(productId);
    if (!product) return [];
    
    return Array.from(this.products.values())
      .filter(p => p.id !== productId && p.categoryId === product.categoryId)
      .slice(0, limit);
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const product: Product = { ...insertProduct, id, createdAt: new Date() };
    this.products.set(id, product);
    return product;
  }
  
  // Review operations
  async getReviewsByProductId(productId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.productId === productId,
    );
  }
  
  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.reviewId++;
    const review: Review = { ...insertReview, id, date: new Date() };
    this.reviews.set(id, review);
    
    // Update product rating
    const product = this.products.get(review.productId);
    if (product) {
      const reviews = await this.getReviewsByProductId(product.id);
      const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
      const newRating = totalRating / reviews.length;
      
      this.products.set(product.id, {
        ...product,
        rating: newRating,
        reviewCount: reviews.length
      });
    }
    
    return review;
  }
  
  // Order operations
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
  
  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async getOrderByOrderNumber(orderNumber: string): Promise<Order | undefined> {
    return Array.from(this.orders.values()).find(
      (order) => order.orderNumber === orderNumber,
    );
  }
  
  async createOrder(insertOrder: InsertOrder, insertItems: InsertOrderItem[]): Promise<Order> {
    const id = this.orderId++;
    const order: Order = { ...insertOrder, id, createdAt: new Date() };
    this.orders.set(id, order);
    
    // Create order items
    for (const item of insertItems) {
      await this.createOrderItem({ ...item, orderId: id });
    }
    
    return order;
  }
  
  // Order item operations
  async getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      (item) => item.orderId === orderId,
    );
  }
  
  private async createOrderItem(insertItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.orderItemId++;
    const item: OrderItem = { ...insertItem, id };
    this.orderItems.set(id, item);
    return item;
  }
  
  // Testimonial operations
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Consultation operations
  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const id = this.consultationId++;
    const consultation: Consultation = { 
      ...insertConsultation, 
      id, 
      status: 'pending',
      createdAt: new Date() 
    };
    this.consultations.set(id, consultation);
    return consultation;
  }
  
  // Newsletter operations
  async subscribeToNewsletter(email: string): Promise<Newsletter> {
    const existing = Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === email,
    );
    
    if (existing) {
      return existing;
    }
    
    const id = this.newsletterId++;
    const newsletter: Newsletter = { id, email, createdAt: new Date() };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }
  
  // Seed initial data
  private seedData() {
    // Categories
    const categoriesData: InsertCategory[] = [
      {
        name: "Facial Skincare",
        slug: "facial-skincare",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        productCount: 25
      },
      {
        name: "Body Enhancement",
        slug: "body-enhancement",
        image: "https://pixabay.com/get/gac378c92cdcf10394f269cb5c5b06a49b937d690152c19378719827e4225f69f3f960a01b0d9ed6694151589b0554394e22b543d9f55c16a58a5539880cb322f_1280.jpg",
        productCount: 18
      },
      {
        name: "Specialized Treatments",
        slug: "specialized-treatments",
        image: "https://pixabay.com/get/g637c0bde2eee2b052478a9b77bd5ce6c33224266930c14944df191cbe67a1f20b8e0f44e6fdfabd5d0f1797dded68d7c0583997e677ca2aced7358c9f6c06948_1280.jpg",
        productCount: 32
      },

      {
        name: "Natural & Organic",
        slug: "natural-organic",
        image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        productCount: 21
      }
    ];
    
    for (const category of categoriesData) {
      this.createCategory(category);
    }
    
    // Brands
    const brandsData: InsertBrand[] = [
      { name: "Body Enhance", slug: "body-enhance", logo: "" },
      { name: "Natural Ghana", slug: "natural-ghana", logo: "" },
      { name: "Skin Glow", slug: "skin-glow", logo: "" },
      { name: "Tropical Essence", slug: "tropical-essence", logo: "" },
      { name: "Pure African", slug: "pure-african", logo: "" }
    ];
    
    for (const brand of brandsData) {
      this.createBrand(brand);
    }
    
    // Skin Concerns
    const skinConcernsData: InsertSkinConcern[] = [
      { name: "Acne & Blemishes", slug: "acne-blemishes" },
      { name: "Dark Spots", slug: "dark-spots" },
      { name: "Dryness", slug: "dryness" },
      { name: "Anti-Aging", slug: "anti-aging" },
      { name: "Hyperpigmentation", slug: "hyperpigmentation" }
    ];
    
    for (const concern of skinConcernsData) {
      this.createSkinConcern(concern);
    }
    
    // Skin Types
    const skinTypesData: InsertSkinType[] = [
      { name: "Dry", slug: "dry" },
      { name: "Oily", slug: "oily" },
      { name: "Combination", slug: "combination" },
      { name: "Normal", slug: "normal" },
      { name: "Sensitive", slug: "sensitive" }
    ];
    
    for (const type of skinTypesData) {
      this.createSkinType(type);
    }
    
    // Products
    const productsData: InsertProduct[] = [
      {
        name: "Vitamin C Brightening Serum",
        slug: "vitamin-c-brightening-serum",
        sku: "SKU-001",
        description: "Our powerful Vitamin C Serum is specially formulated to reduce dark spots and hyperpigmentation while giving your skin a radiant glow. Made with a stable form of Vitamin C that works perfectly for Ghanaian skin types.",
        shortDescription: "Reduces dark spots & hyperpigmentation",
        price: 180.00,
        originalPrice: 220.00,
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        gallery: [],
        categoryId: 1,
        brandId: 1,
        rating: 4.5,
        reviewCount: 127,
        stockStatus: "in_stock",
        isBestSeller: true,
        isNew: false,
        isOrganic: false,
        size: "30ml",
        productType: "Serum",
        madeIn: "Ghana",
        shelfLife: "12 months",
        ingredients: "Water, Ascorbic Acid (Vitamin C), Glycerin, Aloe Vera Extract, Hyaluronic Acid, Ferulic Acid, Vitamin E, Citrus Extract, Natural Preservatives",
        highlights: [
          "20% Stable Vitamin C for maximum potency",
          "Reduces hyperpigmentation and dark spots",
          "Specifically formulated for African skin tones"
        ],
        perfectFor: [
          "Dull, uneven skin tone",
          "Post-acne marks and hyperpigmentation",
          "Those seeking a brighter complexion"
        ],
        whyGhanaLovesIt: "This serum works wonders in Ghana's climate, helping to combat the effects of sun exposure that many Ghanaians struggle with. It's fast-absorbing and doesn't leave a greasy residue, perfect for our humid weather.",
        importantNotes: "Patch test before first use. Might cause a slight tingling sensation initially, which is normal. Apply sunscreen during the day when using this product.",
        howToUse: [
          "Cleanse face thoroughly",
          "Apply 2-3 drops to clean, dry skin",
          "Gently pat and press into face and neck",
          "Use morning and evening for best results",
          "Follow with moisturizer"
        ],
        whatsIncluded: "1 x 30ml Vitamin C Brightening Serum in a glass dropper bottle"
      },
      {
        name: "Ghanaian Shea Body Butter",
        slug: "ghanaian-shea-body-butter",
        sku: "SKU-002",
        description: "Our luxurious Shea Body Butter is made with 100% pure Ghanaian shea butter, known for its exceptional moisturizing properties. This rich formula deeply nourishes and hydrates your skin, leaving it soft, smooth, and radiant.",
        shortDescription: "Rich hydration for dry climate",
        price: 120.00,
        originalPrice: null,
        image: "https://pixabay.com/get/g9aee88f9b25f5173ea200f6c29fd746729db1c478e06a7489a84f8896ebaf2192d6beb7b87b7b7e94d0f168dd286aacac3bbd7904fa7712eee478420b6027462_1280.jpg",
        gallery: [],
        categoryId: 2,
        brandId: 2,
        rating: 5.0,
        reviewCount: 86,
        stockStatus: "in_stock",
        isBestSeller: true,
        isNew: false,
        isOrganic: true,
        size: "200g",
        productType: "Body Butter",
        madeIn: "Ghana",
        shelfLife: "18 months",
        ingredients: "Raw Unrefined Shea Butter, Coconut Oil, Vitamin E, Almond Oil, Essential Oils Blend",
        highlights: [
          "Made with 100% authentic Ghanaian shea butter",
          "Ultra-moisturizing for extremely dry skin",
          "No synthetic fragrances or preservatives"
        ],
        perfectFor: [
          "Extremely dry, flaky skin",
          "Harmattan season skin protection",
          "Rough elbows, knees, and heels"
        ],
        whyGhanaLovesIt: "Our shea butter is sourced directly from women's cooperatives in Northern Ghana, supporting local communities. It's the perfect remedy for the dry Harmattan season and keeps skin moisturized throughout the day.",
        importantNotes: "Natural product with no added preservatives. Store in a cool, dry place. Texture may vary slightly based on temperature.",
        howToUse: [
          "Scoop a small amount with clean fingers",
          "Warm between palms until it melts slightly",
          "Massage into skin using circular motions",
          "Best applied after shower on slightly damp skin",
          "Pay special attention to dry areas"
        ],
        whatsIncluded: "1 x 200g Ghanaian Shea Body Butter in a recyclable jar"
      },
      {
        name: "Men's Complete Facial Kit",
        slug: "mens-complete-facial-kit",
        sku: "SKU-003",
        description: "Specifically formulated for men's skin needs in Ghana's climate, this complete kit has everything you need for healthy, clear skin. From cleansing to moisturizing, this simple 3-step routine will transform your complexion.",
        shortDescription: "Cleanser, toner & moisturizer",
        price: 250.00,
        originalPrice: 299.00,
        image: "https://pixabay.com/get/g03306a2d2eb9ccc725dad133ea40c4dd6cf01881e4b18d46a77f1640ca5dbdde4c1aab8ecbac4720897707201fe2471b1a71e38a7e81cff00c23ba47d54a80e2_1280.jpg",
        gallery: [],
        categoryId: 4,
        brandId: 1,
        rating: 4.0,
        reviewCount: 42,
        stockStatus: "in_stock",
        isBestSeller: true,
        isNew: false,
        isOrganic: false,
        size: "3 x 100ml",
        productType: "Skincare Kit",
        madeIn: "Ghana",
        shelfLife: "12 months",
        ingredients: "Varies by product. All products free from harsh chemicals, alcohol, and artificial fragrances.",
        highlights: [
          "Specifically designed for men's skin needs",
          "Balances oil production and reduces shine",
          "Prevents and treats razor bumps and ingrown hairs"
        ],
        perfectFor: [
          "Men with oily, combination or normal skin",
          "Those dealing with razor bumps or ingrown hairs",
          "Men who want a simple but effective routine"
        ],
        whyGhanaLovesIt: "Men in Ghana especially love how this kit prevents and treats the common issue of razor bumps and dark spots around the jawline. The products are lightweight and non-greasy, perfect for our climate.",
        importantNotes: "For external use only. If irritation occurs, discontinue use and consult a dermatologist.",
        howToUse: [
          "Morning and night: Wash face with the cleanser",
          "Apply toner to clean, dry skin using a cotton pad",
          "Finish with a small amount of the moisturizer"
        ],
        whatsIncluded: "1 x Facial Cleanser (100ml), 1 x Balancing Toner (100ml), 1 x Oil-Control Moisturizer (100ml)"
      },
      {
        name: "African Black Soap Cleanser",
        slug: "african-black-soap-cleanser",
        sku: "SKU-004",
        description: "Our African Black Soap Cleanser is based on traditional West African black soap, enhanced with modern skincare ingredients to gently but effectively cleanse your skin without stripping its natural oils.",
        shortDescription: "Deep cleanse for oily & acne-prone skin",
        price: 95.00,
        originalPrice: null,
        image: "https://pixabay.com/get/gf849466ba3db5c8bc2aa9c31259335e040c02a1c2ea9461e8c0048546c4745a04c37a715e0253f6b6736b37e088fff249042c8a6036616e61806c1cf53ea0d91_1280.jpg",
        gallery: [],
        categoryId: 5,
        brandId: 5,
        rating: 4.5,
        reviewCount: 158,
        stockStatus: "in_stock",
        isBestSeller: true,
        isNew: false,
        isOrganic: true,
        size: "200ml",
        productType: "Facial Cleanser",
        madeIn: "Ghana",
        shelfLife: "12 months",
        ingredients: "Authentic African Black Soap (Plantain Ash, Cocoa Pod Ash, Palm Oil, Shea Butter), Aloe Vera, Tea Tree Extract, Glycerin, Natural Preservatives",
        highlights: [
          "Traditional African remedy for problematic skin",
          "Helps clear acne and prevent breakouts",
          "Gentle exfoliation to remove dead skin cells"
        ],
        perfectFor: [
          "Oily and acne-prone skin",
          "Those with clogged pores and blackheads",
          "Sensitive skin that needs gentle cleansing"
        ],
        whyGhanaLovesIt: "This modernized version of our traditional black soap is loved for how it controls oil and shine throughout Ghana's humid days. It's a perfect example of combining our ancestral wisdom with modern skincare science.",
        importantNotes: "Natural color variations may occur. Avoid contact with eyes. Can be used daily but start with once a day to test skin's reaction.",
        howToUse: [
          "Wet face with warm water",
          "Pump a small amount into hands and work into a lather",
          "Massage gently onto face using circular motions",
          "Rinse thoroughly with water",
          "Use morning and evening"
        ],
        whatsIncluded: "1 x 200ml African Black Soap Cleanser in a pump bottle"
      },
      {
        name: "Cocoa Coffee Body Scrub",
        slug: "cocoa-coffee-body-scrub",
        sku: "SKU-005",
        description: "Exfoliate and rejuvenate your skin with our luxurious body scrub made with Ghanaian cocoa and coffee grounds. This scrub removes dead skin cells, improves circulation, and helps firm the skin for a radiant, smooth appearance.",
        shortDescription: "Exfoliates & firms skin",
        price: 140.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        gallery: [],
        categoryId: 2,
        brandId: 3,
        rating: 5.0,
        reviewCount: 18,
        stockStatus: "in_stock",
        isBestSeller: false,
        isNew: true,
        isOrganic: true,
        size: "250g",
        productType: "Body Scrub",
        madeIn: "Ghana",
        shelfLife: "6 months",
        ingredients: "Ground Coffee, Cocoa Powder, Raw Cane Sugar, Shea Butter, Coconut Oil, Vitamin E",
        highlights: [
          "Made with Ghanaian cocoa and coffee grounds",
          "Helps firm skin and improve circulation",
          "Leaves skin feeling incredibly smooth and soft"
        ],
        perfectFor: [
          "All skin types, especially rough or dull skin",
          "Those looking to improve skin texture",
          "Before applying self-tanner or body treatments"
        ],
        whyGhanaLovesIt: "This scrub uses ingredients that Ghana is famous for - cocoa and coffee. The delicious scent is an added bonus, and the results are immediate: smoother, more radiant skin after just one use.",
        importantNotes: "Not recommended for use on face or sensitive areas. Avoid use on broken or irritated skin. Product contains natural grounds that may clog drains - use drain catcher recommended.",
        howToUse: [
          "Apply to damp skin in shower",
          "Massage in circular motions, focusing on rough areas",
          "Leave on for 1-2 minutes to allow the oils to absorb",
          "Rinse thoroughly",
          "Use 2-3 times per week"
        ],
        whatsIncluded: "1 x 250g Cocoa Coffee Body Scrub in a sealed jar"
      },
      {
        name: "Hyaluronic Acid Hydrating Serum",
        slug: "hyaluronic-acid-hydrating-serum",
        sku: "SKU-006",
        description: "Our Hyaluronic Acid Serum provides deep hydration by drawing moisture into the skin. It's especially formulated for Ghana's climate, delivering lasting hydration without feeling heavy or greasy.",
        shortDescription: "Deep hydration for dry skin",
        price: 195.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        gallery: [],
        categoryId: 1,
        brandId: 4,
        rating: 4.0,
        reviewCount: 7,
        stockStatus: "in_stock",
        isBestSeller: false,
        isNew: true,
        isOrganic: false,
        size: "30ml",
        productType: "Serum",
        madeIn: "Ghana",
        shelfLife: "12 months",
        ingredients: "Water, Hyaluronic Acid (multiple molecular weights), Glycerin, Aloe Vera, Cucumber Extract, Panthenol, Natural Preservatives",
        highlights: [
          "Contains multiple forms of hyaluronic acid for multi-depth hydration",
          "Instantly plumps skin and reduces fine lines",
          "Oil-free formula suitable for Ghana's humid climate"
        ],
        perfectFor: [
          "Dehydrated skin that needs moisture",
          "Fine lines and early signs of aging",
          "Use under makeup for dewy finish"
        ],
        whyGhanaLovesIt: "Even in our humid climate, skin can become dehydrated. Ghanaians love this serum because it provides moisture without heaviness - perfect for layering under other products in any season.",
        importantNotes: "For maximum effectiveness, apply to slightly damp skin. Keep tightly sealed to prevent oxidation.",
        howToUse: [
          "After cleansing, leave skin slightly damp",
          "Apply 2-3 drops to face and neck",
          "Gently pat in with fingertips",
          "Follow with moisturizer to seal in hydration",
          "Can be used morning and night"
        ],
        whatsIncluded: "1 x 30ml Hyaluronic Acid Hydrating Serum in a glass dropper bottle"
      },
      {
        name: "Turmeric Brightening Mask",
        slug: "turmeric-brightening-mask",
        sku: "SKU-007",
        description: "Harness the power of turmeric, a traditional ingredient used for centuries to brighten skin. Our mask combines turmeric with modern ingredients to reduce dark spots, even skin tone, and give your skin a radiant glow.",
        shortDescription: "Reduces dark spots & evens tone",
        price: 110.00,
        originalPrice: null,
        image: "https://pixabay.com/get/g777bff75728a7699d5b344fbd5dd426b2a8f25f5740c2c654b2028c9fb2be604b14dbad64f03c3171199a202bc8c8e16482dbd38e3a73db488d049190c59aa93_1280.jpg",
        gallery: [],
        categoryId: 1,
        brandId: 2,
        rating: 4.5,
        reviewCount: 12,
        stockStatus: "in_stock",
        isBestSeller: false,
        isNew: true,
        isOrganic: true,
        size: "100g",
        productType: "Face Mask",
        madeIn: "Ghana",
        shelfLife: "6 months",
        ingredients: "Kaolin Clay, Turmeric Extract, Licorice Root Extract, Honey, Aloe Vera, Vitamin C, Natural Preservatives",
        highlights: [
          "Turmeric helps reduce dark spots and hyperpigmentation",
          "Clay draws out impurities without over-drying",
          "Honey and aloe provide soothing hydration"
        ],
        perfectFor: [
          "Uneven skin tone and dark spots",
          "Dull, tired-looking skin",
          "Weekly treatment for brighter complexion"
        ],
        whyGhanaLovesIt: "Turmeric has been used in African beauty traditions for generations. This mask has been formulated to provide the brightening benefits of turmeric without the yellow staining that raw turmeric can cause.",
        importantNotes: "Patch test before use. May cause slight tingling which is normal. Despite our formulation, turmeric may still cause temporary yellow tint on very light skin - this washes off easily.",
        howToUse: [
          "Apply to cleansed, dry face with fingers or brush",
          "Avoid eye and lip area",
          "Leave on for 10-15 minutes",
          "Rinse thoroughly with warm water",
          "Use 1-2 times per week"
        ],
        whatsIncluded: "1 x 100g Turmeric Brightening Mask in a sealed jar"
      },

    ];
    
    for (const product of productsData) {
      this.createProduct(product);
    }
    
    // Reviews
    const reviewsData: InsertReview[] = [
      {
        productId: 1,
        userId: 0,
        rating: 5,
        title: "Amazing product!",
        comment: "I was skeptical about ordering skincare online, but Body Enhance exceeded my expectations! The vitamin C serum I ordered has completely transformed my skin. My dark spots are fading and my skin glows like never before. Delivery to Kumasi was super fast too!",
        author: "Akosua M.",
        location: "Kumasi",
        isVerified: true
      },
      {
        productId: 2,
        userId: 0,
        rating: 5,
        title: "Best body butter ever",
        comment: "The free consultation service was incredibly helpful! The expert recommended products specifically for my skin concerns during harmattan season. The Ghanaian Shea Body Butter is now my holy grail product - no more dry, ashy skin even in the driest weather. Fast delivery to Tamale too!",
        author: "Fatima A.",
        location: "Tamale",
        isVerified: true
      },
      {
        productId: 3,
        userId: 0,
        rating: 5,
        title: "Great for men",
        comment: "As a man, I was hesitant to invest in skincare products but the Men's Complete Facial Kit has changed my perspective completely. My skin feels fresh, looks clearer, and the dark patches around my jawline have significantly reduced. The products are perfect for Ghana's humid climate.",
        author: "Kwame O.",
        location: "Accra",
        isVerified: true
      }
    ];
    
    for (const review of reviewsData) {
      this.createReview(review);
    }
    
    // Testimonials
    const testimonialsData: InsertTestimonial[] = [
      {
        rating: 5,
        text: "I was skeptical about ordering skincare online, but Body Enhance exceeded my expectations! The vitamin C serum I ordered has completely transformed my skin. My dark spots are fading and my skin glows like never before. Delivery to Kumasi was super fast too!",
        customerName: "Akosua M.",
        location: "Kumasi",
        product: "Vitamin C Brightening Serum",
        initials: "AM",
        isVerified: true
      },
      {
        rating: 5,
        text: "As a man, I was hesitant to invest in skincare products but the Men's Complete Facial Kit has changed my perspective completely. My skin feels fresh, looks clearer, and the dark patches around my jawline have significantly reduced. The products are perfect for Ghana's humid climate.",
        customerName: "Kwame O.",
        location: "Accra",
        product: "Men's Complete Facial Kit",
        initials: "KO",
        isVerified: true
      },
      {
        rating: 4.5,
        text: "The free consultation service was incredibly helpful! The expert recommended products specifically for my skin concerns during harmattan season. The Ghanaian Shea Body Butter is now my holy grail product - no more dry, ashy skin even in the driest weather. Fast delivery to Tamale too!",
        customerName: "Fatima A.",
        location: "Tamale",
        product: "Ghanaian Shea Body Butter",
        initials: "FA",
        isVerified: true
      }
    ];
    
    for (const testimonial of testimonialsData) {
      this.createTestimonial(testimonial);
    }
  }
}

export const storage = new MemStorage();
