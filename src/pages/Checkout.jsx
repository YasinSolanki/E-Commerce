import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import formatCurrency from '../utils/formatCurrency';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const placeOrder = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    clearCart();
    setLoading(false);
    setSuccess(true);
    // Optionally redirect after a short delay
    setTimeout(() => navigate('/'), 1500);
  };

  if (success) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Thank you — order placed!</h1>
        <p className="text-gray-600">Your order has been received. You will be redirected to the homepage shortly.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {/* format import added below */}

      <div className="bg-white p-6 rounded-xl">
        <h2 className="font-semibold mb-4">Order summary</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.price} × {item.quantity}</div>
                  </div>
                </div>
                <div className="font-semibold">{formatCurrency(item.price * item.quantity)}</div>
              </div>
            ))}

            <div className="pt-4 border-t flex items-center justify-between">
              <div className="text-gray-600">Total</div>
              <div className="font-bold">{formatCurrency(cartTotal)}</div>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={placeOrder} disabled={loading} className={`px-6 py-2 rounded-lg text-white ${loading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                {loading ? 'Placing Order…' : 'Place Order'}
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Checkout;
