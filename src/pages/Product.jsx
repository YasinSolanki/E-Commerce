import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductById, getProducts } from '../data/products';
import formatCurrency from '../utils/formatCurrency';

const Product = () => {
  const { id } = useParams();
  const productId = id || '1';

  const product = getProductById(productId) || {
    id: productId,
    name: 'Unknown Product',
    price: 0,
    description: 'No description available',
    image: 'https://via.placeholder.com/800',
    reviews: 0
  };

  const { addToCart } = useCart();

  return (
    <div className="grid md:grid-cols-2 gap-12 items-start">
      {/* Image Gallery */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
        <img src={product.image} alt={product.name} className="w-full h-auto rounded-xl object-cover" />
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="text-gray-500">({product.reviews} reviews)</span>
          </div>
        </div>

        <p className="text-4xl font-bold text-indigo-600">{formatCurrency(product.price)}</p>

        <p className="text-gray-600 leading-relaxed">
          {product.description}
        </p>

        <div className="pt-6 border-t border-gray-100">
          <div className="flex gap-4">
            <button onClick={() => addToCart(product)} className="flex-1 bg-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-200">
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button className="px-6 py-4 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Related / more products */}
      <section className="mt-12 container mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">You may also like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {getProducts().filter(p => String(p.id) !== String(product.id)).slice(0,8).map(p => (
            <Link to={`/product/${p.id}`} key={p.id} className="bg-white rounded-lg border p-3 flex flex-col items-center hover:shadow-md transition">
              <div className="w-full aspect-square overflow-hidden bg-gray-100 mb-2">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-sm font-medium text-center">{p.name}</div>
              <div className="text-xs text-gray-500 mt-1">{formatCurrency(p.price)}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Product;
