import React from 'react';
import CartItem from './cart-item';
import './cart.css';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context/StateContext';

const Cart = () => {
  const { cartItems, products, handleRemoveFromCart, handleAddToCart, handleUpdateCartItemCount, productImages } = useStateContext();
  const navigate = useNavigate();

  const productsArray = Array.isArray(products) ? products : [];

  const getTotalCartAmount = () => {
    return productsArray.reduce((total, product) => {
      if (cartItems[product.id] > 0) {
        return total + (cartItems[product.id] * product.price);
      }
      return total;
    }, 0);
  };

  const totalAmount = getTotalCartAmount();

  const cartProducts = productsArray.filter((product) => cartItems[product.id] > 0);

  return (
    <div className='cart-container'>
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className='cart'>
        {cartProducts.map((product) => (
          <CartItem 
            key={product.id} 
            data={product} 
            cartItems={cartItems}
            onRemove={handleRemoveFromCart}
            onAdd={handleAddToCart}
            onUpdateCount={handleUpdateCartItemCount}
            image={productImages[product.id]}
          />
        ))}
      </div>
      {totalAmount > 0 ? (
        <div className='checkout'>
          <p>Subtotal: ${totalAmount.toFixed(2)}</p>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
          <button>Checkout</button>
        </div>
      ) : (
        <h1>Your Cart is Empty</h1>
      )}
    </div>
  );
};

export default Cart;