import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';

import { getProduct } from '../actions/products.action';

import ProductDetails from '../Components/ProductDetails';
import ProductAvailability from '../Components/ProductAvailability';
import { useParams } from 'react-router-dom';

const Product = () => {
    const [loadProducts, setLoadProducts] = useState(true);
    const dispatch = useDispatch();
    const product = useSelector((state) => state.productReducer);
    const productId = String(useParams().id);

    useEffect(() => {
        if (loadProducts) {
            dispatch(getProduct(productId));
            setLoadProducts(false);
        }
    }, [loadProducts, dispatch]);

    return (
        <div className='m-5'>
            <Row>
                <Col md={5}>
                    <ProductDetails product={product} />
                </Col>
                <Col md={3}>
                    <ProductAvailability product={product} />
                </Col>
            </Row>
        </div>
    );
};

export default Product;