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
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin — Products</h1>
        <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
          &larr; Back to Website
        </Link>
      </div>

      {error && <div className="text-red-600">{error}</div>}

      <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Product name" className="col-span-2 p-2 border rounded" />
          <input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="Price (number)" className="p-2 border rounded" />
        </div>
        <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="Image URL" className="w-full p-2 border rounded" />
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Add product</button>
        </div>
      </form>

      <div className="bg-white p-6 rounded-xl">
        <h2 className="font-semibold mb-4">Existing products</h2>
        {products.length === 0 ? (
          <div className="text-gray-600">No products yet. Add one above.</div>
        ) : (
          <div className="space-y-3">
            {products.map(p => (
              <div key={p.id} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-gray-500">{formatCurrency(p.price)}</div>
                  </div>
                </div>
                <div>
                  <button onClick={() => handleRemove(p.id)} className="text-sm text-red-600">Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
