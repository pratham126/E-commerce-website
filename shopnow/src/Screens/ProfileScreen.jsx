import React, { useContext, useReducer, useState } from 'react';
import { Store } from '../components/Store';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_REQUEST':
      return { ...state, Userloading: true };
    case 'USER_SUCCESS':
      return { ...state, Userloading: false };
    case 'USER_FAIL':
      return { ...state, Userloading: false };
    default:
      return state;
  }
};

const ProfileScreen = () => {
  const [{ Userloading }, dispatch] = useReducer(reducer, {
    Userloading: false,
  });
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const { userInfo } = state;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (profile.password !== profile.confirmpswd && profile.password !== '') {
        toast.error('Password and Confirm Password field does not match');
        return;
      } else {
        dispatch({ type: 'USER_REQUEST' });
        const { data } = await axios.put(
          'https://e-commerce-website-backend-iawo.onrender.com/api/users/profile',
          {
            name: profile.name,
            email: profile.email,
            password: profile.password,
          },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'USER_SUCCESS' });
        ctxdispatch({ type: 'USER_SIGNIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        toast.success('Profile updated successfully');
      }
    } catch (err) {
      dispatch({ type: 'USER_FAIL' });
      toast.error(err.message);
    }
  };
  const [profile, setprofile] = useState(userInfo);
  const handleChanges = (e) => {
    const { id, value } = e.target;
    setprofile((prvValue) => ({ ...prvValue, [id]: value }));
  };
  return (
    <div className="container-sm">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3 text-center">User Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            className="form-control"
            id="name"
            type="text"
            onChange={(e) => {
              handleChanges(e);
            }}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="email">
            Email address
          </label>
          <input
            className="form-control"
            id="email"
            type="email"
            onChange={(e) => {
              handleChanges(e);
            }}
            required
          />
        </div>
        <h3 className="my-3">Change Password</h3>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            id="password"
            type="password"
            onChange={(e) => {
              handleChanges(e);
            }}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="confirmpswd">
            Confirm Password
          </label>
          <input
            className="form-control"
            id="confirmpswd"
            type="password"
            onChange={(e) => {
              handleChanges(e);
            }}
          />
        </div>
        <div className="form-group mb-3">
          <button className="btn btn-primary" type="Submit">
            Save
          </button>
          {Userloading && <LoadingBox />}
        </div>
      </form>
    </div>
  );
};

export default ProfileScreen;
