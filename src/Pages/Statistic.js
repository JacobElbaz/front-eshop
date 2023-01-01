import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { isEmpty } from '../Components/Utils';
import { allProducts, getProducts } from '../actions/products.action';
import { getOrders } from '../actions/orders.action';

function Statistic() {
  const [loadProducts, setLoadProducts] = useState(true);
  const category = String(useParams().category);
  const [filter, setFilter] = useState({
    category: category === 'all' ? '' : category,
    genre: '',
  });
  const [sort, setSort] = useState('');
  const [totalsales, setTotalSales] = useState(false);
  const dispatch = useDispatch();
  const allproduct = useSelector((state) => state.productReducer);
  const products = useSelector((state) => state.allProductsReducer);
  const orders = useSelector((state) => state.ordersReducer);
  useEffect(() => {
    dispatch(getProducts(undefined, filter.category, filter.genre, sort));
    dispatch(allProducts());
    dispatch(getOrders());
  }, [sort, filter, loadProducts, totalsales, dispatch]);
  const sumBenefits = (allproduct) => {
    let sum = 0;
    for (let i = 0; i < allproduct.length; i++) {
      sum += allproduct[i].price * allproduct[i].sales;
    }
    return sum;
  }

  const sumOrders = () => {
    return orders.length;
  }

  const sumSales = () => {
    let sum = 0;
    for (let i = 0; i < allproduct.length; i++) {
      sum += allproduct[i].sales;
    }
    return sum;
  } 

  return (
    <div className="m-5">
      <Row>
        <h1>Statistics</h1>
        <Col><h5>Total orders: {sumOrders()}</h5></Col>
        <Col><h5>Total sales: {sumSales()}</h5></Col>
        <Col><h5>Total benefits: ${sumBenefits(allproduct)}</h5></Col>
      </Row>
      Filter{' '}
      <select
        className="form-select w-25 d-inline"
        onChange={(e) => {
          setFilter({ ...filter, category: e.target.value });
          setTotalSales(false);
        }}
      >
        <option value="">All</option>
        <option value="PS4">PS4</option>
        <option value="PS5">PS5</option>
        <option value="XBOX">XBOX</option>
        <option value="Switch">Switch</option>
      </select>
      <select
        className="form-select w-25 d-inline"
        onChange={(e) => {
          setFilter({ ...filter, genre: e.target.value });
          setTotalSales(false);;
        }}
      >
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
      </select>{' '}
      Sort by{' '}
      <select
        className="form-select w-25 d-inline"
        onChange={(e) => {
          setSort(e.target.value);
          setTotalSales(false);
        }}
      >
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
        <option value="low-high">Low-High</option>
        <option value="high-low">High-Low</option>
        <option value="best-sales">Best Sales</option>
        <option value="newest">Newest by Date</option>
        <option value="oldest">Oldest by Date</option>
      </select>

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>GENRE</th>
            <th>CATEGORY</th>
            <th>RELEASE DATE</th>
            <th>SALES</th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(products[0]) &&
            products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>
                    <Link to={`/product/${product._id}`}>{product._id}</Link>
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.genre}</td>
                  <td>{product.category}</td>
                  <td>{product.releaseDate.split('T')[0]}</td>
                  <td>{product.sales} </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default Statistic;
