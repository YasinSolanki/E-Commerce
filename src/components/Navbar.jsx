import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
            <ShoppingBag size={22} />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            DemoSite
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10 font-semibold text-gray-500">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-indigo-600 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2 sm:gap-4 font-medium">
          <Link to="/login" className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all flex items-center gap-2">
            <User size={20} />
            <span className="hidden lg:inline text-sm">Account</span>
          </Link>

          <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>

          <Link to="/admin" className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all text-sm">
            Admin
          </Link>

          <Link to="/cart" className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all relative flex items-center gap-2">
            <div className="relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden lg:inline text-sm">Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
