import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update_username, forgot_password, getUser, deleteUser, updateProfile } from '../actions/user.action';
import { Link } from 'react-router-dom';
import axios from "axios";
import cookie from "js-cookie";
import { Button, Modal, Form } from 'react-bootstrap';
import FormContainer from '../Components/FormContainer';

const Profile = () => {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const initialValues = {
    username: user.username,
    email: user.email,
  };
  const [username, setUsername] = useState(initialValues.username);
  const [password, setPassword] = useState('e');
  const [showModalUsername, setShowModalUsername] = useState(false);
  const [showModalPassword, setShowModalPassword] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errors, setErrors] = useState('');
  const [passwordErrors, setPasswordErrors] = useState('');

  useEffect(() => {
    dispatch(getUser(user._id));
  }, [showModalUsername, showModalPassword, dispatch]);

  const validate = (event) => {
    if (password !== event.target.value) {
      setErrors('Password not matched');
    } else {
      setErrors('');
    }
  };

  const UsernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const PasswordChangeHandler = (event) => {
    if (event.target.value.length < 6){
      setPasswordErrors('Password require 6 character at least');
      setPassword('e');
    }
    else {
      setPasswordErrors('');
      setPassword(event.target.value);
    }
  };


  const onSubmitUsername = (e) => {
    
    e.preventDefault();
    if (errors === '' && passwordErrors === '') {
      dispatch(updateProfile(initialValues.email, username, password));
      setShowModalPassword(true);
    } else {
      setShowModalError(true);
    }
    //dispatch(update_username(initialValues.email, username));
    //setShowModalUsername(true);
  };

  const onSubmitPassword = (e) => {
    e.preventDefault();
    if (errors === '' && passwordErrors === '') {
      dispatch(forgot_password(initialValues.email, password));
      setShowModalPassword(true);
    } else {
      setShowModalError(true);
    }
  };

  const handleClose = () => {
    setShowModalPassword(false);
    setShowModalUsername(false);
    setShowModalError(false);
    setShowDeleteModal(false);
  };

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/client/logout`,
      withCredentials: true,
    })
      .then(() => {
        removeCookie("jwt");})
      .catch((err) => console.log(err));
    
    window.location = "/";
    window.localStorage.removeItem('cart');
    window.localStorage.removeItem('auth');
    window.localStorage.removeItem('paymentMethod');
    window.localStorage.removeItem('shippingAddress');
    window.localStorage.removeItem('deliveryDate');
  };

  const onDeleteAccount = () => {
    setShowDeleteModal(false);
    logout();
    //delete this user from the database 
    dispatch(deleteUser(user._id));
  };

  

  return (
    <div className='p-5 home'>

      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body> Are you sure you want to delete your account?
Your data will be permanently deleted and the account will no longer be accessible.</Modal.Body>
        <Modal.Footer>
          <Link type="button" className="btn btn-danger" to={'/profile'} onClick={onDeleteAccount} >
            Yes, Delete My Account
          </Link>
          <Link type="button" className="btn btn-primary" to={'/profile'} onClick={handleClose} >
            No
          </Link>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalError} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confirm password don't match with password or password need 6 character</Modal.Body>
        <Modal.Footer>
          <Link
            type="button"
            className="btn btn-secondary"
            to={'/profile'}
            onClick={handleClose}
          >
            OK
          </Link>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalUsername} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success Update Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>This is your new username: {username}</Modal.Body>
        <Modal.Footer>
          <Link
            type="button"
            className="btn btn-secondary"
            to={'/profile'}
            onClick={handleClose}
          >
            OK
          </Link>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalPassword} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>Username: {username}</Modal.Body>
        <Modal.Footer>
          <Link
            type="button"
            className="btn btn-secondary"
            to={'/profile'}
            onClick={handleClose}
          >
            OK
          </Link>
        </Modal.Footer>
      </Modal>

      <FormContainer>
        <h1>{user.username}'s Profile</h1>

        <Form onSubmit={onSubmitUsername}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              required
              defaultValue={initialValues.username}
              onChange={UsernameChangeHandler}
            />
          </Form.Group>
          <p></p>
          {/* <Button variant="primary" size="sm" type="submit">
            Update Username
          </Button> */}
          <hr />
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              required
              placeholder="Enter Email"
              disabled
              value={initialValues.email}
            />
          </Form.Group>
          <hr />
          <Form.Group controlId="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter New Password"
              onChange={PasswordChangeHandler}
            />
          </Form.Group>
          <p className="text-danger">{passwordErrors}</p>
          <hr />
          <Form.Group controlId="confirmPassword">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={validate}
            />
            <p className="text-danger">{errors}</p>
            <Button variant="primary"  type="submit">
              Update Profile
            </Button>
          </Form.Group>
        </Form>
        
        {/* <Form onSubmit={onSubmitPassword}>
          <Form.Group controlId="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              required
              placeholder="Enter New Password"
              defaultValue={user.password}
              onChange={PasswordChangeHandler}
            />
          </Form.Group>
          <p className="text-danger">{passwordErrors}</p>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              required
              placeholder="Confirm Password"
              defaultValue={user.password}
              onChange={validate}
            />
            <p className="text-danger">{errors}</p>
            <Button variant="primary" size="sm" type="submit">
              Update Password
            </Button>
          </Form.Group>
        </Form> */}
      </FormContainer>
      <hr />
      <FormContainer>
        <Button variant='danger' onClick={() => setShowDeleteModal(true)}>Delete Account</Button>
      </FormContainer>
    </div>
  );
};

export default Profile;
