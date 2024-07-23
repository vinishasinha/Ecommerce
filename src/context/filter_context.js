
import { createContext, useContext, useReducer, useEffect } from "react";
import {useProductContext} from '../context/productContex'
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value:"lowest",
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  // to set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

   // to set the list view
   const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

// sorting functin
const sorting=(event)=>{
  let userValue=event.target.value;
  dispatch({type:"GET_SORT_VALUE",payload:userValue})
};

//sort the products
useEffect(()=>{
  dispatch({type:"SORTING_PRODUCTS"})
// eslint-disable-next-line
},[state.sorting_value]);


  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{ ...state,sorting, setGridView ,setListView}}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
