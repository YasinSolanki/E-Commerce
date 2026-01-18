const STORAGE_KEY = 'my-ecommerce:products:v1';

const defaultProducts = [
  { id: 1, name: 'Minimalist Watch', price: 120.00, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80' },
  { id: 2, name: 'Leather Bag', price: 250.00, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80' },
  { id: 3, name: 'Wireless Headphones', price: 199.00, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80' },
  { id: 4, name: 'Designer Sunglasses', price: 150.00, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80' },
];

export function getProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
      // stored value is invalid — reset
      console.warn('Products storage invalid, resetting to defaults');
    }
  } catch (e) {
    console.warn('Failed to read products from storage', e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
  return defaultProducts;
}

export function saveProducts(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  // notify any listeners (UI can re-fetch)
  window.dispatchEvent(new Event('products:update'));
}

export function addProduct(product) {
  const list = getProducts().slice();
  const nextId = list.length ? Math.max(...list.map(p => p.id)) + 1 : 1;
  const newProduct = { id: nextId, ...product };
  list.push(newProduct);
  saveProducts(list);
  return newProduct;
}

export function removeProduct(id) {
  const list = getProducts().filter(p => p.id !== id);
  saveProducts(list);
}

export function getProductById(id) {
  return getProducts().find(p => String(p.id) === String(id));
}

// Sync across tabs/windows
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) {
    window.dispatchEvent(new Event('products:update'));
  }
});
