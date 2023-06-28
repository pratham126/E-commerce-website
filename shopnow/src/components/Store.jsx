import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  cart: {
    shippingAddress: localStorage.getItem('address')
      ? JSON.parse(localStorage.getItem('address'))
      : {},
    cartItems: localStorage.getItem('cartItems')  
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'Update_cart':
      const newItem = action.payload;
      const itemExists = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = itemExists
        ? state.cart.cartItems.map((item) =>
            item._id === newItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'Remove_from_cart':
      const Item = action.payload;
      const newcartItems = state.cart.cartItems.filter(
        (item) => item._id !== Item._id
      );
      localStorage.setItem('cartItems', JSON.stringify(newcartItems));
      return { ...state, cart: { ...state.cart, cartItems: newcartItems } };
    case 'User_Signin':
      return { ...state, userInfo: action.payload };
    case 'User_Signout':
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {} },
      };
    case 'Save_Shipping_address':
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    default:
      return state;
  }
}

const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

export default StoreProvider;
