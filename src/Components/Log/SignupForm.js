import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupForm() {
  const [details, setDetails] = useState({
    username: '',
    email: '',
    password: '',
    manager: false,
  });
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const usernameError = document.querySelector('.username.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/client/register`,
      data: details,
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          usernameError.innerHTML = res.data.errors.username;
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          navigate('/login');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Signup">
      <form onSubmit={submitHandler}>
        <div className="form-inner">
          <h2>Signup</h2>
          <div className="form-group">
            <label htmlFor="username">Name:</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
              value={details.username}
            />
            <div className="username error"></div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
            />
            <div className="email error"></div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              //pattern="^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$"
              minLength={6}
              title="Minimum of 7 characters. Should have at least one special character and one number and one UpperCase Letter."
              name="password"
              id="password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
            <div className="password error"></div>
          </div>
          <input type="submit" value="Sign Up" />
          <a
            className="managerlink text-decoration-none text-decoration-underline ms-5"
            href=""
            onClick={() => navigate('/signupManager')}
          >
            For manager click here
          </a>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
