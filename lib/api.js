const BASE = "https://api.abcz.workers.dev/api/bazardor";

async function fetchJson(endpoint) {
  try {
    const res = await fetch(`${BASE}${endpoint}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(
        `API request failed (${res.status} ${res.statusText}): ${endpoint}`,
      );
    }

    return await res.json();
  } catch (error) {
    console.error(`Failed to load ${endpoint}:`, error);
    return null;
  }
}

export async function getProducts() {
  const data = await fetchJson("/products");
  if (!data) return [];
  return Array.isArray(data) ? data : data.products || [];
}

export async function getCategories() {
  const data = await fetchJson("/categories");
  if (!data) return [];
  return Array.isArray(data) ? data : data.categories || [];
}

export async function getProductsByCategory(slug) {
  const data = await fetchJson(
    `/products?category=${encodeURIComponent(slug)}`,
  );
  if (!data) return [];
  return Array.isArray(data) ? data : data.products || [];
}

export async function getProduct(id) {
  return fetchJson(`/products/${encodeURIComponent(id)}`);
}
