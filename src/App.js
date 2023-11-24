import React, { useState, useEffect , useCallback, useMemo} from 'react';
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
import './App.css';
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
    if (token) {
      setLoggedIn(true);
      
    } else {
      setLoggedIn(false);
    }
  }, []);

  // useEffect(() => {
  //   if (!loggedIn) {
  //     navigate('/login');
  //   }
  // }, [loggedIn, navigate]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartList));
  }, [cartList]);

  const removeAllCartItems = () => {
    setCartList([]);
  };

  const incrementCartItemQuantity = (id) => {
    setCartList((prevCartList) =>
      prevCartList.map((eachCartItem) =>
        id === eachCartItem.id
          ? { ...eachCartItem, quantity: eachCartItem.quantity + 1 }
          : eachCartItem
      )
    );
  };

  const decrementCartItemQuantity = (id) => {
    setCartList((prevCartList) => {
      const productObject = prevCartList.find((eachCartItem) => eachCartItem.id === id);
      if (productObject.quantity > 1) {
        return prevCartList.map((eachCartItem) =>
          id === eachCartItem.id
            ? { ...eachCartItem, quantity: eachCartItem.quantity - 1 }
            : eachCartItem
        );
      } else {
        return prevCartList.filter((eachCartItem) => eachCartItem.id !== id);
      }
    });
  };

  const removeCartItem = (id) => {
    const updatedCartList = cartList.filter((eachCartItem) => eachCartItem.id !== id);
    setCartList(updatedCartList);
  };

  const addCartItem = (product) => {
    const productObject = cartList.find((eachCartItem) => eachCartItem.id === product.id);

    if (productObject) {
      setCartList((prevCartList) =>
        prevCartList.map((eachCartItem) =>
          productObject.id === eachCartItem.id
            ? { ...eachCartItem, quantity: eachCartItem.quantity + product.quantity }
            : eachCartItem
        )
      );
    } else {
      setCartList((prevCartList) => [...prevCartList, product]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      <Routes>
        {/* Routes based on authentication status */}
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
          // Redirect to login if not authenticated
          <>
          <Route path="/" element={<Navigate to="/login" />} />
          </>
        )}
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartContext.Provider>
  );
};

export default App;
