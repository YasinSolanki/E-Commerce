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
      <section>
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
          <a href="#" className="text-indigo-600 font-medium hover:underline">View all</a>
        </div>

        <div className="mb-4 text-sm text-gray-500">Products found: {products.length}</div>
        {products.length === 0 ? (
          <div className="bg-white p-8 rounded-xl">No products found. Use the Admin panel to add some.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                  <div className="aspect-[4/5] overflow-hidden bg-gray-50 relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    <div className="absolute top-2 left-2">
                      <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-0.5 rounded shadow-sm text-indigo-600 uppercase tracking-wider">New</span>
                    </div>
                  </div>
                  <div className="p-3 md:p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3 h-3 ${i < 4 ? 'text-orange-400 fill-orange-400' : 'text-gray-300 fill-gray-300'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-[10px] text-gray-400 ml-1">(42)</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                    <div className="mt-auto">
                      <p className="text-indigo-600 font-extrabold text-base md:text-lg">{formatCurrency(product.price)}</p>
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
