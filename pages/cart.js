import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  updateItemQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from '@/context/CartSlice';

import CartItem from '@/components/CartItem/CartItem';
import CartSummary from '@/components/CartItem/CartSummary';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const freeShippingThreshold = 600;
  const remaining = Math.max(0, freeShippingThreshold - cartTotal).toFixed(2);

  const [couponCode, setCouponCode] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [error, setError] = useState(null);

  const validCoupons = {
    SAVE10: { discount: 0.1, type: 'percentage' },
    FREESHIP: { discount: 0, type: 'shipping', minAmount: freeShippingThreshold },
    '20OFF': { discount: 0.2, type: 'percentage' },
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setError('Please enter a coupon code');
      return;
    }

    const upperCode = couponCode.toUpperCase();
    setAppliedCoupon(null);
    setError(null);

    if (upperCode === 'FREESHIP' && cartTotal >= freeShippingThreshold) {
      setError('Coupon not applicable - you already qualify for free shipping');
      return;
    }

    const coupon = validCoupons[upperCode];
    if (!coupon) {
      setError('Invalid coupon code');
      return;
    }

    if (coupon.minAmount && cartTotal < coupon.minAmount) {
      setError(`Coupon requires minimum purchase of $${coupon.minAmount}`);
      return;
    }

    setAppliedCoupon(coupon);
    setCouponCode('');
  };

  const handleUpdateCart = async () => {
    setIsUpdating(true);
    setError(null);

    try {
      const invalidItems = cartItems.filter(
        (item) => item.quantity < 1 || item.quantity > 100
      );

      if (invalidItems.length > 0) {
        throw new Error('Some items have invalid quantities');
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Free Shipping Progress */}
        <div className="bg-white p-4 rounded shadow-sm mb-6">
          <p className="text-sm">
            {cartTotal >= freeShippingThreshold ? (
              <span className="text-green-600 font-bold">Congratulations! You qualify for free shipping</span>
            ) : (
              <>
                Add <span className="text-red-500 font-bold">${remaining}</span> to cart and get free shipping
              </>
            )}
          </p>
          <div className="h-1 bg-gray-200 rounded mt-2">
            <div
              className="h-1 rounded transition-all duration-300"
              style={{
                width: `${Math.min(100, (cartTotal / freeShippingThreshold) * 100)}%`,
                backgroundColor: cartTotal >= freeShippingThreshold ? '#10B981' : '#EF4444',
              }}
            />
          </div>
        </div>

        {/* Cart Table and Summary */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Table */}
          <div className="md:col-span-2 bg-white p-4 rounded shadow-sm">
            <div className="grid grid-cols-4 font-semibold text-gray-500 text-sm border-b pb-2 mb-4">
              <div className="col-span-2">Products</div>
              <div>Quantity</div>
              <div>Subtotal</div>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-8 col-span-4">
                <p className="text-gray-400 mb-4">Your cart is empty.</p>
              </div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={(id, qty) => dispatch(updateItemQuantity({ productId: id, newQuantity: qty }))}
                    onRemove={(id) => dispatch(removeFromCart(id))}
                  />
                ))}
              </>
            )}

            {cartItems.length > 0 && (
              <div className="mt-6 space-y-4">
                {error && (
                  <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                    {error}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="border rounded px-4 py-2 w-full sm:w-1/3"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setError(null);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                  />
                  <button
                    className="border px-4 py-2 rounded hover:bg-gray-100 w-full sm:w-auto"
                    onClick={handleApplyCoupon}
                  >
                    APPLY COUPON
                  </button>
                  <button
                    className={`bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 w-full sm:w-auto ${isUpdating ? 'opacity-70 cursor-not-allowed' : ''}`}
                    onClick={handleUpdateCart}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        UPDATING...
                      </span>
                    ) : 'UPDATE CART'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Summary */}
          <CartSummary
            subtotal={cartTotal}
            coupon={appliedCoupon}
            freeShippingEligible={cartTotal >= freeShippingThreshold}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;