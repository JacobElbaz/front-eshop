import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <div>
            <Card.Img
              src={product.image}
              variant='top'
              style={{
                height: '180px',
                objectFit: 'contain',
              }}
            />
          </div>
          <Card.Title as='div'>
            <p
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}>
              <strong>{product.name}</strong>
            </p>
          </Card.Title>
        </Link>
        <Card.Text as='div'>{product.category}</Card.Text>
        <Card.Text as='div'>
          <Rating value={product.rating.length != 0 && product.rating.reduce((total, currentVal) => total + currentVal)/product.rating.length} />
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;