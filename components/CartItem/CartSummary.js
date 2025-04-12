import React from "react";

const CartSummary = ({ subtotal, coupon = null, freeShippingEligible = false }) => {
  const discount = coupon?.type === "percentage" ? coupon.discount : 0;
  const discountName = coupon ? Object.entries({
    SAVE10: { discount: 0.1, type: 'percentage' },
    FREESHIP: { discount: 0, type: 'shipping', minAmount: 1159.69 },
    "20OFF": { discount: 0.2, type: 'percentage' }
  }).find(([_, val]) => val.discount === coupon.discount && val.type === coupon.type)?.[0] : null;

  const discountedAmount = subtotal * discount;
  const total = subtotal - discountedAmount;

  return (
    <div className="bg-white p-4 rounded shadow-sm text-sm">
      <h2 className="font-semibold text-black text-base mb-4">Cart Totals</h2>

      <div className="flex justify-between border-b py-2">
        <span className="text-gray-500">Subtotal</span>
        <span className="text-black font-semibold">${subtotal.toFixed(2)}</span>
      </div>

      {discount > 0 && (
        <div className="flex justify-between border-b py-2 text-green-600 font-medium">
          <span>Discount {discountName ? `(${discountName})` : ''}</span>
          <span>- ${discountedAmount.toFixed(2)}</span>
        </div>
      )}

      {coupon?.type === "shipping" && (
        <div className="flex justify-between border-b py-2 text-green-600 font-medium">
          <span>Free Shipping Coupon {discountName ? `(${discountName})` : ''}</span>
          <span>$0.00</span>
        </div>
      )}

      <div className="py-4 border-b">
        <p className="text-gray-500 mb-2">Shipping</p>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="shipping" defaultChecked />
            {freeShippingEligible ? "Free Shipping" : "Standard Shipping"}
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="shipping" />
            Flat Rate
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="shipping" />
            Local Pickup
          </label>
          <p className="text-xs text-gray-400 mt-2">Shipping options will be updated during checkout</p>
          <button className="text-xs font-medium underline text-black mt-2">
            Calculate Shipping
          </button>
        </div>
      </div>

      <div className="flex justify-between py-4">
        <span className="text-black font-medium">Total</span>
        <span className="text-black font-bold">${total.toFixed(2)}</span>
      </div>

      <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded">
        PROCEED TO CHECKOUT
      </button>
    </div>
  );
};

export default CartSummary;