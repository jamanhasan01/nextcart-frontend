import { MOCK_PRODUCTS, MOCK_CATEGORIES, IProduct, ICategory } from "@/data/mockData";

// Simulate network latency (e.g. 500ms)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  getProducts: async (filters?: { category?: string; query?: string }): Promise<IProduct[]> => {
    await delay(500);
    let results = [...MOCK_PRODUCTS];

    if (filters?.category && filters.category !== "All") {
      results = results.filter(p => p.category === filters.category);
    }

    if (filters?.query) {
      const q = filters.query.toLowerCase();
      results = results.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q))
      );
    }

    return results;
  },

  getCategories: async (): Promise<ICategory[]> => {
    await delay(300);
    return MOCK_CATEGORIES;
  }
};