import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ShippingDetails = ({ order }) => {

  return (
    <ListGroup.Item>
      <h2>Shipping</h2>
      <p>
        <strong>Address: </strong>
        {order.address}, {order.city},
        {order.postalCode},{order.appartment}
      </p>

      
    </ListGroup.Item>
  );
};

export default ShippingDetails;