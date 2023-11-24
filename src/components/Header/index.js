import React, { useContext } from 'react';
import { Link, useNavigate,NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import CartContext from '../../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import './index.css';

const Header = () => {
  const navigate = useNavigate();
  const { cartList } = useContext(CartContext);

  const onClickLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  const renderCartItemsCount = () => {
    const cartItemsCount = cartList.length;

    return (
      <>
        {cartItemsCount > 0 && (
          <span className="cart-count-badge">{cartItemsCount}</span>
        )}
      </>
    );
  };

  return (
    <nav className="nav-header top-fixed">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://images.ctfassets.net/jicu8fwm4fvs/1lrtg12IpcEIn3YslqcOp6/141fa77f70c58b539ef062f0841fa091/amway_big.png?q=60&fm=png"
              alt="website logo"
            />
          </Link>

          <button
            type="button"
            className="nav-mobile-btn"
            onClick={onClickLogout}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="nav logout"
              className="nav-bar-img"
            />
          </button>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://images.ctfassets.net/jicu8fwm4fvs/1lrtg12IpcEIn3YslqcOp6/141fa77f70c58b539ef062f0841fa091/amway_big.png?q=60&fm=png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-menu-item">
              <NavLink to="/products" className="nav-link">
                Products
              </NavLink>
            </li>

            <li className="nav-menu-item">
              <NavLink to="/cart" className="nav-link">
                Cart
                {renderCartItemsCount()}
              </NavLink>
            </li>
            <li className="nav-menu-item">
            <NavLink to="/orders" className="nav-link">
              Orders
            </NavLink>
          </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <NavLink to="/" className="nav-link">
              <HomeIcon/>
            </NavLink>
          </li>

          <li className="nav-menu-item-mobile">
            <NavLink to="/products" className="nav-link">
              <ShoppingBagIcon/>
            </NavLink>
          </li>
          <li className="nav-menu-item-mobile">
            <NavLink to="/cart" className="nav-link">
             <ShoppingCartIcon/>
              {renderCartItemsCount()}
            </NavLink>
          </li>
          <li className="nav-menu-item-mobile">
          <NavLink to="/orders" className="nav-link">
           <ShopTwoIcon/>
            
          </NavLink>
        </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
