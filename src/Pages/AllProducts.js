import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCards from '../Components/ProductCards';

import {
  getProducts,
} from '../actions/products.action';
import { useParams } from 'react-router-dom';




export default function AllProducts() {

  const [loadProducts, setLoadProducts] = useState(true);
  const category = String(useParams().category);
  const [filter, setFilter] = useState({ category: category === 'all' ? '' : category, genre: '' });
  const [sort, setSort] = useState('');
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProductsReducer);
  
  const onSort = (option) => {
    console.log('onSort');
    switch(option) {
      case 'az': products.sort();
      break;
      case 'za': products.sort().reverse();
      break;
      case 'low-high': products.sort((a, b) => a.price - b.price);
      break;
      case 'high-low': products.sort((a, b) => a.price - b.price).reverse();
      break;
      case 'best-sales': products.sort();
      break;
      case 'newest': products.sort();
      break;
      default: 
      break;
    }
    setLoadProducts(!loadProducts);
  }
  
  useEffect(() => {
    dispatch(getProducts(undefined, filter.category, filter.genre, sort));
  }, [sort, filter, loadProducts, dispatch]);



  return (
    <div className='home'>
      <h1>Products</h1>
      Filter <select className="form-select w-25 d-inline" onChange={(e) => { setFilter({ ...filter, category: e.target.value }) }}>
        <option value="">All</option>
        <option value="PS4">PS4</option>
        <option value="PS5">PS5</option>
        <option value="XBOX">XBOX</option>
        <option value="Switch">Switch</option>
      </select>
      <select className="form-select w-25 d-inline" onChange={(e) => { setFilter({ ...filter, genre: e.target.value }) }}>
        <option value="">All</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Fighting">Fighting</option>
        <option value="Racing">Racing</option>
        <option value="Role">Role</option>
        <option value="Shooter">Shooter</option>
        <option value="Sport">Sport</option>
        <option value="Strategy">Strategy</option>
        <option value="Other">Other</option>
      </select>
      {' '}Sort by {' '}
      <select className="form-select w-25 d-inline" onChange={(e) => { setSort(e.target.value) }}>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
        <option value="low-high">Low-High</option>
        <option value="high-low">High-Low</option>
        <option value="best-sales">Best Sales</option>
        <option value="newest">New Release</option>
      </select>
      <ProductCards products={products} />
    </div>
  )
}
