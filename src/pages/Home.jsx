import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../data/products';
import formatCurrency from '../utils/formatCurrency';

const Home = () => {
  const [products, setProducts] = useState(() => getProducts());

  useEffect(() => {
    const onUpdate = () => setProducts(getProducts());
    window.addEventListener('products:update', onUpdate);
    return () => window.removeEventListener('products:update', onUpdate);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-indigo-600 rounded-2xl overflow-hidden shadow-xl mb-12 text-white py-20 px-8 text-center md:text-left relative">
        <div className="md:w-1/2 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Elevate Your Style <br/> With Modern Essentials.
          </h1>
          <p className="text-indigo-100 text-lg mb-8 max-w-md">
            Discover our curated collection of premium accessories designed for the modern individual.
          </p>
          <Link to="/product/1" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg inline-block">
            Shop Now
          </Link>
        </div>
        {/* Decorative Circle */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500 rounded-full opacity-50 blur-3xl"></div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
          <a href="#" className="text-indigo-600 font-medium hover:underline">View all</a>
        </div>

        <div className="mb-4 text-sm text-gray-500">Products found: {products.length}</div>
        {products.length === 0 ? (
          <div className="bg-white p-8 rounded-xl">No products found. Use the Admin panel to add some.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100">
                  <div className="aspect-square overflow-hidden bg-gray-200">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-gray-500">{formatCurrency(product.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
