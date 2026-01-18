import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import formatCurrency from '../utils/formatCurrency';

const Cart = () => {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <div className="text-gray-600">Total: <strong>{formatCurrency(cartTotal)}</strong></div>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center">
          <p className="mb-4">Your cart is empty.</p>
          <Link to="/" className="text-indigo-600 font-semibold">Continue shopping</Link>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-xl space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <div className="text-gray-500">{item.price} × {item.quantity}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{formatCurrency(item.price * item.quantity)}</div>
                <button onClick={() => removeFromCart(item.id)} className="mt-2 text-sm text-red-600">Remove</button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-4">
            <button onClick={clearCart} className="text-sm text-gray-600">Clear Cart</button>
            <button onClick={() => navigate('/checkout')} disabled={cart.length === 0} className={`px-6 py-2 rounded-lg text-white ${cart.length === 0 ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
