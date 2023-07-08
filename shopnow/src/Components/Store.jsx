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
    paymentMethod: localStorage.getItem('paymentMethod')
      ? JSON.parse(localStorage.getItem('paymentMethod'))
      : '',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_CART':
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
    case 'REMOVE_FROM_CART':
      const Item = action.payload;
      const newcartItems = state.cart.cartItems.filter(
        (item) => item._id !== Item._id
      );
      localStorage.setItem('cartItems', JSON.stringify(newcartItems));
      return { ...state, cart: { ...state.cart, cartItems: newcartItems } };
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
      };
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };
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
