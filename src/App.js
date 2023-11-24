import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate,useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Products from './components/Products';
import ProductItemDetails from './components/ProductItemDetails';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import OrderItems from './components/OrderItems';
import OrderDetails from './components/Orders';
import CartContext from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute'
import Cookie from 'js-cookie';

const App = () => {
  const navigate=useNavigate()
  const [cartList, setCartList] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    try {
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Error parsing cart data:', error);
      return [];
    }
  });

  // const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   const token = Cookie.get('jwt_token');
  //   setLoggedIn(!!token);
   
  // }, []);


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
          <Route element={<ProtectedRoute/>}>
          
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductItemDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orderItems" element={<OrderItems />} />
              <Route path="/orders" element={<OrderDetails />} />
          </Route>
           
          <Route path="/login" element={<LoginForm />} />
          <Route path="/notfound" element={<NotFound />} />
        </Routes>
       
   </CartContext.Provider>
  );
};

export default App;