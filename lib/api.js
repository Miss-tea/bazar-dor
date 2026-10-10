const API_URL = 'https://api.abcz.workers.dev/api/bazardor/products';

export async function getProducts() {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 60 } }); // Revalidates every 60s or dynamic
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.products || data || [];
  } catch (error) {
    console.error('Error fetching bazar products:', error);
    return [];
  }
}