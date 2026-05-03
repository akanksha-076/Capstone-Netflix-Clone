import React, { useState } from 'react';
import { auth } from '../Services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate('/profiles');
  } catch (err) {
    setError('Invalid email or password. Please try again.');
  }
};

const handleSignUp = async () => {
  setError('');
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    navigate('/profiles');
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div className="login">
      <div className="login__background">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
        />
        <div className="login__form__container">
          <form className="login__form" onSubmit={handleLogin}>
            <h1>Sign In</h1>
            {error && <p className="login__error">{error}</p>}
            <input
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login__button">
              Sign In
            </button>
            <p className="login__signup">
              New to Netflix?{' '}
              <span onClick={handleSignUp}>Sign up now</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;