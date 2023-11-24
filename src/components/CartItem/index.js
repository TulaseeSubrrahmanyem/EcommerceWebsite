import React, { useContext } from 'react';
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import CartContext from '../../context/CartContext';
import { useNavigate } from 'react-router-dom'; 
import './index.css';

const CartItem = (props) => {
  const value = useContext(CartContext);
  const navigate = useNavigate();
  const {
    cartList,
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = value;

  const { cartItemDetails} = props;
  const { id, title, brand, quantity, price, imageUrl } = cartItemDetails;

  const onClickDecrement = () => {
    decrementCartItemQuantity(id);
  };

  const onClickIncrement = () => {
    incrementCartItemQuantity(id);
  };

  const onRemoveCartItem = () => {
    removeCartItem(id);
  };
  const onCartItemClicked = () => {
    console.log("Check out button click")
    const clickedItem = cartList.find(item => item.id === cartItemDetails.id);
    if (clickedItem) {
      navigate('/orderItems', { state: { cartItems: [clickedItem] } });
      console.log('Clicked Cart Item:', clickedItem);
    }
   
  };
  const totalPrice = price * quantity;

  return (
    <li  className="cart-item" >
   
    <div>
      <img className="cart-product-image" src={imageUrl} alt={title} />
    </div>
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{title}</p>
          <p className="cart-product-brand">by {brand}</p>
        </div>
        <div className="cart-quantity-container mr-5">
          <button
            type="button"
            className="quantity-controller-button"
            onClick={onClickDecrement}
          >
            <BsDashSquare color="#52606D" size={12} />
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button
            type="button"
            className="quantity-controller-button"
            onClick={onClickIncrement}
          >
            <BsPlusSquare color="#52606D" size={12} />
          </button>
          <button className="btn btn-warning d-sm-block d-md-none" style={{width:"88px",height:"30px",color:"#ffffff",fontWeight:"500",fontSize:"12px", marginLeft:"40px"}} type="button" onClick={onCartItemClicked}>
            <p>Place order</p>
        </button>
        </div>
        <div className="total-price-remove-container">
          <p className="cart-total-price">Rs {totalPrice}/-</p>
          
          <button className="remove-button bold" type="button" onClick={onRemoveCartItem}>
            Remove
          </button>
        </div>
      </div>
    
        <button className="btn btn-warning d-sm-none d-md-block" style={{height:"35px",color:"#ffffff",fontWeight:"500",marginLeft:"50px"}} type="button" onClick={onCartItemClicked}>
            <p>Place order</p>
        </button>
        <button className="delete-button" type="button" onClick={onRemoveCartItem}>
          <AiFillCloseCircle color="#FF0000" size={20} />
      </button>
    </li>
  );
};

export default CartItem;
