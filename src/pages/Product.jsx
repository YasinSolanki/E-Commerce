import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, MapPin, Truck, ShieldCheck, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductById, getProducts } from '../data/products';
import formatCurrency from '../utils/formatCurrency';

const Product = () => {
  const { id } = useParams();
  const productId = id || '1';

  const product = getProductById(productId) || {
    id: productId,
    name: 'Premium Product',
    price: 13999,
    description: 'Experience unparalleled comfort and style with this premium design. Crafted with high-quality materials to ensure durability and a luxury feel.',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e277?q=80&w=1000&auto=format&fit=crop',
    reviews: 580
  };

  const { addToCart } = useCart();
  const mrp = product.price * 3.42;
  const discount = 71;

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-4 font-sans text-gray-900">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 overflow-x-auto whitespace-nowrap pb-2 border-b border-gray-100">
        <Link to="/" className="hover:text-indigo-600 hover:underline">Home</Link>
        <ChevronRight size={10} />
        <span className="hover:text-indigo-600 hover:underline cursor-pointer">Furniture</span>
        <ChevronRight size={10} />
        <span className="hover:text-indigo-600 hover:underline cursor-pointer">Living Room</span>
        <ChevronRight size={10} />
        <span className="font-bold text-gray-700">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-5 flex flex-col md:flex-row gap-4 lg:sticky lg:top-24">
          <div className="hidden md:flex flex-col gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-16 h-16 rounded-lg border-2 overflow-hidden cursor-pointer hover:border-indigo-500 transition-all shadow-sm ${i === 0 ? 'border-indigo-500' : 'border-gray-100'}`}>
                <img src={product.image} className="w-full h-full object-cover" alt="thumb" />
              </div>
            ))}
          </div>
          <div className="flex-grow bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover hover:scale-110 transition-transform duration-700 cursor-zoom-in" />
          </div>
        </div>

        {/* Center: Detail Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border-b border-gray-100 pb-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 leading-tight mb-3">
              {product.name} | Modern Ergo-Design Series Premium Finish
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded-lg">
                <span className="font-black text-indigo-700 text-sm">4.1</span>
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} className={i < 4 ? "" : "text-gray-200"} />)}
                </div>
              </div>
              <span className="text-sm font-semibold text-indigo-600 hover:text-orange-600 cursor-pointer">580 ratings</span>
              <div className="h-4 w-px bg-gray-200"></div>
              <span className="bg-gray-900 text-white px-2 py-1 text-[10px] font-black rounded-md tracking-tighter">PREMIUM CHOICE</span>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-2xl inline-block border border-red-100">
            <div className="flex items-baseline gap-2">
              <span className="text-red-600 text-4xl font-black">-{discount}%</span>
              <span className="text-4xl font-black">{formatCurrency(product.price)}</span>
            </div>
            <p className="text-sm text-gray-500 font-medium">M.R.P.: <span className="line-through">{formatCurrency(mrp)}</span></p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-gray-100 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <p className="font-bold text-gray-800 text-sm">No Cost EMI</p>
              <p className="text-xs text-gray-500 mt-1">Avail savings of ₹1,405 on credit cards</p>
              <p className="text-xs text-indigo-600 font-black mt-3 flex items-center gap-1">SEE OFFERS <ChevronRight size={12} /></p>
            </div>
            <div className="p-4 border border-gray-100 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <p className="font-bold text-gray-800 text-sm">Bank Offer</p>
              <p className="text-xs text-gray-500 mt-1">10% instant discount on SBI credit cards</p>
              <p className="text-xs text-indigo-600 font-black mt-3 flex items-center gap-1">11 OFFERS <ChevronRight size={12} /></p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-black tracking-tight text-gray-900 uppercase">Product Highlights</h3>
            <ul className="space-y-3">
              {[
                'Advanced lumbar support for all-day comfort',
                'High-density memory foam cushioning',
                'Stain-resistant premium velvet fabric',
                'Reinforced steel frame with 5-year warranty'
              ].map((text, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600">
                  <ShieldCheck className="text-green-500 shrink-0" size={18} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Checkout Box */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 space-y-6 shadow-2xl lg:sticky lg:top-24">
            <div>
              <div className="text-4xl font-black text-gray-900">{formatCurrency(product.price)}</div>
              <div className="flex items-center gap-2 mt-2 font-bold text-sm">
                <Truck size={18} className="text-indigo-600" />
                <span className="text-indigo-600">FREE delivery</span>
                <span className="text-gray-900 underline">Thur, Feb 12</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <MapPin size={14} />
                <span>Delivering to Yasin - Mumbai 400001</span>
              </div>
            </div>

            <div className="inline-flex py-1 px-3 bg-green-50 text-green-700 text-sm font-black rounded-lg border border-green-100">
              IN STOCK
            </div>

            <div className="space-y-3">
              <button onClick={() => addToCart(product)} className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-4 rounded-2xl font-black shadow-lg shadow-yellow-100 active:scale-95 transition-all flex items-center justify-center gap-2">
                <ShoppingBag size={20} />
                ADD TO CART
              </button>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-orange-100 active:scale-95 transition-all">
                BUY NOW
              </button>
            </div>

            <div className="text-[11px] text-gray-400 font-bold uppercase tracking-widest space-y-3 pt-6 border-t border-gray-50">
              <div className="flex justify-between"><span>Ships from</span> <span className="text-gray-700">Eminence Intellitech</span></div>
              <div className="flex justify-between"><span>Sold by</span> <span className="text-indigo-600">Eminence Store</span></div>
              <div className="flex justify-between"><span>Returns</span> <span className="text-gray-700">30-Day Returnable</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <section className="mt-24 border-t border-gray-100 pt-16 mb-20">
        <h2 className="text-3xl font-black text-gray-900 mb-10 tracking-tight uppercase">Customers also viewed</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {getProducts().filter(p => String(p.id) !== String(product.id)).slice(0, 4).map(p => (
            <Link to={`/product/${p.id}`} key={p.id} className="group">
              <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 p-4 hover:shadow-2xl transition-all duration-500 h-full ring-1 ring-gray-900/5 hover:ring-indigo-600/20">
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-50 mb-6">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="px-2 pb-2">
                  <div className="text-lg font-black text-gray-900 line-clamp-1 mb-1 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{p.name}</div>
                  <div className="text-base font-bold text-gray-400">{formatCurrency(p.price)}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Product;
