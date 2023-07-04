import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { Store } from '../components/Store';
import axios from 'axios';

export default function SignupScreen() {
  const Navigate = useNavigate();
  const { search } = useLocation();
  const redirectInURL = new URLSearchParams(search).get('redirect');
  const redirect = redirectInURL ? redirectInURL : '/';
  const [signup, setSignup] = useState();
  const { dispatch } = useContext(Store);
  const handleUpdate = (e) => {
    const { id, value } = e.target;
    setSignup((prvVal) => ({ ...prvVal, [id]: value }));
  };
  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (signup.pswd !== signup.confirmpswd) {
        toast.error('Password and Confirm Password field does not match');
        return;
      }
      const { data } = await axios.post('api/users/signup', signup);
      dispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      Navigate(redirect || '/');
    } catch (err) {
      toast.error('Email already exists');
    }
  };
  return (
    <div className="container-sm">
      <Helmet>
        <title>Sign-up now</title>
      </Helmet>
      <h1 className="my-3 text-center">Sign-up</h1>
      <form action="/shipping" onSubmit={SubmitHandler}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            className="form-control"
            id="name"
            type="text"
            placeholder="Enter full name"
            onChange={(e) => handleUpdate(e)}
            required
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email address
          </label>
          <input
            className="form-control"
            id="email"
            type="email"
            placeholder="Enter email address"
            onChange={(e) => handleUpdate(e)}
            required
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="pswd" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="pswd"
            placeholder="Set password"
            onChange={(e) => handleUpdate(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpswd" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmpswd"
            placeholder="Confirm password"
            onChange={(e) => handleUpdate(e)}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="notrobot"
            required
          />
          <label className="form-check-label" htmlFor="notrobot">
            <span className="mb-1 form-text">I'm not a robot</span>
          </label>
        </div>
        <button type="submit" className="mb-2 btn btn-primary">
          Submit
        </button>
        <div className="mb-3">
          <strong>Already a Customer?</strong>{' '}
          <Link className="Link" to="/signin?redirect=/shipping">
            Log-in
          </Link>
        </div>
      </form>
    </div>
  );
}
