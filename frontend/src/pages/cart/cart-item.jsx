import React from 'react';

const CartItem = ({ data, cartItems, onRemove, onAdd, onUpdateCount, image }) => {
  const { id, product_name, price } = data;
  const itemCount = cartItems[id] || 0;

  return (
    <div className='cartItem'>
      {image && <img src={image} alt={product_name} className="cart-item-image" />}
      <div className='description'>
        <p>
          <b>{product_name}</b>
        </p>
        <p>${price.toFixed(2)}</p>
        <div className='countHandler'>
          <button onClick={() => onRemove(id)}>-</button>
          <input 
            value={itemCount} 
            onChange={(e) => {
              const newCount = Math.max(0, parseInt(e.target.value) || 0);
              onUpdateCount(id, newCount);
            }} 
          />
          <button onClick={() => onAdd(id)}>+</button>
        </div>
      </div>
      <p>Total: ${(price * itemCount).toFixed(2)}</p>
    </div>
  );
};

export default CartItem;