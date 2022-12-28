import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ShoppingCart() {
    let [cart, setCart] = useState([]);
    let localCart = localStorage.getItem("cart");

    const editItem = (itemID, amount) => {
        let cartCopy = [...cart]
        let existentItem = cartCopy.find(item => item._id === itemID);
        if (!existentItem) return

        existentItem.qty = amount;
        if (existentItem.qty <= 0) {
            cartCopy = cartCopy.filter(item => item.ID !== itemID)
        }

        setCart(cartCopy);

        let cartString = JSON.stringify(cartCopy);
        localStorage.setItem('cart', cartString);
    }

    const removeItem = (itemID) => {

        let cartCopy = [...cart]
        cartCopy = cartCopy.filter(item => item._id !== itemID);
        setCart(cartCopy);
        let cartString = JSON.stringify(cartCopy)
        localStorage.setItem('cart', cartString)
    }

    useEffect(() => {
        localCart = JSON.parse(localCart);
        if (localCart) setCart(localCart)

    }, [])

    return (
        <div className='p-5 home'>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cart.length === 0 ? (
                        <h2>
                            Your cart is empty !
                        </h2>
                    ) : (
                        <ListGroup variant='flush'>
                            {cart.map((item) => {
                                return (
                                    <ListGroup.Item key={item._id}>
                                        <Row>
                                            <Col md={2}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fluid
                                                    rounded
                                                />
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item._id}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={2}>${item.price}</Col>
                                            <Col md={2}>
                                                <Form.Control
                                                    as='select'
                                                    value={item.qty}
                                                    onChange={(e) =>
                                                        editItem(item._id, e.target.value)
                                                    }
                                                >
                                                    {[...Array(item.countInStock).keys()].map((index) => (
                                                        <option key={index + 1} value={index + 1}>
                                                            {index + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                            <Col>
                                                <Button
                                                    type='button'
                                                    variant='ligth'
                                                    onClick={() => removeItem(item._id)}
                                                >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flsuh'>
                            <ListGroup.Item>
                                <h2>
                                    Subtotal
                                </h2>
                                <h3>
                                    $
                                    {cart
                                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                                        .toFixed(2)}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {cart.length !== 0 ? <Link
                                    to={'/shipping'}
                                    type='button'
                                    className='btn btn-block btn-primary'
                                    disabled={cart.length < 1}
                                >
                                    Procced To Checkout
                                </Link> : <h3>No item</h3> }
                                
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
