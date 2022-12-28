import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Col, Row, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isEmpty } from './Utils';
import { getProducts, deleteProduct } from '../actions/products.action';

const ProductList = () => {
  const [loadProducts, setLoadProducts] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProductsReducer);

  useEffect(() => {
    if (loadProducts) {
      dispatch(getProducts());
      setLoadProducts(false);
    }
  }, [loadProducts, dispatch]);

  const onDeleteClick = (id) => {
    dispatch(deleteProduct(id));
    setLoadProducts(true);
    setShowModal(true);
  };

  const onCreateClick = () => {};

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>This Game has been deleted successfully</Modal.Body>
        <Modal.Footer>
          <Link
            type="button"
            className="btn btn-secondary"
            to={'/admin/productList'}
            onClick={handleClose}
          >
            OK
          </Link>
        </Modal.Footer>
      </Modal>
      <div className="m-5">
        <Row className="align-items-center">
          <Col>
            <h1>Products</h1>
          </Col>
          <Col className="text-right">
            <Link className="my-3 btn btn-primary" to="/admin/editProduct">
              <i className="fas fa-plus"></i> Add New Product
            </Link>
          </Col>
        </Row>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>GENRE</th>
              <th>CATEGORY</th>
              <th>COUNT IN STOCK</th>
              <th>RELEASE DATE</th>
              <th>SALES</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(products[0]) &&
              products.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>
                      <Link to={`/product/${product._id}`}>{product._id}</Link>
                    </td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.genre}</td>
                    <td>{product.category}</td>
                    <td>{product.countInStock}</td>
                    <td>{product.releaseDate.split('T')[0]}</td>
                    <td>{product.sales}</td>
                    <td>
                      <Link to={`/admin/products/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => onDeleteClick(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ProductList;
