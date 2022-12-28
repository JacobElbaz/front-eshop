import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Col, Row, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isEmpty } from '../Components/Utils';
import { getMyOrders } from '../actions/order.action';
import { updateStatus } from '../actions/order.action';

const Orders = () => {
    const [loadOrders, setLoadOrders] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [toCancel, setToCancel] = useState();
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orderReducer);
    const userId = JSON.parse(localStorage.getItem('auth'))._id;

    useEffect(() => {
        if (loadOrders) {
            dispatch(getMyOrders(userId));
            setLoadOrders(false);
        }
    }, [loadOrders, dispatch]);

    const cancel = (id) => {
        dispatch(updateStatus(id, 'Canceled'));
        window.location = `/myorders/${userId}`;
    };

    const handleClose = () => {
        setShowModal(false);
        setShowConfirmModal(false);
    };

    const onCancelClick = (order) => {
        setToCancel(order);
        setShowModal(true);
    }

    return (

        <div className='m-5'>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cancel Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to cancel the order?</Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={() => cancel(toCancel)}>
                        Yes, cancel this order
                    </Button>
                    <Button variant='secondary' onClick={()=>handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showConfirmModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reception Confirmed</Modal.Title>
                </Modal.Header>
                <Modal.Body>Thank you for confirm reception, you can now rate the products you just received !</Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={() => handleClose()}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row className='align-items-center'>
                <Col>
                    <h1>My Orders</h1>
                </Col>
            </Row>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>DATE OF DELIVERY</th>
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
                                        <Link to={`/order/${order._id}`}>{order._id}</Link>
                                    </td>
                                    <td>{order.payementDate.split('T')[0]}</td>
                                    <td>{order.deliveredAt.split('T')[0]}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.shippingAddress.city}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        {new Date(order.deliveredAt) <= new Date() && order.status === 'Confirmed' ? (
                                            <i
                                                className="fas fa-check"
                                                style={{ color: 'green' }}
                                            ></i>
                                        ) : (
                                            <i className="fas fa-times" style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        {new Date(order.deliveredAt) <= new Date() && order.status === 'Confirmed' ? (
                                            <Button
                                            variant='success'
                                            onClick={() => setShowConfirmModal(true)}
                                            >Confirm Reception
                                        </Button>
                                    ) : (
                                        <Button
                                            variant='danger'
                                            onClick={() => onCancelClick(order._id)}
                                            disabled={order.status === 'Canceled' || new Date(order.deliveredAt) < new Date()}>Cancel
                                        </Button>
                                    )}
                                        
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