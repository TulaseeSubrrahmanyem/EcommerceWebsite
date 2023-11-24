import React, { useEffect ,useState} from 'react';
import { useLocation } from 'react-router-dom';
import './index.css'
import Header from '../Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderItems = () => {
  const location = useLocation();
  const { state } = location;
  const cartItems = state ? state.cartItems : [];

  const [address, setAddress] = useState('');
  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log('Cart Items:', cartItems);
  }, [cartItems]);

  useEffect(() => {
    const storedAddress = localStorage.getItem('address');
    const storedIsCashOnDelivery = localStorage.getItem('isCashOnDelivery');

    if (storedAddress) {
      setAddress(storedAddress);
    }

    if (storedIsCashOnDelivery) {
      setIsCashOnDelivery(storedIsCashOnDelivery === 'true');
    }
  }, []);

  const handleBuyNow = () => {
    if (!address || !isCashOnDelivery) {
      setErrorMessage('Please enter address and select Cash on Delivery');
      return;
    }
    toast.success('Booking successful!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    const cartList = JSON.parse(localStorage.getItem('cartList')) || [];
    const newOrder = { address, isCashOnDelivery, cartItems };

    localStorage.setItem('address', address);
    localStorage.setItem('isCashOnDelivery', isCashOnDelivery);
    localStorage.setItem('cartList', JSON.stringify([...cartList, newOrder]));

    setAddress('');
    setIsCashOnDelivery(false);
    setErrorMessage('');
  };

  return (
    <>
    <Header />
    <div className="order-item">
    <div className=''>
        <h2 className='text-center' style={{backgroundClip:"#0967d2",padding:"10px",fontSize:"22px",fontWeight:"550"}}>Book Your Order</h2>
        {cartItems.length > 0 ? (cartItems.map((item) => (
        <div key={item.id} className='d-md-flex flex-md-row justify-content-md-between bookOrderCard'>
            <div className='m-3'>
              <img src={item.imageUrl} alt={item.title} className=" " />
            </div>
            <div className='m-4 orderItemDetailsContainer'>
                <p className='orderItemDetails '>Title<span >{item.title}</span></p>
                {/* <p>Description: {item.description}</p>*/}
                <p  className='orderItemDetails'>Price: <span > ₹ {item.price}/-</span></p>
                <p  className='orderItemDetails'>Quantity:<span >{item.quantity}</span> </p>
                <p  className='orderItemDetails'>Availability:<span >{item.availability}</span> </p>
                <p  className='orderItemDetails'>Brand: <span >{item.brand}</span></p>
                <p  className='orderItemDetails'>Rating: <span >{item.rating}</span></p>
                 {/* Address Input */}
          <div className='d-flex flex-column'> 
          
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address"
            style={{marginTop:"10px",marginBottom:"20px",height:"45px",outline:'none'}}
          />

          {/* Cash on Delivery Checkbox */}
          <div className=''>
          
            <input
              type="checkbox"
              checked={isCashOnDelivery}
              onChange={(e) => setIsCashOnDelivery(e.target.checked)}
              className='mr-3'
            />
            <label className='ml-3'> Cash on Delivery </label>
           </div>

          {/* Error Message */}
          {errorMessage && <p style={{ color: 'red',position:"static",marginTop:"15px" }}>{errorMessage}</p>}

          {/* Buy Now Button */}
          <button className='btn btn-primary' style={{height:"45px",marginTop:"15px"}} onClick={handleBuyNow}>Buy Now</button>
          </div>
            </div>    
        </div>
        ))):(<p>No items in the cart</p>)}
        
         
    </div>
     <ToastContainer className="toastContainer" />
    </div>
    </>
  );
};

export default OrderItems;
