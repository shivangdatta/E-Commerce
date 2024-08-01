import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const StateContext = createContext();

const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
});

export const StateProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [productImages, setProductImages] = useState({});
  const [userEmail, setUserEmail] = useState(null);

  const unsplashAccessKey = 'oPiAI7fXetcRhoSM5OsL1nvUNiVSwvFrt_FeVF4sjBk';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Attempting to fetch products...');
        const response = await axios.get('http://localhost:3001/');
        const productsArray = response.data.prod || [];
        console.log('Processed products array:', productsArray);
        
        setProducts(productsArray);
        fetchProductImages(productsArray);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const fetchProductImages = async (products) => {
    const images = {};
    console.log('Unsplash Access Key:', unsplashAccessKey);

    for (const product of products) {
      try {
        console.log(`Fetching image for ${product.product_name}`);
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query: product.product_name,
            per_page: 1,
          },
          headers: {
            Authorization: `Client-ID ${unsplashAccessKey}`
          }
        });
        console.log(`Response for ${product.product_name}:`, response.data);
        if (response.data.results.length > 0) {
          images[product.id] = response.data.results[0].urls.small;
        } else {
          console.log(`No images found for ${product.product_name}`);
        }
      } catch (error) {
        console.error(`Error fetching image for ${product.product_name}:`, error.response ? error.response.data : error.message);
      }
    }
    setProductImages(images);
  };

  const handleAddToCart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(prev => {
      const newCount = Math.max((prev[itemId] || 0) - 1, 0);
      if (newCount === 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newCount };
    });
  };

  const handleUpdateCartItemCount = (itemId, newAmount) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: newAmount
    }));
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const handlePriceFilterChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  const logout = async () => {
    try {
      await api.get('/logout');
      setUserEmail(null);
      // You might want to clear other user-related states here
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <StateContext.Provider value={{
      products,
      cartItems,
      searchTerm,
      priceRange,
      isLoading,
      productImages,
      userEmail,
      handleAddToCart,
      handleRemoveFromCart,
      handleUpdateCartItemCount,
      handleSearchChange,
      handlePriceFilterChange,
      setUserEmail,
      logout
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);