
import { createContext, useContext, useReducer, useEffect } from "react";
import {useProductContext} from '../context/productContex'
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value:"lowest",
  filters:{
    text:"",
    category:"all",
    company:"all",
    color:"all",
    maxprice:0,
    price:0,
    minprice:0,

  }
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

//update the filter values
const updateFilterValue=(event)=>{
  let name=event.target.name;
  let value=event.target.value;

  return dispatch({type:"UPDATE_FILTER_VALUE",payload:{name,value}})

};

// to clear the filter
const clearFilters =()=>{
  dispatch({type:"CLEAR_FILTERS"});
}






//sort the products
useEffect(()=>{
  dispatch({type:"FILTER_PRODUCTS"})
  dispatch({type:"SORTING_PRODUCTS"})
// eslint-disable-next-line
},[state.sorting_value,state.filters]);


  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{ ...state,clearFilters,sorting, setGridView ,setListView,updateFilterValue}}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
