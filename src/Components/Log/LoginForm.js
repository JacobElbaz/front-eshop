import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { forgot_password, getUser } from '../../actions/user.action';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../actions/user.action';
import axios from 'axios';
import './LoginForm.css';
import { isEmpty } from '../../Components/Utils';

function LoginForm() {
  const [details, setDetails] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer);
  const [loadUsers, setLoadUsers] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  let d = 'wrong email';
  const navigate = useNavigate();

  useEffect(() => {
    if (loadUsers) {
      dispatch(getAllUsers());
      setLoadUsers(false);
    }
  }, [loadUsers, dispatch, emailError]);

  const submitHandler = (e) => {
    e.preventDefault();
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/client/login`,
      data: details,
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          dispatch(getUser(res.data.client))
          navigate('/');
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setShowModal(false);
    setShowPassword(false);
  };

  const onForgotPassword = () => {
    setShowModal(true);
  };

  const onSubmit = () => {
    if (d === 'wrong email') {
      console.log('USER UNKOWN');
    } else {
      setShowModal(false);
      dispatch(forgot_password(d, '123456'));
      setShowPassword(true);
    }
  };

  const onChangeEmail = (e) => {
    e.preventDefault();
    setEmailError(e.target.value);
  }

  return (
    <>
      <Modal show={showPassword} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>This is your new password: 123456</Modal.Body>
        <Modal.Footer>
          <Link
            type="button"
            className="btn btn-secondary"
            to={'/login'}
            onClick={handleClose}
          >
            OK
          </Link>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={onSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    required
                    placeholder="Enter Email"
                    onChange={(e) => onChangeEmail(e)}
                  />
                </Form.Group>
                {!isEmpty(users[0]) &&
                  users.map((user) => {
                    return user.email === emailError
                      ? (d = emailError)
                      : null;
                  })}
                {d !== emailError  ? (
                  <p className="text-danger">User Unknown</p>
                ) : (
                  <p className="text-success">Known User</p>
                )}
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Link
            type="button"
            className="btn btn-primary"
            to={'/login'}
            onClick={() => onSubmit()}
          >
            Submit
          </Link>
          <Link
            type="button"
            className="btn btn-secondary"
            to={'/login'}
            onClick={handleClose}
          >
            Cancel
          </Link>
        </Modal.Footer>
      </Modal>
      <div className="Login">
        <form onSubmit={submitHandler}>
          <div className="form-inner">
            <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => {
                  e.preventDefault();
                  setDetails({ ...details, email: e.target.value });
                }}
                value={details.email}
              />
              <div className="email error"></div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => {
                  e.preventDefault();
                  setDetails({ ...details, password: e.target.value });
                }}
                value={details.password}
              />
              <div className="password error"></div>
            </div>
            <input type="submit" value="LOGIN" />
            <a
              className="managerlink text-decoration-none text-decoration-underline ms-5"
              href="#"
              onClick={onForgotPassword}
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
