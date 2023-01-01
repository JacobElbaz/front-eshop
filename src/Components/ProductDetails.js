import React, { useEffect, useState } from 'react';
import { Button, Form, ListGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders } from '../actions/orders.action';
import { updateRateProduct } from '../actions/products.action';

import Rating from '../Components/Rating';
import { isEmpty } from './Utils';

const ProductDetails = ({ product }) => {
  let clientId = '00000000000';
  if (JSON.parse(localStorage.getItem('auth')) !== null) {
    clientId = JSON.parse(localStorage.getItem('auth'))._id;
  }

  const orders = useSelector((state) => state.ordersReducer);
  const dispatch = useDispatch();
  const productId = product._id;
  const [loadOrders, setLoadOrders] = useState(true);
  const [rate, setRate] = useState(5);
  const [showModal, setShowModal] = useState(false);

  const check = () => {
    if (clientId === '00000000000') {
      return false;
    } else {
      const clientOrders = orders.filter(
        (order) => order.client === clientId
      );
      if (clientOrders) {
        for (let i = 0; i < clientOrders.length; i++) {
          if (
            clientOrders[i].orderItems.some(
              (product) => product._id == productId
            )
          ) {
            
            return true;
          }
        }
        return false;
      }
    }
  };

  const onRateClick = () => {
    dispatch(updateRateProduct(productId, rate));
    setLoadOrders(true);
    setShowModal(true);
  };

  const handleClose = () => {
    window.location = `/product/${productId}`;
    setShowModal(false);
  };

  useEffect(() => {
    if (loadOrders) {
      dispatch(getOrders());
      setLoadOrders(false);
    }
  }, [showModal, loadOrders, dispatch]);

  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Rated</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thank you for rating this product !</Modal.Body>
        <Modal.Footer>
          <Link
            type="button"
            className="btn btn-secondary"
            to={`/product/${productId}`}
            onClick={handleClose}
          >
            OK
          </Link>
        </Modal.Footer>
      </Modal>

      <ListGroup variant="flush">
        <ListGroup.Item>
          <h3>{product.name}</h3>
        </ListGroup.Item>
        <ListGroup.Item>
          <img src={product.image} height="320"></img>
        </ListGroup.Item>
        <ListGroup.Item>
          <Rating
            value={
              product.rating &&
              product.rating.reduce((total, currentVal) => total + currentVal) /
                product.rating.length
            }
            text={`${Number(product.numReviews)} reviews`}
          />
          (
          {product.rating &&
            (
              product.rating.reduce((total, currentVal) => total + currentVal) /
              product.rating.length
            ).toFixed(1)}
          )
        </ListGroup.Item>
        {!isEmpty(orders[0]) && check() && (
          <ListGroup.Item>
            Rate this product:
            <Form.Control
              as="select"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            >
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Very good</option>
              <option value={3}>3 - Good</option>
              <option value={2}>2 - Not bad</option>
              <option value={1}>1 - Bad</option>
            </Form.Control>
            <Button onClick={() => onRateClick()}>Submit</Button>
          </ListGroup.Item>
        )}
        <ListGroup.Item>Price: {product.price} $</ListGroup.Item>
        <ListGroup.Item>Platform: {product.category}</ListGroup.Item>
        <ListGroup.Item>Genre: {product.genre}</ListGroup.Item>
        <ListGroup.Item>Description: {product.description}</ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default ProductDetails;
