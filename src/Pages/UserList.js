import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Col, Row } from 'react-bootstrap';
import { getAllUsers } from '../actions/user.action';
import { isEmpty } from '../Components/Utils';

const UserList = () => {
  const [loadUsers, setLoadUsers] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer);
  useEffect(() => {
    if (loadUsers) {
      dispatch(getAllUsers());
      setLoadUsers(false);
    }
  }, [loadUsers, dispatch]);

  return (
    <div className="m-5">
      <Row className="align-items-center">
        <Col>
          <h1>Users</h1>
        </Col>
      </Row>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>MANAGER</th>
            
          </tr>
        </thead>
        <tbody>
          {!isEmpty(users[0]) &&
            users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>
                    {user._id}
                  </td>
                  <td>{user.username}</td>
                  <td>
                    <a href={`emailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.manager ? (
                      <i
                        className="fas fa-check"
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
