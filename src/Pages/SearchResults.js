import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProducts } from '../actions/products.action';
import ProductCards from '../Components/ProductCards';


const SearchResults = () => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.allProductsReducer);
  const keyword = String(useParams().keyword);

  useEffect(() => {
    dispatch(getProducts(keyword, undefined));
  }, [dispatch, keyword]);

  return (
    <div className='home'>
          <h1>Search Results</h1>
          <ProductCards products={products} />
    </div>
  );
};

export default SearchResults;