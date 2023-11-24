import React, { useEffect, useState } from 'react';
import './index.css'; // Import your CSS file with different styles
import Header from '../Header';
import EmptyOrdersView from '../EmptyOrders';

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
   try{
    const storedOrderDetails = localStorage.getItem('cartList');
    if (storedOrderDetails) {
      setOrderDetails(JSON.parse(storedOrderDetails));
    } else {
      setOrderDetails([]); // Set an empty array if there's no data
    }
  } catch (error) {
    console.error('Error retrieving order details:', error);
    setOrderDetails([]); // Set an empty array in case of an error
  }
  }, []);

  const cancelOrder = (orderIndex) => {
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails.splice(orderIndex, 1);
    setOrderDetails(updatedOrderDetails);
    localStorage.setItem('cartList', JSON.stringify(updatedOrderDetails));
  };

  return (
    <>
    <Header/>
    <div className="order-details-container">
    <>
    <h2> Order Details</h2>
    </>     
      {orderDetails && orderDetails.length > 0 ?  (
        orderDetails.map((order, orderIndex) => (
          <div key={orderIndex} className="order-container">
          <h3>Order Items - Order {orderIndex + 1}</h3>
            <ul>
              {order.cartItems.map((item, itemIndex) => (
                <li key={itemIndex} className="order-item ">
                
                  <img src={item.imageUrl} alt={item.title} className="item-image" />
               
                    <div className='mt-5'>
                       <p>{item.title}</p>
                    </div>
                    <div className='mt-md-5'>
                      <p style={{color: "#0b69ff"}}>₹ {item.price}/-</p>
                    </div>
                   <div className='mt-md-5'>
                     <p>{item.quantity}</p>
                   </div>  
                   <div className='mt-md-3'>
                     <button onClick={() => cancelOrder(orderIndex)} className='btn btn-danger mt-md-4' style={{height:"40px"}}>Cancel Order</button>
                   </div>                                 
                </li>
              ))}
            </ul>
           
          </div>
        ))
      ) : (
          <>
          <EmptyOrdersView/>
          </>          
          
      )}
    </div>
    </>
  );
};

export default OrderDetails;
