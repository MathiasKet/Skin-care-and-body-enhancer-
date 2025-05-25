import { pgTable, text, serial, integer, boolean, doublePrecision, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  region: text("region"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  image: text("image"),
  productCount: integer("product_count").default(0),
});

export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
});

export const skinConcerns = pgTable("skin_concerns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const skinTypes = pgTable("skin_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  sku: text("sku").notNull().unique(),
  description: text("description"),
  shortDescription: text("short_description"),
  price: doublePrecision("price").notNull(),
  originalPrice: doublePrecision("original_price"),
  image: text("image").notNull(),
  gallery: json("gallery").$type<string[]>(),
  categoryId: integer("category_id").references(() => categories.id),
  brandId: integer("brand_id").references(() => brands.id),
  rating: doublePrecision("rating").default(0),
  reviewCount: integer("review_count").default(0),
  stockStatus: text("stock_status").default("in_stock"),
  isBestSeller: boolean("is_best_seller").default(false),
  isNew: boolean("is_new").default(false),
  isOrganic: boolean("is_organic").default(false),
  size: text("size"),
  productType: text("product_type"),
  madeIn: text("made_in"),
  shelfLife: text("shelf_life"),
  ingredients: text("ingredients"),
  highlights: json("highlights").$type<string[]>(),
  perfectFor: json("perfect_for").$type<string[]>(),
  whyGhanaLovesIt: text("why_ghana_loves_it"),
  importantNotes: text("important_notes"),
  howToUse: json("how_to_use").$type<string[]>(),
  whatsIncluded: text("whats_included"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const productSkinTypes = pgTable("product_skin_types", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  skinTypeId: integer("skin_type_id").references(() => skinTypes.id),
});

export const productSkinConcerns = pgTable("product_skin_concerns", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  skinConcernId: integer("skin_concern_id").references(() => skinConcerns.id),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  userId: integer("user_id").references(() => users.id),
  rating: integer("rating").notNull(),
  title: text("title"),
  comment: text("comment"),
  author: text("author").notNull(),
  location: text("location"),
  date: timestamp("date").defaultNow(),
  isVerified: boolean("is_verified").default(false),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  orderNumber: text("order_number").notNull().unique(),
  status: text("status").default("pending"),
  total: doublePrecision("total").notNull(),
  shippingFee: doublePrecision("shipping_fee").default(0),
  discount: doublePrecision("discount").default(0),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  shippingAddress: text("shipping_address").notNull(),
  shippingCity: text("shipping_city").notNull(),
  shippingRegion: text("shipping_region").notNull(),
  paymentMethod: text("payment_method").notNull(),
  paymentStatus: text("payment_status").default("pending"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id),
  productId: integer("product_id").references(() => products.id),
  productName: text("product_name").notNull(),
  productPrice: doublePrecision("product_price").notNull(),
  quantity: integer("quantity").notNull(),
  total: doublePrecision("total").notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  rating: doublePrecision("rating").notNull(),
  text: text("text").notNull(),
  customerName: text("customer_name").notNull(),
  location: text("location").notNull(),
  product: text("product").notNull(),
  initials: text("initials").notNull(),
  isVerified: boolean("is_verified").default(true),
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  skinType: text("skin_type"),
  skinConcerns: json("skin_concerns").$type<string[]>(),
  additionalInfo: text("additional_info"),
  preferredDate: text("preferred_date"),
  preferredTime: text("preferred_time"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertBrandSchema = createInsertSchema(brands).omit({
  id: true,
});

export const insertSkinConcernSchema = createInsertSchema(skinConcerns).omit({
  id: true,
});

export const insertSkinTypeSchema = createInsertSchema(skinTypes).omit({
  id: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  date: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

export const insertConsultationSchema = createInsertSchema(consultations).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletters).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertBrand = z.infer<typeof insertBrandSchema>;
export type Brand = typeof brands.$inferSelect;

export type InsertSkinConcern = z.infer<typeof insertSkinConcernSchema>;
export type SkinConcern = typeof skinConcerns.$inferSelect;

export type InsertSkinType = z.infer<typeof insertSkinTypeSchema>;
export type SkinType = typeof skinTypes.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultations.$inferSelect;

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;
