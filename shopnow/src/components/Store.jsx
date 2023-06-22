import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    cart:{
        cartItems: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : []
    }
};

function reducer(state, action) {
    switch(action.type){
        case 'Update_cart':
            const newItem = action.payload;
            const itemExists = state.cart.cartItems.find(item => item._id === newItem._id);
            const cartItems = itemExists? state.cart.cartItems.map(item => item._id === newItem._id?newItem: item): [...state.cart.cartItems, newItem];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return {...state, cart: {...state.cart, cartItems}};
        case 'Remove_from_cart':
            const Item = action.payload;
            const newcartItems = state.cart.cartItems.filter((item)=> item._id !== Item._id);
            localStorage.setItem('cartItems', JSON.stringify(newcartItems));
            return {...state, cart: {...state.cart, cartItems: newcartItems}};
        default:
            return state;
    }
}

const StoreProvider = (props) =>{
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export default StoreProvider;