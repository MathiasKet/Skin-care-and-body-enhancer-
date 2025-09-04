interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isOrganic?: boolean;
  category: string;
  brand: string;
  skinConcerns: string[];
  skinTypes: string[];
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Glow Serum",
    slug: "glow-serum",
    description: "Brightening serum for a radiant complexion",
    price: 45.99,
    originalPrice: 59.99,
    image: "/images/IMG_7692.JPG",
    rating: 4.8,
    reviewCount: 124,
    isBestSeller: true,
    category: "Serums",
    brand: "Radiant Skin",
    skinConcerns: ["Dullness", "Uneven Tone"],
    skinTypes: ["Normal", "Dry", "Combination"]
  },
  {
    id: 2,
    name: "Hydrating Moisturizer",
    slug: "hydrating-moisturizer",
    description: "24-hour hydration for all skin types",
    price: 32.50,
    image: "/images/IMG_7693.JPG",
    rating: 4.6,
    reviewCount: 89,
    isNew: true,
    category: "Moisturizers",
    brand: "Pure Hydration",
    skinConcerns: ["Dryness", "Dehydration"],
    skinTypes: ["Dry", "Sensitive"]
  },
  {
    id: 3,
    name: "Charcoal Detox Mask",
    slug: "charcoal-detox-mask",
    description: "Deep cleansing mask for clear skin",
    price: 28.75,
    image: "/images/IMG_7694.JPG",
    rating: 4.7,
    reviewCount: 156,
    isBestSeller: true,
    isOrganic: true,
    category: "Masks",
    brand: "Nature's Touch",
    skinConcerns: ["Congested Pores", "Excess Oil"],
    skinTypes: ["Oily", "Combination"]
  },
  {
    id: 4,
    name: "Vitamin C Booster",
    slug: "vitamin-c-booster",
    description: "Antioxidant-rich serum for brightening",
    price: 52.99,
    image: "/images/IMG_7695.JPG",
    rating: 4.9,
    reviewCount: 201,
    isNew: true,
    category: "Serums",
    brand: "Radiant Skin",
    skinConcerns: ["Dullness", "Dark Spots"],
    skinTypes: ["Normal", "Dry", "Combination"]
  },
  {
    id: 5,
    name: "Gentle Cleansing Oil",
    slug: "gentle-cleansing-oil",
    description: "Removes makeup and impurities without stripping skin",
    price: 34.99,
    image: "/images/IMG_7696.JPG",
    rating: 4.5,
    reviewCount: 78,
    category: "Cleansers",
    brand: "Pure Hydration",
    skinConcerns: ["Dryness", "Sensitivity"],
    skinTypes: ["Dry", "Sensitive"]
  },
  {
    id: 6,
    name: "Overnight Repair Cream",
    slug: "overnight-repair-cream",
    description: "Intensive nighttime treatment for skin renewal",
    price: 65.50,
    image: "/images/IMG_7697.JPG",
    rating: 4.8,
    reviewCount: 142,
    isBestSeller: true,
    isOrganic: true,
    category: "Night Care",
    brand: "Nature's Touch",
    skinConcerns: ["Aging", "Dryness", "Fine Lines"],
    skinTypes: ["Normal", "Dry", "Mature"]
  },
  {
    id: 7,
    name: "Mineral Sunscreen SPF 50",
    slug: "mineral-sunscreen-spf50",
    description: "Broad spectrum protection with a lightweight feel",
    price: 29.99,
    image: "/images/IMG_7698.JPG",
    rating: 4.7,
    reviewCount: 215,
    isNew: true,
    category: "Sunscreen",
    brand: "Radiant Skin",
    skinConcerns: ["Sun Protection", "Sensitivity"],
    skinTypes: ["All Skin Types"]
  },
  {
    id: 8,
    name: "Exfoliating Toner",
    slug: "exfoliating-toner",
    description: "Gentle chemical exfoliation for smoother skin",
    price: 28.75,
    originalPrice: 35.00,
    image: "/images/IMG_7699.JPG",
    rating: 4.6,
    reviewCount: 93,
    category: "Toners",
    brand: "Pure Hydration",
    skinConcerns: ["Texture", "Dullness", "Congested Pores"],
    skinTypes: ["Oily", "Combination"]
  }
];
