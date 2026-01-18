import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tighter">
          DemoSite from Eminence Intellitech
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 font-medium text-gray-600">
          <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
          <Link to="/about" className="hover:text-indigo-600 transition">About</Link>
          <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <Link to="/login" className="text-gray-600 hover:text-indigo-600 flex items-center gap-2">
            <User size={20} />
            <span className="hidden md:inline text-sm font-medium">Account</span>
          </Link>
          <Link to="/admin" className="text-gray-600 hover:text-indigo-600 flex items-center gap-2 pr-4">Admin</Link>
          <Link to="/cart" className="text-gray-600 hover:text-indigo-600 relative flex items-center gap-2">
            <div className="relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>
              )}
            </div>
            <span className="hidden md:inline text-sm font-medium">Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
