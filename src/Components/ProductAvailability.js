import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addWishProduct, removeWishProduct } from "../actions/user.action";
import { Link } from "react-router-dom";
import { isEmpty } from "./Utils";

const ProductAvailability = ({ product }) => {
  const [showModalCart, setShowModalCart] = useState(false);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  let [cart, setCart] = useState([]);
  let localCart = localStorage.getItem("cart");
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    localCart = JSON.parse(localCart);
    if (localCart) setCart(localCart);
    if (!isEmpty(user) && user.wishlist.find((wish) => wish._id === product._id)) {
      setInWishlist(true);
    }
  }, []); //the empty array ensures useEffect only runs once

  const onAddToCartClick = () => {
    if (!isEmpty(user)) {
      let cartCopy = [...cart];
      let existingItem = cartCopy.find(
        (cartItem) => cartItem._id == product._id
      );
      if (existingItem) {
      } else {
        product.qty = qty;
        cartCopy.push(product);
      }
      setCart(cartCopy);
      let stringCart = JSON.stringify(cartCopy);
      localStorage.setItem("cart", stringCart);
      setShowModalCart(true);
    } else {
      window.location = "/login";
    }
  };

  const onAddToWishListClick = () => {
    if (!isEmpty(user)) {
      if (inWishlist) {
        setInWishlist(false);
        dispatch(removeWishProduct(product._id, user._id));
      } else {
        setInWishlist(true);
        dispatch(addWishProduct(product._id, user._id));
      }
    } else {
      window.location = "/login";
    }
  };

  const handleClose = () => {
    setShowModalCart(false);
  };

  return (
    <>
      <Modal show={showModalCart} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thank you for adding to the cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>The product was added to your cart!</Modal.Body>
        <Modal.Footer>
          <Link
            type="button"
            className="btn btn-secondary"
            to={"/"}
            onClick={() => handleClose}
          >
            Continue Shopping
          </Link>
          <Link
            type="button"
            className="btn btn-primary"
            to="/cart"
            onClick={() => handleClose}
          >
            To My Cart
          </Link>
        </Modal.Footer>
      </Modal>
      <Card>
        <ListGroup varient="flush">
          <ListGroup.Item>
            <Row>
              <Col>Price:</Col>
              <Col>
                <strong>${product.price}</strong>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Status:</Col>
              <Col>
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </Col>
            </Row>
          </ListGroup.Item>

          {product.countInStock > 0 && (
            <ListGroup.Item>
              <Row>
                <Col>Qty</Col>
                <Col>
                  <Form.Control
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(product.countInStock).keys()].map((index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
          )}
          <ListGroup.Item>
            <Row>
              <Button
                className="btn-block my-1"
                type="button"
                disabled={product.countInStock < 1}
                onClick={onAddToCartClick}
              >
                Add To Cart
              </Button>
            </Row>
            <Row>
              <Button
                className="btn-block my-1"
                type="button"
                onClick={onAddToWishListClick}
              >
                {inWishlist ? "Remove From Wishlist" : "Add To Wishlist"}
              </Button>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};

export default ProductAvailability;
