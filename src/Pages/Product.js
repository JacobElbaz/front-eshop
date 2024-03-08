import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { getProduct } from "../actions/products.action";
import ProductDetails from "../Components/ProductDetails";
import ProductAvailability from "../Components/ProductAvailability";
import { useParams } from "react-router-dom";

const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productReducer);
  const productId = String(useParams().id);

  useEffect(() => {
    dispatch(getProduct(productId));
    setIsLoading(false);
  }, []);

  return (
    <div className="m-5">
      {isLoading ? (
        "Loading..."
      ) : (
        <Row>
          <Col md={5}>
            <ProductDetails product={product} />
          </Col>
          <Col md={3}>
            <ProductAvailability product={product} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Product;
