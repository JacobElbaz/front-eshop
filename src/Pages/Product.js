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
    const fetchData = async () => {
      try {
        await dispatch(getProduct(productId));
      } catch (error) {
        // Handle error
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, productId]);

  return (
    <div className="m-5">
      {isLoading ? (
        // Consider using a loading spinner here
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
