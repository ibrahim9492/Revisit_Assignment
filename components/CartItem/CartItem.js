import React from "react";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) return;
    const newQuantity = Math.max(1, Math.min(100, value));
    onUpdateQuantity(item.id, newQuantity);
  };

  const handleBlur = (e) => {
    if (e.target.value === '' || parseInt(e.target.value, 10) < 1) {
      onUpdateQuantity(item.id, 1);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  const handleAddOneMore = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="grid grid-cols-4 items-center py-4 border-b text-sm">
      {/* Product */}
      <div className="col-span-2 flex gap-4 items-center">
        <button onClick={handleRemove} className="text-gray-400 hover:text-red-500">✕</button>

        <img
          src={item.image}
          alt={item.title}
          className="w-16 h-16 object-cover rounded"
        />

        <div>
          <p className="font-medium">{item.title}</p>
          {item.originalPrice && (
            <p className="text-gray-400 line-through">${item.originalPrice.toFixed(2)}</p>
          )}
          <p className="text-black font-bold">${item.price.toFixed(2)}</p>
          <button
            onClick={handleAddOneMore}
            className="text-xs text-red-500 hover:underline mt-1"
          >
            Add one more
          </button>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center border rounded w-fit mx-auto">
        <button onClick={handleDecrement} className="px-2 py-1">−</button>
        <input
          type="number"
          className="w-12 text-center outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          value={item.quantity}
          onChange={handleInputChange}
          onBlur={handleBlur}
          min={1}
          max={100}
        />
        <button onClick={handleIncrement} className="px-2 py-1">+</button>
      </div>

      {/* Subtotal */}
      <div className="text-center font-semibold">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;