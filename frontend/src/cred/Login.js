import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';
import { useStateContext } from '../context/StateContext';

const API_URL = 'http://localhost:3001';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { setUserEmail } = useStateContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserEmail(email);
        navigate('/');
      } else {
        if (data.errors) {
          setEmailError(data.errors.email);
          setPasswordError(data.errors.password);
        }
      }
    }
    catch (err) {
      console.log(err);
      setEmailError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className='l'>Log In</label>
        <label className='email'>Email</label>
        <input 
          name='email' 
          placeholder='Enter email' 
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className='email error'>{emailError}</div>
        <label className='password'>Password</label>
        <input 
          name='password' 
          placeholder='Enter password' 
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='password error'>{passwordError}</div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login;