import React, { useState } from 'react'
import axios from 'axios'
import './auth.css'

const API_URL = 'http://localhost:3001';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL
});

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset errors
    setEmailError('');
    setPasswordError('');

    try {
      const response = await api.post('/signup', { email, password });
      const data = response.data;
      console.log(data);
      if (data.errors) {
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
      }
      if (data.user) {
        window.location.assign('/');
      }
    }
    catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.errors) {
        setEmailError(err.response.data.errors.email);
        setPasswordError(err.response.data.errors.password);
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className='l'>Sign Up</label>
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
        <button type="submit">signup</button>
      </form>
    </div>
  )
}

export default Signup