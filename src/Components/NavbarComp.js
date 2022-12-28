import React, { useContext, useState } from 'react';
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button, Badge } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import LoginForm from './Log/LoginForm';
import SignupForm from './Log/SignupForm';
import SignupManagerForm from './Log/SignupManagerForm';
import HomePage from '../Pages/HomePage';
import ShoppingCart from '../Pages/ShoppingCart';
import Wishlist from '../Pages/WishList';
import { UidContext } from './AppContext';
import { useSelector } from 'react-redux';
import Logout from './Log/Logout';
import ProductsList from './ProductsList';
import ProductEdit from '../Pages/ProductEdit';
import Product from '../Pages/Product';
import AllProducts from '../Pages/AllProducts';
import Profile from '../Pages/Profile';
import UserList from '../Pages/UserList';
import history from '../history';
import SearchResults from '../Pages/SearchResults';
import Shipping from '../Pages/Shipping';
import Payment from '../Pages/Payment';
import PlaceOrder from '../Pages/PlaceOrder';
import Orders from '../Pages/Orders';
import ClientOrders from '../Pages/ClientOrders'
import Delivery from '../Pages/Delivery';
import Order from '../Pages/Order';
import EditProduct from '../Pages/EditProduct';
import DeliveryDates from '../Pages/DeliveryDates';
import Statistic from '../Pages/Statistic';
import About from '../Pages/About';
import ContactUs from '../Pages/ContactUs';

function NavbarComp() {
  const uid = useContext(UidContext);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userReducer);
  if(userData._id){
  localStorage.setItem('auth', JSON.stringify(userData));}
  const [keyword, setkeyword] = useState('');
  const onSearchClick = (e) => {
    e.preventDefault();
    if(keyword.trim())
      navigate(`/search/${keyword}`);
    else history.push('/');
  }


  return (
    <div className="Navbar">
      <div>
        <Navbar bg="dark" variant='dark' expand="lg">
          <Container fluid>
            <Navbar.Brand as={Link} to={'/'}>Game Zone</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                {uid ? (
                  <>
                    <NavDropdown title={userData.username} id='username'>
                      <NavDropdown.Item to='/profile' as={Link}>
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item to= {`/myorders/${userData._id}`} as={Link}>
                            My Orders
                          </NavDropdown.Item>
                      {userData.manager && (
                        <>
                          <NavDropdown.Item to='/admin/stats' as={Link}>
                            Staticstics
                          </NavDropdown.Item>
                          <NavDropdown.Item to='/admin/userList' as={Link}>
                            Users
                          </NavDropdown.Item>
                          <NavDropdown.Item to='/admin/productList' as={Link}>
                            Products
                          </NavDropdown.Item>
                          <NavDropdown.Item to='/admin/orderList' as={Link}>
                            Orders
                          </NavDropdown.Item>
                        </>
                      )}
                      <NavDropdown.Divider />
                      <NavDropdown.Item >
                        <Logout></Logout>
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to={'/wishlist'}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-heart-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        />
                      </svg>{' '}
                      Wishlist
                    </Nav.Link>
                    <Nav.Link as={Link} to={'/cart'}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-cart-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                      </svg>{' '}
                      Cart{' '}
                      <Badge pill bg="secondary">{JSON.parse(localStorage.getItem('cart'))?.length}</Badge>
                    </Nav.Link>
                  </>
                ) : (
                  <Nav>
                    <Nav.Link as={Link} to={'/login'}>
                      Log In
                    </Nav.Link>
                    <Nav.Link as={Link} to={'/signup'}>
                      Sign Up
                    </Nav.Link>
                  </Nav>
                )}
              </Nav>
              <Form onSubmit = {onSearchClick} className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange = { (e) => setkeyword(e.target.value)}
                />
                <Button type = 'submit' variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/signupManager" element={<SignupManagerForm />} />
          <Route path="/admin/productList" element={<ProductsList />}/>
          <Route path="/admin/userList" element={<UserList />}/>
          <Route path='/product/:id' element={<Product/>}/>
          <Route path='/allProducts/:category' element={<AllProducts/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/admin/editProduct' element={<ProductEdit/>}/>
          <Route path='/search/:keyword' element={<SearchResults/>}/>
          <Route path='/shipping' element={<Shipping/>}/>
          <Route path='/delivery' element={<Delivery/>}/>
          <Route path='/payment' element={<Payment/>}/>
          <Route path='/placeorder' element={<PlaceOrder/>}/>
          <Route path="/login" element={<LoginForm />}/>
          <Route path="/signup" element={<SignupForm />}/>
          <Route path="/admin/orderList" element={<Orders/>}/>
          <Route path="/myorders/:id" element={<ClientOrders/>}/>
          <Route path="/order/:id" element={<Order/>}/>
          <Route path="/admin/products/:id/edit" element = {<EditProduct/>}/>
          <Route path="/admin/delivery" element = {<DeliveryDates/>}/>
          <Route path="/admin/stats" element = {<Statistic/>}/>
          <Route path="/about" element = {<About/>}/>
          <Route path="/contact" element = {<ContactUs/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default NavbarComp;
