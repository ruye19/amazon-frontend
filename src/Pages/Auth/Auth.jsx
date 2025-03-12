import React, { useContext, useState, useEffect } from 'react';
import classes from './Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../utility/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { DataContext } from '../../components/dataProvider/DataProvider';
import { ClipLoader } from 'react-spinners';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);

  // Retrieve redirect path from localStorage (if any)
  const [redirectPath, setRedirectPath] = useState(localStorage.getItem('redirectAfterLogin') || '');

  // Clear redirect path after rendering to avoid message staying forever
  useEffect(() => {
    if (redirectPath) {
      localStorage.removeItem('redirectAfterLogin');
    }
  }, [redirectPath]);

  const authHandler = async (e, action) => {
    e.preventDefault();

    try {
      if (action === "sign in") {
        setLoading({ signIn: true, signUp: false });
        const userInfo = await signInWithEmailAndPassword(auth, email, password);
        dispatch({ type: "SET_USER", user: userInfo.user });
        navigate(redirectPath || '/');
        setRedirectPath(''); // Clear redirectPath state
        setLoading({ signIn: false, signUp: false });
      } else {
        setLoading({ signIn: false, signUp: true });
        const userInfo = await createUserWithEmailAndPassword(auth, email, password);
        dispatch({ type: "SET_USER", user: userInfo.user });
        navigate(redirectPath || '/');
        setRedirectPath(''); // Clear redirectPath state
        setLoading({ signIn: false, signUp: false });
      }
    } catch (err) {
      console.log("Error:", err.message);
      setError(err.message);
      setLoading({ signIn: false, signUp: false });
    }
  };

  return (
    <>
      <Link to="/" className={classes.imgClass}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo" />
      </Link>

      <div className={classes.signIn}>
        {/* Conditionally render message only if coming from /orders */}
        {redirectPath === '/orders' && (
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <small style={{ color: 'green', fontSize: '13px', fontWeight: 'bold' }}>
              Log in to your account to see what you ordered
            </small>
          </div>
        )}

        <h1>Sign in</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            id="email"
          />
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            id="password"
          />

          <button className={classes.btn1} onClick={(e) => authHandler(e, "sign in")}>
            {loading.signIn ? <ClipLoader color="white" size={15} /> : 'Sign in'}
          </button>

          <p>
            By signing in, you agree to Amazon clone's Conditions of Use and Privacy Notice and our internet-based Ads Notice.
          </p>

          <button className={classes.btn2} onClick={(e) => authHandler(e, "sign up")}>
            {loading.signUp ? <ClipLoader color="white" size={15} /> : 'Create your Amazon Account'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Auth;
