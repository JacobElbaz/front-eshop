import React, { useState, useEffect } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { getOrders } from '../actions/orders.action';

import OrderSummary from '../Components/OrderSummary';
import ShippingDetails from '../Components/ShippingDetails';
import OrderItems from '../Components/OrderItems';
import { useParams } from 'react-router-dom';
import { isEmpty } from '../Components/Utils';

const Order = () => {
    const [loadOrders, setLoadOrders] = useState(true);
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.ordersReducer);
    const orderId = useParams().id;
    const [order, setOrder] = useState();

    useEffect(() => {
        if (loadOrders) {
            dispatch(getOrders());
            setLoadOrders(false);
            if (!isEmpty(orders[0]))
                setOrder(orders.find(order => order._id == orderId));
        }
    }, [loadOrders, dispatch]);


    return (
        <div className='m-5'>
            {!isEmpty(orders[0]) && order && (
                <>

                    <h1>Order {order._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ShippingDetails order={order.shippingAddress} />
                                <OrderItems order={order.orderItems} />
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <OrderSummary order={order}>
                                Delivery: {new Date(order.deliveredAt).toDateString()}
                                {new Date(order.deliveredAt) <= new Date() && (order.status === 'Confirmed' || order.status === 'Pending...' ) ? ' (Delivered)' : ' (Not Delivered)'} <br /> Status: {order.status}
                            </OrderSummary>
                        </Col>
                    </Row>
                </>)}
        </div>
    );
};

export default Order;