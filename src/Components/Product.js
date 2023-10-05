import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card border="success" bg="dark">
      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
          <Card.Img src={product.image} />
          <Card.Title
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              color: "white",
              fontSize: "16px",
              marginTop: "5px",
            }}
          >
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            color: "white",
            fontSize: "16px",
            marginTop: "5px",
          }}
        >
          {product.category}
          <Rating
            value={
              product.rating.length != 0 &&
              product.rating.reduce((total, currentVal) => total + currentVal) /
                product.rating.length
            }
          />
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
