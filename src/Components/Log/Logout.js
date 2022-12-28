import React from "react";
import axios from "axios";
import cookie from "js-cookie";

const Logout = () => {
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

  return (
    <button onClick={logout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default Logout;