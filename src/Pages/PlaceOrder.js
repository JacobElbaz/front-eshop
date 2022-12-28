import React, { useEffect, useState } from 'react';
import { Button, Row, Col, ListGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { createOrder, updateSales } from '../actions/order.action';

import CheckoutSteps from '../Components/CheckoutSteps';
import OrderSummary from '../Components/OrderSummary';
import ShippingDetails from '../Components/ShippingDetails';
import OrderItems from '../Components/OrderItems';
import { Link } from 'react-router-dom';

const PlaceOrder = () => {
    let [cart, setCart] = useState([]);
    let localCart = localStorage.getItem("cart");
    useEffect(() => {
        localCart = JSON.parse(localCart);
        if (localCart) setCart(localCart)

    }, [])
  const dispatch = useDispatch();
  const client = JSON.parse(localStorage.getItem("auth"))
  const [showModal, setShowModal] = useState(false);
  // calculate prices
  cart.totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const onPlaceOrderClick = () => {
    dispatch(
      createOrder({
        client: client._id.toString(),
        orderItems: cart,
        shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')),
        paymentMethod: JSON.parse(localStorage.getItem('paymentMethod')),
        totalPrice: cart.totalPrice,
        deliveredAt: new Date(JSON.parse(localStorage.getItem('deliveryDate'))),
      })
    );
    dispatch(updateSales(cart));
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    window.localStorage.removeItem('cart');
  };

  return (
    <div className='m-5'>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thank you !</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your order was successfully received.</Modal.Body>
        <Modal.Footer>
          <Link type="button" className='btn btn-secondary' to={'/'} onClick={handleClose}>
            Continue Shopping
          </Link>
          <Link type="button" className='btn btn-primary' to={`/myorders/${client._id}`} onClick={handleClose}>
            To My Orders
          </Link>
        </Modal.Footer>
      </Modal>
      <CheckoutSteps step1 step2 step3 step4 step5 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ShippingDetails order={JSON.parse(localStorage.getItem('shippingAddress'))} />

            <OrderItems order={cart} />
          </ListGroup>
        </Col>
        <Col md={4}>
          <OrderSummary order={cart}>
            <Button
              type='button'
              className='btn-block'
              disabled={cart.length === 0}
              onClick={onPlaceOrderClick}>
              Place Order
            </Button>
          </OrderSummary>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrder;