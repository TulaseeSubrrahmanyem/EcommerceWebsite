import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './index.css';

const LoginForm = ({ history }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onChangeUsername = event => {
    setUsername(event.target.value);
  };

  const onChangePassword = event => {
    setPassword(event.target.value);
  };

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    });
   navigate('/');
  };

  const onSubmitFailure = errorMsg => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const submitForm = async event => {
    event.preventDefault();
    setUsername("rahul")
    setPassword("rahul@2021")
    const userDetails = { username: "rahul", password: "rahul@2021" };
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token);
    } else {
      //onSubmitFailure(data.error_msg);
      if (data && data.error_msg) {
        onSubmitFailure(data.error_msg);
      } else {
        onSubmitFailure('Unknown error occurred.');
      }
    }
  };

  const renderPasswordField = () => {
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };

  const renderUsernameField = () => {
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={onChangeUsername}
          placeholder="Username"
        />
      </>
    );
  };

  const jwtToken = Cookies.get('jwt_token');

  if (jwtToken !== undefined) {
    return navigate('/');
  }

  return (
    <div className="login-form-container">
      <img
        src="https://images.ctfassets.net/jicu8fwm4fvs/1lrtg12IpcEIn3YslqcOp6/141fa77f70c58b539ef062f0841fa091/amway_big.png?q=60&fm=png"
        className="login-website-logo-mobile-img"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-img"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://images.ctfassets.net/jicu8fwm4fvs/1lrtg12IpcEIn3YslqcOp6/141fa77f70c58b539ef062f0841fa091/amway_big.png?q=60&fm=png"
          className="login-website-logo-desktop-img"
          alt="website logo"
        />
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
