import React, { useContext } from 'react';
import CartContext from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './index.css';

const CartSummary = () => {
  const navigate=useNavigate()
  const value = useContext(CartContext);
  const { cartList } = value;
 console.log(cartList)
  let total = 0;
  cartList.forEach((eachCartItem) => {
    total += eachCartItem.price * eachCartItem.quantity;
  });
  const handleOrder = () => {
    console.log("Check out button click")
    navigate('/orderItems', { state: { cartItems: cartList } });
    console.log('Cart Items:', cartList);
  };

  return (
    <>
      <div className="cart-summary-container">
        <h1 className="order-total-value">
          <span className="order-total-label">Order Total:</span> Rs {total}/-
        </h1>
        <p className="total-items">{cartList.length} Items in cart</p>
        <button type="button" className="checkout-button d-sm-none d-md-block" onClick={handleOrder}>
          Checkout
        </button>
      </div>
      <button type="button" className="checkout-button d-lg-none d-sm-block" onClick={handleOrder} >
        Checkout
      </button>
    </>
  );
};

export default CartSummary;
