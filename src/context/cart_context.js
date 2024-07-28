import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/cartReducer';

const CartContext =createContext();
const getLocalCartData = () => {
    let localCartData = localStorage.getItem("thapaCart");
    // eslint-disable-next-line
    if (localCartData ==[]) {
      return [];
    } else {
      return JSON.parse(localCartData);
    }
  };
  
  const initialState = {
    // cart: [],
    cart: getLocalCartData(),
    total_item: "",
    total_price: "",
    shipping_fee: 50000,
  };
const CartProvide=({children})=>{
    const [state,dispatch]=useReducer(reducer,initialState);
    
const addToCart=(id,color,amount,product)=>{
        dispatch({type:"ADD_TO_CART",payload:{id,color,amount,product}})
    };

const setDecrease=(id)=>{
    dispatch({type:"SET_DECREMENT",payload:id})
};

const setIncrease=(id)=>{
    dispatch({type:"SET_INCREASE",payload:id})
}
    
const removeItem=(id)=>{
    dispatch({type:"REMOVE_ITEM",payload:id});

}

const clearCart=()=>{
    dispatch({type:"CLEAR_CART"})
}

//localStorage
useEffect(() => {
    dispatch({type:"CART_TOTAL_ITEM"});
    dispatch({type:"CART_TOTAL_PRICE"})
    // dispatch({type:"CART_ITEM_PRICE_TOTAL"});
    localStorage.setItem("thapaCart", JSON.stringify(state.cart));
  }, [state.cart]);




    return <CartContext.Provider value={{...state,setDecrease,setIncrease,addToCart, clearCart,removeItem}}>
        {children}
    </CartContext.Provider>
};

const useCartContext=()=>{
    return useContext(CartContext);
}

export {CartProvide,useCartContext};