import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import Product from '../Components/Product';
import { HeartFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { removeWishProduct } from '../actions/user.action';

const WishList = () => {
  const [showModalCart, setShowModalCart] = useState(false);
  const [loadProducts, setLoadProducts] = useState();
  const user = useSelector((state) => state.userReducer);
  const wishlist = user?.wishlist;
  const dispatch = useDispatch();
  const qty = 1;
  let [cart, setCart] = useState([]);
  let localCart = localStorage.getItem('cart');

  useEffect(() => {
    localCart = JSON.parse(localCart);
    if (localCart) setCart(localCart);
  }, [loadProducts, dispatch]);

  const onAddToCartClick = (product) => {
    if (user) {
      let cartCopy = [...cart];
      let existingItem = cartCopy.find(
        (cartItem) => cartItem._id === product._id
      );
      if (existingItem) {
      } else {
        product.qty = qty;
        cartCopy.push(product);
      }
      setCart(cartCopy);
      let stringCart = JSON.stringify(cartCopy);
      localStorage.setItem('cart', stringCart);
      onRemoveProduct(product._id);
    } else {
      window.location = '/login';
    }
  };

  const onRemoveProduct = (productId) => {
    if (user) {
      dispatch(removeWishProduct(productId, user._id));
      setLoadProducts(true);
      window.location.reload();
    }
  };
  const renderLikeIcon = (productId) => {
    return (
      <HeartFill
        style={{
          position: 'absolute',
          right: '2rem',
          top: '2rem',
          zIndex: 100,
          color: 'red',
          cursor: 'pointer',
        }}
        onClick={() => onRemoveProduct(productId)}
      />
    );
  };
  const handleClose = () => {
    setShowModalCart(false);
  };

  return (
    <>
      <Modal show={showModalCart} onHide={() => handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thank you for adding to the cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>The product was added to your cart!</Modal.Body>
        <Modal.Footer>
          <Link
            type="button"
            className="btn btn-secondary"
            to={'/'}
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
      <div className="p-5 home">
        <h1>Wishlist</h1>

        <Row>
          {wishlist?.length === 0 ? (
            <h3>You don't have any wish product yet.</h3>
          ) : (
            wishlist.map((product) => {
                return (
                  <Col
                    key={product._id}
                    sm={12}
                    md={6}
                    lg={4}
                    xl={3}
                    style={{ position: 'sticky' }}
                  >
                    {renderLikeIcon(product._id)}
                    <Product product={product} />
                    <Row>
                      <Button
                        type="button"
                        disabled={product.countInStock < 1}
                        onClick={() => onAddToCartClick(product)}
                      >
                        Add To Cart
                      </Button>
                    </Row>
                  </Col>
                );
            })
          )}
        </Row>
      </div>
    </>
  );
};

export default WishList;
