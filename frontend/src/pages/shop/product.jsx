import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useStateContext } from '../../context/StateContext';

const Product = ({ data, cartItems, onAddToCart }) => {
  const { id, product_name, price } = data;
  const cartItemAmount = cartItems[id] || 0;
  const { productImages } = useStateContext();

  return (
    <div className='product'>
      {productImages[id] && (
        <LazyLoadImage
          src={productImages[id]}
          alt={product_name}
          effect="blur"
          className="product-image"
        />
      )}
      <div className='description'>
        <p>
          <b>{product_name}</b>
        </p>
        <p>${price}</p>
      </div>
      <button className='addToCartBttn' onClick={() => onAddToCart(id)}>
        Add to Cart{cartItemAmount > 0 && <> ({cartItemAmount})</>}
      </button>
    </div>
  );
};

export default Product;