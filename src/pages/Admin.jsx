import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, addProduct, removeProduct } from '../data/products';
import formatCurrency from '../utils/formatCurrency';

const safeGetProducts = () => {
  try {
    return getProducts();
  } catch (e) {
    console.error('Failed reading products:', e);
    return [];
  }
};

const Admin = () => {
  const [products, setProducts] = useState(() => safeGetProducts());
  const [form, setForm] = useState({ name: '', price: '', image: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const onUpdate = () => setProducts(safeGetProducts());
    window.addEventListener('products:update', onUpdate);
    return () => window.removeEventListener('products:update', onUpdate);
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.price) return setError('Name and price are required');
    const priceNum = Number(form.price);
    if (Number.isNaN(priceNum)) return setError('Price must be a number');
    try {
      addProduct({ name: form.name, price: priceNum, image: form.image || 'https://via.placeholder.com/300' });
      setForm({ name: '', price: '', image: '' });
      setProducts(safeGetProducts());
    } catch (e) {
      console.error(e);
      setError('Failed to add product');
    }
  };

  const handleRemove = (id) => {
    if (!window.confirm('Remove product?')) return;
    try {
      removeProduct(id);
      setProducts(safeGetProducts());
    } catch (e) {
      console.error(e);
      setError('Failed to remove product');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6 md:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your store's inventory and products.</p>
        </div>
        <Link to="/" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-lg transition-colors border border-indigo-100">
          &larr; Back to Website
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleAdd} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
        <h2 className="text-xl font-bold text-gray-800">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Product Name</label>
            <input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Minimalist Watch"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Price (INR)</label>
            <input
              value={form.price}
              onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
              placeholder="120.00"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Image URL</label>
          <input
            value={form.image}
            onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
            placeholder="https://images.unsplash.com/..."
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
          />
        </div>
        <div className="flex justify-end pt-2">
          <button type="submit" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transform active:scale-95 transition-all">
            Add Product
          </button>
        </div>
      </form>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Inventory</h2>
          <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">{products.length} Products</span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-400 font-medium">No products in inventory yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {products.map(p => (
              <div key={p.id} className="group flex items-center justify-between py-4 transition-all">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-gray-100">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{p.name}</div>
                    <div className="text-indigo-600 font-semibold">{formatCurrency(p.price)}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(p.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Remove product"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
