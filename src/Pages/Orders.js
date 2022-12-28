import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isEmpty } from '../Components/Utils';
import { getOrders } from '../actions/orders.action';
import { updateStatus } from '../actions/order.action';

const Orders = () => {
    const [loadOrders, setLoadOrders] = useState(true);
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.ordersReducer);

    useEffect(() => {
        if (loadOrders) {
            dispatch(getOrders());
            setLoadOrders(false);
        }
    }, [loadOrders, dispatch]);

    const confirm = (id) => {
        dispatch(updateStatus(id, 'Confirmed'));
        setLoadOrders(true);
    };


    const cancel = (id) => {
        dispatch(updateStatus(id, 'Canceled'));
        setLoadOrders(true);	
    };

    return (
        <div className='m-5'>
            <Row className='align-items-center'>
                <Col>
                    <h1>Orders</h1>
                </Col>
                <Col>
                <Button as={Link} to={'/admin/delivery'} variant='secondary'>Set Delivery</Button></Col>
            </Row>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CLIENT</th>
                        <th>PRICE</th>
                        <th>ADDRESS</th>
                        <th>STATUS</th>
                        <th>DELIVERED</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {!isEmpty(orders[0]) &&
                        orders.map((order) => {
                            return (
                                <tr key={order._id}>
                                    <td>
                                        {order._id}
                                    </td>
                                    <td>{order.client}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.shippingAddress.city}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        {new Date(order.deliveredAt) <= new Date() && order.status == 'Confirmed' ? (
                                            <i
                                                className="fas fa-check"
                                                style={{ color: 'green' }}
                                            ></i>
                                        ) : (
                                            <i className="fas fa-times" style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <Button variant='success' disabled={order.status == 'Confirmed' || order.status == 'Canceled'} onClick={() => confirm(order._id)}>Approve

                                        </Button>
                                        <Button variant='danger' disabled={order.status == 'Canceled' || order.status == 'Confirmed'} onClick={() => cancel(order._id)}>Cancel

                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default Orders;