import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
//import { Audio } from 'react-loader-spinner';
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';
import CartContext from '../../context/CartContext';
import Header from '../Header';
import SimilarProductItem from '../SimilarProductItem';
import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const ProductItemDetails = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [similarProductsData, setSimilarProductsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [quantity, setQuantity] = useState(1);

  const cartContext = useContext(CartContext);

  useEffect(() => {
    console.log('Product ID:', id);
    getProductData();
  }, [id]);

  const getFormattedData = data => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  });

  const getProductData = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get('jwt_token');
    const apiUrl = `https://apis.ccbp.in/products/${id}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };
    try {
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const fetchedData = await response.json();
        const updatedData = getFormattedData(fetchedData);
        console.log(fetchedData)
        const updatedSimilarProductsData = fetchedData.similar_products.map(eachSimilarProduct =>
          getFormattedData(eachSimilarProduct)
        );
        setProductData(updatedData);
        setSimilarProductsData(updatedSimilarProductsData);
        setApiStatus(apiStatusConstants.success);
     
      } else if (response.status === 404) {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const renderLoadingView = () => (
    <div className="products-details-loader-container">
      {/*<Audio height="80" width="80" radius="9" color="green" ariaLabel="loading" wrapperStyle wrapperClass />*/}
      <Loader distance={30} color='blue'/>

    </div>
  );

  const renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  );

  const onDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const onIncrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const renderProductDetailsView = () => (
    <div className='m-3 m-md-0 d-flex flex-column justify-content-center p-2'>
    <div  className="product-details-success-view ">
      <div className=' d-md-flex flex-md-row justify-content-md-between d-sm-flex flex-sm-column '>
        <div className='w-50'>
          {productData.imageUrl && <img src={productData.imageUrl} alt={productData.title} className='productImg '/>}
        </div>  
        <div className='w-75'>
            <h1 className='mt-1'>{productData.title}</h1>
            <p className=''>{productData.description}</p>
            <h4 className='mt-3'>Price:₹ {productData.price}</h4>      
            <button className='mt-2 btn btn-warning' style={{color:"#ffffff",fontSize:"16px",fontWeight:"550"}} onClick={() => cartContext.addCartItem({ ...productData, quantity })}>Add to Cart</button>
        </div>    
      </div>
     </div> 
      <div className="similar-products ">
        
        <div className='d-flex flex-column  m-md-4 p-md-5'>
        <div className='mt-5 p-4'>
         <h2>Similar Products</h2>
        </div>
        <div className='d-md-flex d-md-row justify-content-md-between d-sm-flex flex-sm-row justify-content-sm-between mt-5 '>
          {similarProductsData.map(eachSimilarProduct => (
            <SimilarProductItem
              key={eachSimilarProduct.id}
              productDetails={eachSimilarProduct}
            />
          ))}
        </div>
         
        </div>
      </div>
    </div>
  );

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <>    
      <div className='product-item-details-container-bg'>
        <Header />
        <div className="product-item-details-container">{renderProductDetails()}</div>
      </div>     
      
    </>
  );
};

export default ProductItemDetails;
