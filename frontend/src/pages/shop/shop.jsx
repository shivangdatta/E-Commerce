import React from 'react';
import Product from './product';
import './shop.css';
import { useStateContext } from '../../context/StateContext';

const Shop = () => {
  const { products, cartItems, searchTerm, priceRange, handleAddToCart, isLoading } = useStateContext();

  console.log('Shop component rendered. Products:', products);
  console.log('isLoading:', isLoading);

  const filterProducts = (product) => {
    const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      matchesPrice = product.price >= min && (max ? product.price <= max : true);
    }
    return matchesSearch && matchesPrice;
  };

  const productsArray = Array.isArray(products) ? products : [];
  const filteredProducts = productsArray.filter(filterProducts);

  console.log('Filtered products:', filteredProducts);

  return (
    <div className='shop-container'>
      <div className='shopTitle'>
        <h1>Shad's Shop</h1>
      </div>
      <div className='products'>
        {isLoading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product
              key={product.id}
              data={product}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <div>
            <p>No products available.</p>
            <p>Products array length: {productsArray.length}</p>
            <p>Search term: {searchTerm}</p>
            <p>Price range: {priceRange}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;