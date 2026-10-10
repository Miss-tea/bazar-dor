const BASE = "https://api.api-store.workers.dev/api/bazardor";

async function fetchJson(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    throw new Error(`API request failed (${res.status} ${res.statusText}): ${path}`);
  }

  return res.json();
}

export function getProducts() {
  return fetchJson("/products");
}

export function getCategories() {
  return fetchJson("/categories");
}

export function getProductsByCategory(slug) {
  return fetchJson(`/products/category/${encodeURIComponent(slug)}`);
}

export function getProduct(id) {
  return fetchJson(`/products/${encodeURIComponent(id)}`);
}
