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
            Elevate Your Style <br /> With Modern Essentials.
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
      <section className="py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Trending Now</h2>
            <p className="text-gray-500 font-medium max-w-xl">Curated selection of our best-selling products this week. Experience the perfect blend of style and function.</p>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <button className="px-6 py-2 bg-gray-100 border border-transparent rounded-full font-bold text-sm text-gray-700 hover:bg-gray-200 transition whitespace-nowrap">Watches</button>
            <button className="px-6 py-2 bg-gray-100 border border-transparent rounded-full font-bold text-sm text-gray-700 hover:bg-gray-200 transition whitespace-nowrap">Accessories</button>
            <button className="ml-2 px-8 py-2.5 bg-indigo-600 rounded-full font-extrabold text-sm text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 whitespace-nowrap">Shop All Products</button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">No products found. Use the Admin panel to add some.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
            {products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="group">
                <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-indigo-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full ring-1 ring-gray-900/5 hover:ring-indigo-600/20">
                  <div className="aspect-[4/5] overflow-hidden bg-gray-50 relative m-2 rounded-[1.5rem]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  </div>
                  <div className="p-6 pt-2 flex flex-col flex-grow">
                    <h3 className="font-bold text-gray-900 text-lg md:text-xl mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">{product.name}</h3>
                    <div className="mt-auto">
                      <p className="text-gray-500 font-black text-base md:text-lg">{formatCurrency(product.price)}</p>
                    </div>
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
