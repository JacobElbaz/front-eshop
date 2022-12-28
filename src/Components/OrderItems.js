import React from 'react';
import { ListGroup, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import history from '../history';

const OrderItems = ({ order }) => {
  const urlParams = history.location.pathname.split('/')[1];

  const items = urlParams === 'placeorder' ? 'cartItems' : 'orderItems';

  return (
    <ListGroup.Item>
      <h2>Order Items</h2>
      {order.length === 0 ? (
        <h1>Your cart is empty</h1>
      ) : (
        <ListGroup variant='flush'>
          {order.map((item, index) => {
            return (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={4}>
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </ListGroup.Item>
  );
};

export default OrderItems;