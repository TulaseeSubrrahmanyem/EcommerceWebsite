import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Products from './components/Products';
import ProductItemDetails from './components/ProductItemDetails';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import OrderItems from './components/OrderItems';
import OrderDetails from './components/Orders';
import CartContext from './context/CartContext';
import Cookie from 'js-cookie';

const App = () => {
  const navigate = useNavigate();

  const getInitialCart = () => {
    const storedCart = localStorage.getItem('cart');
    try {
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Error parsing cart data:', error);
      return [];
    }
  };

  const [cartList, setCartList] = useState(getInitialCart);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookie.get('jwt_token');
    setLoggedIn(!!token);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartList));
  }, [cartList]);

  const updateCartList = (updatedList) => {
    setCartList(updatedList);
  };

  const removeAllCartItems = () => {
    updateCartList([]);
  };

  const updateCartItemQuantity = (id, quantity) => {
    updateCartList((prevCartList) =>
      prevCartList.map((item) =>
        id === item.id ? { ...item, quantity: item.quantity + quantity } : item
      )
    );
  };

  const removeCartItem = (id) => {
    updateCartList((prevCartList) => prevCartList.filter((item) => item.id !== id));
  };

  const addCartItem = (product) => {
    const existingProduct = cartList.find((item) => item.id === product.id);

    if (existingProduct) {
      updateCartItemQuantity(product.id, product.quantity);
    } else {
      updateCartList((prevCartList) => [...prevCartList, product]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        updateCartItemQuantity,
        removeAllCartItems,
      }}
    >
      <Routes>
        {loggedIn ? (
          <>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/products/:id" element={<ProductItemDetails />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/orderItems" element={<OrderItems />} />
            <Route exact path="/orders" element={<OrderDetails />} />
          </>
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartContext.Provider>
  );
};

export default App;
