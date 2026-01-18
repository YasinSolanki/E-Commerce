import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <span className="text-2xl font-black text-indigo-600 tracking-tighter">
            Eminence Intellitech
          </span>
        </Link>

        {/* Desktop Links & Icons */}
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-8 font-bold text-sm text-gray-500 uppercase tracking-widest">
            <Link to="/about" className="hover:text-indigo-600 transition-colors">About</Link>
            <Link to="/login" className="hover:text-indigo-600 transition-colors">Account</Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/login" className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all">
              <User size={22} />
            </Link>
            <Link to="/admin" className="px-5 py-2 text-sm font-black text-gray-600 hover:text-indigo-600 transition-all uppercase tracking-tighter">
              Admin
            </Link>
            <Link to="/cart" className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-gray-200 group">
              <ShoppingBag size={18} className="group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-bold">Cart</span>
              {cartCount > 0 && (
                <span className="bg-white text-gray-900 text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center ml-1">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
