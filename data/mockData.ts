export interface ICategory {
  _id: string;
  name: string;
  slug: string;
}

export interface IProduct {
  _id: string;
  productID: string;
  name: string;
  category: string; // ObjectId represented as string
  brand: string | null;
  price: number;
  discount: number;
  finalPrice: number;
  description: string;
  images: Array<{ url: string; publicId: string }>;
  thumbnail: { url: string; publicId: string };
  stock: number;
  isTrending: boolean;
  isFlashDeal: boolean;
  isCombo: boolean;
  tags: string[];
  status: "active" | "inactive" | "draft" | "archived";
  createdAt: string;
  updatedAt: string;
}

// Simulated Database Category References
export const MOCK_CATEGORIES: ICategory[] = [
  { _id: "65f8a2b5b3a8c12345678901", name: "Audio", slug: "audio" },
  { _id: "65f8a2b5b3a8c12345678902", name: "Peripherals", slug: "peripherals" },
  { _id: "65f8a2b5b3a8c12345678903", name: "Wearables", slug: "wearables" },
  { _id: "65f8a2b5b3a8c12345678904", name: "Components", slug: "components" },
];

// Mock Products matching mongoose structure
export const MOCK_PRODUCTS: IProduct[] = [
  {
    _id: "65f8b502b3a8c12345678911",
    productID: "PROD-2026-A1",
    name: "Aura Pro ANC Wireless Headphones",
    category: "65f8a2b5b3a8c12345678901", // Audio
    brand: "AuraSound",
    price: 250,
    discount: 10, // 10% off
    finalPrice: 225, // calculated
    description: "Premium spatial audio with hybrid active noise cancellation, smart ambient tuning, and 40-hour deep battery life.",
    images: [
      { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80", publicId: "products/headphones_angle" },
      { url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80", publicId: "products/headphones_back" }
    ],
    thumbnail: {
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      publicId: "products/headphones_thumb"
    },
    stock: 24,
    isTrending: true,
    isFlashDeal: false,
    isCombo: false,
    tags: ["wireless", "anc", "high-res", "audio"],
    status: "active",
    createdAt: "2026-01-15T08:30:00.000Z",
    updatedAt: "2026-02-10T14:22:00.000Z"
  },
  {
    _id: "65f8b502b3a8c12345678912",
    productID: "PROD-2026-K2",
    name: "Tactile Key Custom Mechanical Keyboard",
    category: "65f8a2b5b3a8c12345678902", // Peripherals
    brand: "KeebsCorp",
    price: 140,
    discount: 0,
    finalPrice: 140,
    description: "A compact 75% mechanical layout equipped with hot-swappable tactile switches, double-shot PBT keycaps, and dual-mode wireless connectivity.",
    images: [
      { url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80", publicId: "products/keyboard_main" }
    ],
    thumbnail: {
      url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
      publicId: "products/keyboard_thumb"
    },
    stock: 12,
    isTrending: false,
    isFlashDeal: false,
    isCombo: false,
    tags: ["keyboard", "mechanical", "gaming", "peripherals"],
    status: "active",
    createdAt: "2026-01-20T09:15:00.000Z",
    updatedAt: "2026-02-12T11:45:00.000Z"
  },
  {
    _id: "65f8b502b3a8c12345678913",
    productID: "PROD-2026-M3",
    name: "Viper Ultralight Wireless Mouse",
    category: "65f8a2b5b3a8c12345678902", // Peripherals
    brand: "VoltTech",
    price: 90,
    discount: 20, // 20% off
    finalPrice: 72,
    description: "Ultra-lightweight chassis featuring zero-latency optical switches, high-accuracy tracking sensor, and custom PTFE glide skates.",
    images: [
      { url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&q=80", publicId: "products/mouse_main" }
    ],
    thumbnail: {
      url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&q=80",
      publicId: "products/mouse_thumb"
    },
    stock: 5,
    isTrending: true,
    isFlashDeal: true, // Appears on deal layouts
    isCombo: false,
    tags: ["mouse", "gaming", "lightweight"],
    status: "active",
    createdAt: "2026-01-22T10:00:00.000Z",
    updatedAt: "2026-02-14T08:12:00.000Z"
  },
  {
    _id: "65f8b502b3a8c12345678914",
    productID: "PROD-2026-W4",
    name: "Horizon Smart Watch Series 4",
    category: "65f8a2b5b3a8c12345678903", // Wearables
    brand: null, // Null test cases
    price: 320,
    discount: 15, // 15% off
    finalPrice: 272,
    description: "All-day biological diagnostics tracking, on-board GPS, dynamic notification widgets, and water-resistant materials ready for any outdoor routine.",
    images: [
      { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80", publicId: "products/watch_main" }
    ],
    thumbnail: {
      url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      publicId: "products/watch_thumb"
    },
    stock: 0, // Testing out-of-stock badge
    isTrending: false,
    isFlashDeal: false,
    isCombo: false,
    tags: ["smartwatch", "wearable", "fitness"],
    status: "active",
    createdAt: "2026-01-25T11:20:00.000Z",
    updatedAt: "2026-02-15T09:30:00.000Z"
  },
  {
    _id: "65f8b502b3a8c12345678915",
    productID: "PROD-2026-C5",
    name: "Ultimate Streamer Setup Combo Pack",
    category: "65f8a2b5b3a8c12345678902", // Peripherals
    brand: "NexusBundle",
    price: 380,
    discount: 25, // 25% off bundle savings
    finalPrice: 285,
    description: "An inclusive equipment combo matching the Tactile Keyboard, Ultralight Mouse, and premium high-fidelity desk microphone.",
    images: [
      { url: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=600&q=80", publicId: "products/combo_main" }
    ],
    thumbnail: {
      url: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=600&q=80",
      publicId: "products/combo_thumb"
    },
    stock: 8,
    isTrending: true,
    isFlashDeal: false,
    isCombo: true, // Marked as combo
    tags: ["combo", "streaming", "peripherals", "bundle"],
    status: "active",
    createdAt: "2026-02-01T14:00:00.000Z",
    updatedAt: "2026-02-18T10:00:00.000Z"
  }
];