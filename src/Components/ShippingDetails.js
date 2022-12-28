import React from 'react';
import { ListGroup } from 'react-bootstrap';

import history from '../history';

const ShippingDetails = ({ order }) => {
  const urlParams = history.location.pathname.split('/')[1];

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